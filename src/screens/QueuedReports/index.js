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
            showMenu: false
        }
    }

    toggleMenu = () => {
        this.setState({
            showMenu: !this.state.showMenu
        })
    }

    getReports = async () => {
        const querySnapshot = await firestore()
        .collection('reports')
        .where('status', '==', 'Queued');

        this.setState({
            loading: true
        });

        querySnapshot.onSnapshot({
            error: e => Alert.alert('Error', e),
            next: reports => {
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
            }
        })
    }

    componentDidMount() {
        this.getReports();
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
                                                visible={this.state.showMenu}
                                                onDismiss={this.toggleMenu}
                                                anchor={
                                                    <TouchableRipple
                                                    onPress={this.toggleMenu}>
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
                                            <Menu.Item title="Proceed" />
                                            <Menu.Item title="Reject" />
                                            </Menu>
                                        </Card.Content>
                                    </Card>
                                    <Divider />
                                </View>
                            );
                        })
                    ) : null}
                </ScrollView>
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({

})

export default QueuedReports;