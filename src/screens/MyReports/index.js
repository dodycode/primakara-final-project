import * as React from 'react';
import { ScrollView, View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Dialog, Portal, Button, Paragraph, Caption } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import MainHeader from '../../components/MainHeader';
import Loader from '../../components/Loader';

const fullWidth = Dimensions.get('window').width;

class MyReports extends React.Component {

    state = {
        visible: false,
        loading: false,
        userReports: null,
        currentUser: null
    };

    _showDialog = (id) => this.setState({ visible: id });

    _hideDialog = () => this.setState({ visible: false });

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
                    const { fullName, isStaff, uid } = user.data();
                    list = {
                        fullName,
                        isStaff,
                        uid
                    }
                });
                await this.setState({
                    currentUser: list
                });
                this.getReports();
                // console.log(this.state.currentUser);
            })
            .catch(error => {
                console.error(error);
            })
        }
      } catch(e) {
        console.error(e);
      }
    }

    getReports = async () => {
        const { currentUser } = this.state;
        await firestore()
        .collection('reports')
        .where('user.uid', '==', currentUser.uid)
        .onSnapshot({
            error: e => Alert.alert('Error', e),
            next: reports => {
                if (reports._docs.length > 0) {
                    const list = [];

                    reports.forEach(async report => {
                        const {title, desc, imgSrc, date, status, staff, staffNote} = report.data();
                        await list.push({
                            id: report.id,
                            title: title,
                            desc: desc,
                            imgSrc: imgSrc,
                            date: date,
                            status: status,
                            staff: staff,
                            staffNote: staffNote
                        });
                    });
                    this.setState({
                        loading: false,
                        userReports: list
                    });
                }else{
                    this.setState({
                        loading: false
                    });
                }
            }
        });
    }

   componentDidMount() {
        this.setState({
            loading: true
        });
        this.getUser();
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.getUser();
        });
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }

    render() {
        return (
            <React.Fragment>
                <Loader loading={this.state.loading} />
                <MainHeader navigation={this.props.navigation}/>
                <ScrollView contentContainerStyle={this.state.userReports != null ? style.scrollViewStyle : {flexDirection: 'column', flexGrow: 1}}>
                    { this.state.userReports != null ?
                        this.state.userReports.map((data,index) => {
                            const handledBy = data.staff != null ? data.staff : 'None';
                            const staffNote = data.staffNote != null ? data.staffNote : 'None';
                            return (
                                <React.Fragment key={index}>
                                    <View style={style.imgWrapper}>
                                        <TouchableOpacity onPress={() => this._showDialog(data.id)}>
                                            <Image
                                                source={{ uri: data.imgSrc }}
                                                style={style.img} />
                                        </TouchableOpacity>
                                    </View>
                                    <Portal>
                                        <Dialog
                                            visible={this.state.visible == data.id}
                                            onDismiss={this._hideDialog}>
                                            <Dialog.Title>{data.title}</Dialog.Title>
                                            <Dialog.Content>
                                                <Image
                                                    source={{ uri: data.imgSrc }}
                                                    style={style.imgDidalem} />
                                                <Paragraph>
                                                    {
                                                        'Description: \n' + data.desc + '\n' +
                                                        'Status: \n' + data.status + '\n' +
                                                        'Handled by: \n'+ handledBy + '\n' +
                                                        'Staff note: \n'+ staffNote
                                                    }
                                                </Paragraph>
                                            </Dialog.Content>
                                            <Dialog.Actions>
                                                <Button onPress={this._hideDialog}>Done</Button>
                                            </Dialog.Actions>
                                        </Dialog>
                                    </Portal>
                                </React.Fragment>
                            )
                        }) : <Caption style={{alignSelf: 'center', marginTop: 14}}>Tidak ada laporan.</Caption>}
                </ScrollView>
            </React.Fragment>
        );
    }
}

const style = StyleSheet.create({
    imgWrapper: {
        margin: 1
    },
    img: {
        width: fullWidth / 2 - 2,
        height: 150,
        resizeMode: 'cover'
    },
    imgDidalem: {
        width: 200,
        height: 150,
        resizeMode: 'cover'
    },
    scrollViewStyle: { 
        flexGrow: 1, 
        flexDirection: 'row', 
        flexWrap: 'wrap' 
    }
})

export default MyReports;