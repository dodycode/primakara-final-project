import React from 'react';
import { View, ImageBackground, StyleSheet, TextInput, Dimensions, Image, ScrollView } from 'react-native';
import { TouchableRipple, TextInput as ReactNativeTextInput, Caption, Text } from 'react-native-paper';
import Ripple from 'react-native-material-ripple';
import MainHeader from '../../components/MainHeader';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-picker';

const ukuranLayar = Dimensions.get('window').width;

class AddNew extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            title: null,
            imgSrc: null,
            desc: null,
            date: null
        }
    }

    handleChangeInput = field => text => {
        this.setState({
            [field]: text
        });
    };

    handleSelectImage = () => {
        const options = {
            quality: 0.5,
            maxHeight: 200,
            maxWidth: 200,
            storageOptions: {
                skipBackup: true
            }
        };

        try {
            ImagePicker.showImagePicker(options, response => {
                if (response.data) {
                    this.setState({
                        imgSrc: 'data:image/jpeg;base64,' + response.data
                    });
                }
            });
        } catch (e) {
            console.error(e);
        }
    }

    render() {
        return (
            <React.Fragment>
                <MainHeader navigation={this.props.navigation}/>
                <ScrollView style={{ flexDirection: "column", backgroundColor: 'white', flex: 1, flexGrow: 1 }}>
                    <ImageBackground source={this.state.imgSrc != null ? {uri: this.state.imgSrc} : require('../../assets/default.jpg')} imageStyle={{ opacity: 0.8}} style={styles.imgfields}>
                        <TextInput
                            placeholder="Type The Report Title..."
                            placeholderTextColor="#fff"
                            style={styles.imgtext}
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
                        placeholder="Type something..."/>
                        <Ripple 
                        rippleColor="white"
                        style={styles.btnRipple}>
                            <Text style={{color: 'white', alignSelf: 'center'}}>Save Report!</Text>
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
        padding: 16,
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

export default AddNew;