import React from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { HelperText, TextInput, Text, TouchableRipple, Appbar, Headline, Title } from 'react-native-paper';
import { firebase } from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import AppLogo from '../../assets/primakara.png';
import Loader from '../../components/Loader';

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			emailValue: '',
			passwordValue: '',
			loading: false
		}
	}

	handleChangeInput = field => text => {
        this.setState({
            [field]: text
        });
    };

    handleOnSubmit = async () => {
		const {emailValue, passwordValue} = this.state;
		if (emailValue != '' && passwordValue != '') {
			this.setState({
				loading: true,
			});
			await firebase
				.auth()
				.signInWithEmailAndPassword(emailValue, passwordValue)
				.then(async userCredentials => {
					try {
						await AsyncStorage.setItem('user_id', userCredentials.user.uid);
					}catch(e){
						await this.setState({
							loading: false,
						});
						Alert.alert('Error', e);
					}
					this.props.navigation.navigate('MainApp');
				})
				.catch(error => {
					this.setState({
						loading: false,
					});
					Alert.alert('Error', error.code);
				});
		} else {
			Alert.alert('Error', 'Email dan Password Harus isi');
		}
	};

    render(){
    	const {emailValue, passwordValue} = this.state;
    	return (
			<View style={{ flex: 1 }}>
				<Loader loading={this.state.loading} />
				<Appbar.Header style={{backgroundColor: '#FFFFFF', justifyContent: 'center', height: 80, borderTopWidth: 5, borderTopColor: '#1976d2', position: 'relative'}}>
					<Image source={AppLogo} style={{ width: 120, height: 120, resizeMode: 'contain' }}/>
				</Appbar.Header>
				<ScrollView style={styles.authBgColor}>
					<View style={styles.authContainer}>
						<View>
						</View>
						<View>
							<TextInput
								label="Email"
								value={emailValue}
								onChangeText={this.handleChangeInput('emailValue')}
								style={{ backgroundColor: 'transparent' }}
								selectionColor="rgb(215, 215, 215)"
								underlineColor="rgb(215, 215, 215)"
								theme={textInputConfig}
								error={emailValue != '' && !emailValue.includes('@') ? true : false}
							/>
							{emailValue != '' ? <HelperText
								type="error"
								visible={!emailValue.includes('@')}
							>
								Email address is invalid!
				        </HelperText> : null}
						</View>
						<View>
							<TextInput
								label="Password"
								value={passwordValue}
								onChangeText={this.handleChangeInput('passwordValue')}
								style={{ backgroundColor: 'transparent' }}
								secureTextEntry={true}
								selectionColor="rgb(215, 215, 215)"
								underlineColor="rgb(215, 215, 215)"
								theme={textInputConfig}
							/>
						</View>
						<TouchableRipple
							rippleColor="rgba(0, 0, 0, .32)"
							style={styles.authBtn}
							onPress={this.handleOnSubmit}
						>
							<Text style={{ alignSelf: 'center', color: 'white' }}>Sign In</Text>
						</TouchableRipple>
						<View style={{marginTop: 14, flexDirection:'row'}}>
							<Text>Doesn't have an account? </Text>
							<TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
								<Text style={{fontWeight: 'bold'}}>Register now!</Text>
							</TouchableOpacity>
						</View>
					</View>
				</ScrollView>
			</View>
		)
    }
}

const textInputConfig = {
	colors: {
		text: '#000000',
		placeholder: '#969696',
		primary: 'rgb(215, 215, 215)'
	}
}

const styles = StyleSheet.create({
	authBgColor: {
		backgroundColor: '#FFFFFF',
		flexGrow: 1,
		flex: 1
	},
	authContainer: {
		paddingHorizontal: 30,
		paddingVertical: 30,
		flexDirection: 'column'
	},
	authBtn: {
		backgroundColor: '#4fc3dd',
		marginTop: 18,
		paddingVertical: 12,
		borderRadius: 18
	}
});

export default Login;