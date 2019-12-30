import React from 'react';
import {
  ScrollView,
  View,
  YellowBox
} from 'react-native';
import { Appbar, DefaultTheme } from 'react-native-paper';

class MainHeader extends React.Component {
	constructor(props){
		super(props);
	}

	handleMore() {
		console.log('show more');
	}

	render() {
		const theme = {
	  	  ...DefaultTheme,
	  	  roundness: 0
	  	};

	  	return (
	  		<Appbar.Header
	          	style={{backgroundColor: '#1976d2'}}>
	            <Appbar.Action icon="menu" onPress={this.handleMore} />
	            <Appbar.Content title="Primakara Reports" />
	        </Appbar.Header>
	  	);
	}
}

export default MainHeader;