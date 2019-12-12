import React, {useState} from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { HelperText, TextInput, Text, TouchableRipple } from 'react-native-paper';
import AppLogo from '../../assets/clipboards.png';
const Login = () => {
	const [emailValue, setEmailValue] = useState('');
	const [passwordValue, setPasswordValue] = useState('');
	return(
		<View style={styles.authBgColor}>
			<View style={styles.authContainer}>
				<Image source={AppLogo} style={styles.appLogo}/>
				<View>
					<TextInput
			          label="Email"
			          value={emailValue}
			          onChangeText={value => setEmailValue(value)}
			          style={{backgroundColor: 'transparent'}}
			          selectionColor="#FFFFFF"
			          underlineColor="#FFFFFF"
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
			          style={{backgroundColor: 'transparent'}}
			          secureTextEntry={true}
			          selectionColor="#FFFFFF"
			          underlineColor="#FFFFFF"
			          theme={textInputConfig}
			        />
		        </View>
		        <TouchableRipple
		        	rippleColor="rgba(0, 0, 0, .32)"
				    style={styles.authBtn}
				>
			    	<Text style={{alignSelf: 'center', color: 'white'}}>Sign In</Text>
			  	</TouchableRipple>
			</View>
		</View>
	)
}

const textInputConfig = {
	colors: {
        text: 'white', 
        placeholder: 'white',
        primary: 'white'
	}
}

const styles = StyleSheet.create({
	authBgColor: {
		backgroundColor: '#1abf9b',
		flex: 1
	},
	authContainer: {
		paddingHorizontal: 30
	},
	appLogo: {
		width: 100,
		height: 100,
		marginTop: 60,
		marginBottom: 40,
		alignSelf: 'center'
	},
	authBtn: {
		backgroundColor: '#4fc3dd',
		marginTop: 18,
		paddingVertical: 12,
		borderRadius: 18
	}
});

export default Login;