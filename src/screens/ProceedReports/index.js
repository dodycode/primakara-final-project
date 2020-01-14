import * as React from 'react';
import axios from 'axios';
import { Button, Card, Title, Paragraph, Text, Subheading, Caption, Avatar, Divider, TouchableRipple, Menu, Dialog, Portal, TextInput } from 'react-native-paper';
import { ScrollView, StyleSheet, View, Image, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import MainHeader from '../../components/MainHeader';
import Loader from '../../components/Loader';

class ProceedReports extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            proceedReports: null,
            loading: false,
            showMenu: false,
            currentSelectedId: null,
            currentUser: null,
            showModal: false,
            staffNotes: null
        }

        this.getUser();
    }

    getUser = async () => {
      try {
        const value = await AsyncStorage.getItem('user_id');
        if(value !== null) {
          await firestore()
            .collection('users')
            .where('uid', '==', value)
            .get()
            .then(async snapshot => {
                let list = '';
                await snapshot.docs.forEach(user => {
                    const { fullName, isStaff } = user.data();
                    list = {
                        fullName,
                        isStaff
                    }
                });
                await this.setState({
                    currentUser: list
                });
                // console.log(this.state.currentUser.isStaff);
            })
            .catch(error => {
                console.error(error);
            })
        }
      } catch(e) {
        console.error(e);
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

    toggleDialog = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    handleChangeInput = field => text => {
        this.setState({
            [field]: text
        });
    };

    handleNotif = async msg => {
        axios.defaults.headers.common['Authorization'] = 'Basic MTdmZTdjYWQtMWZjYi00ZjVjLTk0MDUtYzE3ZDVlNGMwNDM5';
        axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
        await axios({
            method: 'POST',
            url: 'https://onesignal.com/api/v1/notifications',
            data: {
                app_id: 'c4c46357-ea12-41f9-bf10-0cdce1f3cdad',
                contents: {"en" : msg},
                included_segments: ['All']
            }
        }).catch(err => console.error(err));
    }

    confirmAlert = async (msg, id) => {
        await this.setState({
            currentSelectedId: id
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
                onPress: async () => {
                    await this.hideMenu();
                    this.toggleDialog();
                }
            },
          ],
          {cancelable: false},
        );
    }

    closeReports = async () => {
        if (this.state.currentSelectedId != null) {
            this.setState({
                loading: true
            });
            const { proceedReports, currentSelectedId, currentUser, staffNotes } = this.state;
            let rejectedReport = await proceedReports.find(report => {
                return report.id == currentSelectedId;
            });
            await this.handleNotif('[INFO]: Report ['+rejectedReport.title+'] telah di tuntaskan oleh '+currentUser.fullName);
            await firestore()
            .collection('reports')
            .doc(currentSelectedId)
            .update({
                status: 'Closed',
                staff: currentUser.fullName,
                staffNote: staffNotes
            })
            .then(async report => {
                await this.getProceedReports();
            })
            .catch(err => {
                this.setState({
                    loading: false
                });
                Alert.alert('Error', err);
            });
        }
    }

    getProceedReports = async () => {
        this.setState({
            loading: true
        });
        const querySnapshot = await firestore()
        .collection('reports')
        .where('status', '==', 'Proceed')
        .get()
        .then(snapshot => {
            if (snapshot._docs.length > 0) {
                const list = [];
                snapshot
                .docs
                .forEach(async report => {
                    const {title, desc, imgSrc, date, user} = report.data();
                    await list.push({
                        id: report.id,
                        title: title,
                        desc: desc,
                        imgSrc: imgSrc,
                        date: date,
                        user: user
                    });
                });
                this.setState({
                    loading: false,
                    proceedReports: list
                });
            }else{
                this.setState({
                    loading: false,
                    proceedReports: null
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
        .where('status', '==', 'Proceed')
        .onSnapshot({
            error: e => Alert.alert('Error', e),
            next: reports => {
                if (reports._docs.length > 0) {
                    const list = [];

                    reports.forEach(async report => {
                        const {title, desc, imgSrc, date, user} = report.data();
                        await list.push({
                            id: report.id,
                            title: title,
                            desc: desc,
                            imgSrc: imgSrc,
                            date: date,
                            user: user
                        });
                    });

                    this.setState({
                        loading: false,
                        proceedReports: list
                    });
                }else{
                    this.setState({
                        loading: false
                    });
                }
            }
        });
        //force to recall the method when stack navigate
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.getProceedReports();
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
        this.focusListener.remove();
    }

    render() {
        return (
            <React.Fragment>
                <Loader loading={this.state.loading} />
                <MainHeader navigation={this.props.navigation}/>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    {this.state.proceedReports != null ? (
                        this.state.proceedReports.map((data, index) => {
                            return (
                                <View key={index}>
                                    <Card>
                                        <Card.Cover source={{ uri: data.imgSrc }} />
                                        <Card.Content style={{flexDirection: 'row', paddingTop: 10, paddingBottom: 15, position: 'relative'}}>
                                            <Avatar.Image style={{ marginRight: 10 }} size={35} source={{ uri: 'https://source.unsplash.com/50x50/?people' }} />
                                            <View style={{flex: 1}}>
                                                <Text>{data.title}</Text>
                                                <Caption>{data.user.fullName} - {data.date}</Caption>
                                            </View>
                                            {
                                                this.state.currentUser != null ? 
                                                (
                                                    this.state.currentUser.isStaff ?
                                                    (
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
                                                            title="Closed" 
                                                            onPress={() => this.confirmAlert(
                                                                'Yakin ingin menutup laporan ini??',
                                                                data.id
                                                            )} />
                                                        </Menu>
                                                    ) : null 
                                                ) : null
                                            }
                                        </Card.Content>
                                    </Card>
                                    <Divider />
                                </View>
                            );
                        })
                    ) : <Caption style={{alignSelf: 'center', marginTop: 14}}>Tidak ada laporan sedang diproses.</Caption>}
                </ScrollView>
                <Portal>
                    <Dialog
                        visible={this.state.showModal}
                        onDismiss={this.toggleDialog}>
                        <Dialog.Title>Closed Report</Dialog.Title>
                        <Dialog.Content>
                            <Caption>Reason</Caption>
                            <TextInput 
                            mode="outlined" 
                            style={{backgroundColor: "white", fontSize: 12}} 
                            theme={textInputConfig} 
                            multiline={true}
                            onChangeText={this.handleChangeInput('staffNotes')}
                            value={this.state.staffNotes} 
                            placeholder="Type something..."/>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={async () => {
                                await this.toggleDialog();
                                this.closeReports();
                            }}>Done</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </React.Fragment>
        );
    }
}

const textInputConfig = {
    colors: {
        primary: '#1976d2'
    },
    roundness: 2
}

const styles = StyleSheet.create({

})

export default ProceedReports;