import * as React from 'react';
import { Button, Card, Title, Paragraph, Text, Subheading, Caption, Avatar, Divider, TouchableRipple, Menu } from 'react-native-paper';
import { ScrollView, StyleSheet, View, Image, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import MainHeader from '../../components/MainHeader';
import Loader from '../../components/Loader';

class QueuedReports extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            reports: null,
            loading: false,
            showMenu: false,
            currentSelectedId: null,
            currentSelectedAction: null
        }
    }

    hideMenu = () => {
        this.setState({
            showMenu: false
        })
    }

    showMenu = id => {
        this.setState({
            showMenu: id
        });
    }

    confirmAlert = async (msg, func, id) => {
        await this.setState({
            currentSelectedId: id,
            currentSelectedAction: func
        });
        Alert.alert(
          'Confirmation Message',
          msg,
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
                text: 'OK', 
                onPress: () => {
                    switch(this.state.currentSelectedAction) {
                        case 1:
                            this.setProceedReports()
                            break;
                        case 2:
                            this.rejectReports()
                            break;
                    }
                }
            },
          ],
          {cancelable: false},
        );
    }

    setProceedReports = async () => {
        if (this.state.currentSelectedId != null) {
            this.setState({
                loading: true
            });
            await firestore()
            .collection('reports')
            .doc(this.state.currentSelectedId)
            .update({
                status: 'In Process'
            })
            .then(async report => {
                await this.getReports();
            })
            .catch(err => {
                this.setState({
                    loading: false
                });
                Alert.alert('Error', err);
            });
        }
    }

    rejectReports = async () => {
        if (this.state.currentSelectedId != null) {
            this.setState({
                loading: true
            });
            await firestore()
            .collection('reports')
            .doc(this.state.currentSelectedId)
            .delete()
            .then(async report => {
                await this.getReports();
            })
            .catch(err => {
                this.setState({
                    loading: false
                });
                Alert.alert('Error', err);
            });
        }
    }

    getReports = async () => {
        const querySnapshot = await firestore()
        .collection('reports')
        .where('status', '==', 'Queued')
        .get()
        .then(snapshot => {
            if (snapshot._docs.length > 0) {
                const list = [];
                snapshot
                .docs
                .forEach(async report => {
                    const {title, desc, imgSrc, date} = report.data();
                    await list.push({
                        id: report.id,
                        title: title,
                        desc: desc,
                        imgSrc: imgSrc,
                        date: date
                    });
                });
                this.setState({
                    loading: false,
                    reports: list
                });
            }else{
                this.setState({
                    loading: false,
                    reports: null
                });
            }
        })
    }

    componentDidMount() {
        this.setState({
            loading: true
        });
        this.unsubscribe = firestore()
        .collection('reports')
        .where('status', '==', 'Queued')
        .onSnapshot({
            error: e => Alert.alert('Error', e),
            next: reports => {
                if (reports._docs.length > 0) {
                    const list = [];

                    reports.forEach(async report => {
                        const {title, desc, imgSrc, date} = report.data();
                        await list.push({
                            id: report.id,
                            title: title,
                            desc: desc,
                            imgSrc: imgSrc,
                            date: date
                        });
                    });

                    this.setState({
                        loading: false,
                        reports: list
                    });
                }else{
                    this.setState({
                        loading: false
                    });
                }
            }
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return (
            <React.Fragment>
                <Loader loading={this.state.loading} />
                <MainHeader navigation={this.props.navigation}/>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    {this.state.reports != null ? (
                        this.state.reports.map((data, index) => {
                            return (
                                <View key={index}>
                                    <Card>
                                        <Card.Cover source={{ uri: data.imgSrc }} />
                                        <Card.Content style={{flexDirection: 'row', paddingTop: 10, paddingBottom: 15, position: 'relative'}}>
                                            <Avatar.Image style={{ marginRight: 10 }} size={35} source={{ uri: 'https://source.unsplash.com/50x50/?people' }} />
                                            <View style={{flex: 1}}>
                                                <Text>{data.title}</Text>
                                                <Caption>Arif Muhammad - {data.date}</Caption>
                                            </View>
                                            <Menu
                                                visible={this.state.showMenu == data.id}
                                                onDismiss={this.hideMenu}
                                                anchor={
                                                    <TouchableRipple
                                                    onPress={() => this.showMenu(data.id)}>
                                                        <Image
                                                        style={{width: 14, height: 14, resizeMode: 'contain'}} 
                                                        source={require('../../assets/menu.png')}></Image>
                                                    </TouchableRipple>
                                                }
                                            >
                                            <Menu.Item onPress={() => {
                                                Alert.alert(data.title, data.desc)
                                            }} title="View" />
                                            <Divider />
                                            <Menu.Item 
                                            title="Proceed" 
                                            onPress={() => this.confirmAlert(
                                                'Yakin ingin memproses laporan ini??',
                                                1,
                                                data.id
                                            )} />
                                            <Menu.Item 
                                            title="Reject"
                                            onPress={() => this.confirmAlert(
                                                'Yakin ingin menolak laporan ini??',
                                                2,
                                                data.id
                                            )} />
                                            </Menu>
                                        </Card.Content>
                                    </Card>
                                    <Divider />
                                </View>
                            );
                        })
                    ) : <Caption style={{alignSelf: 'center', marginTop: 14}}>Tidak ada laporan.</Caption>}
                </ScrollView>
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({

})

export default QueuedReports;