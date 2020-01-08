import React from 'react';
import { View } from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../components/Loader';

class Logout extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			loading: false
		}
	}

	logout = async () => {
		this.setState({
			loading: true
		})
		await firebase.auth().signOut();
		try {
		    await AsyncStorage.removeItem('user_id');
		} catch(e) {
		  	console.error(e);
		}
		await this.setState({
			loading: false
		});
 		this.props.navigation.navigate('Login');
	}

	componentDidMount() {
		this.logout();
	}

	render() {
		return(
			<View style={{flex: 1}}>
				<Loader loading={this.state.loading}/>
			</View>
		);
	}
}

export default Logout;