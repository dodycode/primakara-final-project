import React from 'react';
import axios from 'axios';
import { View, ImageBackground, StyleSheet, TextInput, Dimensions, Image, ScrollView, Alert } from 'react-native';
import { TouchableRipple, TextInput as ReactNativeTextInput, Caption, Text } from 'react-native-paper';
import Ripple from 'react-native-material-ripple';
import MainHeader from '../../components/MainHeader';
import Loader from '../../components/Loader';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import moment from "moment";

const ukuranLayar = Dimensions.get('window').width;

class EditReports extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            title: null,
            imgSrc: null,
            desc: null,
            date: moment(new Date()).fromNow(),
            loading: false,
            currentUser: null
        }

        this.db = firestore()
        .collection('reports')
        .doc(this.props.navigation.getParam('reportId', 'NO-ID'));
    }

    setInputs = async () => {
        const { title, imgSrc, desc } = this.state;
        this.setState({
            loading: true,
        });
        await this.db
            .get()
            .then(report => {
                if (report.exists) {
                    const data = report.data();
                    this.setState({
                        title: data.title,
                        imgSrc: data.imgSrc,
                        desc: data.desc,
                        loading: false,
                    });
                } else {
                    this.setState({
                        loading: false,
                    });
                    Alert.alert('Error', 'Document not found!');
                }
            })
            .catch(err => {
                Alert.alert('Error', err);
            });
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
            })
            .catch(error => {
                console.error(error);
            })
        }
      } catch(e) {
        console.error(e);
      }
    }

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

    handleChangeInput = field => text => {
        this.setState({
            [field]: text
        });
    };

    handleSelectImage = () => {
        const options = {
            quality: 1,
            storageOptions: {
                skipBackup: true
            }
        };

        try {
            ImagePicker.showImagePicker(options, response => {
                if (response.data) {
                    this.setState({
                        imgSrc: 'data:image/png;base64,' + response.data
                    });
                }
            });
        } catch (e) {
            console.error(e);
        }
    }

    handleOnSubmit = async () => {
        const { title, imgSrc, desc, date, currentUser } = this.state;
        this.setState({
            loading: true
        });
        if (title != null 
            && imgSrc != null
            && desc != null) {
            let status = 'Queued';
            await this.db.update({
                title: title,
                imgSrc: imgSrc,
                desc: desc
            }).then(async post => {
                await this.handleNotif('[INFO]: Report ['+title+'] telah di perbaharui oleh '+currentUser.fullName);
                await this.setState({
                    loading: false,
                    title: null,
                    imgSrc: null,
                    desc: null
                });
                this.props.navigation.navigate('QueuedReports');
            }).catch(async err => {
                await this.setState({
                    loading: false,
                });
                Alert.alert('Error', err);
            })
        }else{
            this.setState({
                loading: false
            });
            Alert.alert('Error', 'Mohon lengkapi seluruh data!');
        }
    }

    componentDidMount() {
        this.getUser();
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.setInputs();
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
                <ScrollView style={{ flexDirection: "column", backgroundColor: 'white', flex: 1, flexGrow: 1 }}>
                    <ImageBackground source={this.state.imgSrc != null ? {uri: this.state.imgSrc} : require('../../assets/default.jpg')} imageStyle={{ opacity: 0.8}} style={styles.imgfields} resizeMethod="scale">
                        <TextInput
                            placeholder="Type The Report Title..."
                            placeholderTextColor="#fff"
                            style={styles.imgtext}
                            onChangeText={this.handleChangeInput('title')}
                            value={this.state.title}
                        />
                        <TouchableRipple style={{position: 'absolute', bottom: 17, right: 18}}
                        onPress={() => this.handleSelectImage()}>
                            <Image source={require('../../assets/photo-camera.png')} style={{width: 20, height: 20}}></Image>
                        </TouchableRipple>
                    </ImageBackground>
                    <View style={{padding: 16, flexDirection: 'column'}}>
                        <Caption>Description</Caption>
                        <ReactNativeTextInput 
                        mode="outlined" 
                        style={{backgroundColor: "white", fontSize: 12}} 
                        theme={textInputConfig} 
                        multiline={true}
                        onChangeText={this.handleChangeInput('desc')}
                        value={this.state.desc} 
                        placeholder="Type something..."/>
                        <Ripple 
                        rippleColor="white"
                        style={styles.btnRipple}
                        onPress={this.handleOnSubmit}>
                            <Text style={{color: 'white', alignSelf: 'center'}}>Save Change</Text>
                        </Ripple>
                    </View>
                </ScrollView>
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
    imgfields: {
        width: ukuranLayar,
        height: 150,
        position: "relative",
        backgroundColor: "black",
        padding: 16
    },
    imgtext: {
        width: '80%',
        position: 'absolute',
        bottom: 5,
        left: 16,
        color: "#fff"
    },
    btnRipple: {
        marginTop: 14,
        backgroundColor: textInputConfig.colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 8,
        borderRadius: 4
    }
})

export default EditReports;