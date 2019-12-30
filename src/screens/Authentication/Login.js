import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { HelperText, TextInput, Text, TouchableRipple, Appbar, Headline, Title } from 'react-native-paper';
import AppLogo from '../../assets/primakara.png';
const Login = () => {
	const [emailValue, setEmailValue] = useState('');
	const [passwordValue, setPasswordValue] = useState('');
	return (
		<View style={{ flex: 1 }}>
			<Appbar.Header style={{backgroundColor: '#FFFFFF', justifyContent: 'center', height: 80, borderTopWidth: 5, borderTopColor: '#1976d2'}}>
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
							onChangeText={value => setEmailValue(value)}
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
			        </HelperText> : <Text></Text>}
					</View>
					<View>
						<TextInput
							label="Password"
							value={passwordValue}
							onChangeText={value => setPasswordValue(value)}
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
					>
						<Text style={{ alignSelf: 'center', color: 'white' }}>Sign In</Text>
					</TouchableRipple>
				</View>
			</ScrollView>
		</View>
	)
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