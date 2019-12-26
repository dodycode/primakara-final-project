import React from 'react';
import { Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import QueuedReports from './QueuedReports';
import ClosedReports from './ClosedReports';
import AddNew from './AddNew';
import StaffList from './StaffList';
import About from './About';

const AppNavigator = createMaterialBottomTabNavigator(
  {
    QueuedReports: { 
    	screen: QueuedReports,
    	navigationOptions: {
    		title: 'Queued',
    		tabBarIcon: ({ tintColor }) => (
	          <Icon size={23} name='file-alert' style={{ color: tintColor }} />
	        )
    	} 
    },
    ClosedReports: { 
    	screen: ClosedReports,
    	navigationOptions: {
    		title: 'Closed',
    		tabBarIcon: ({ tintColor }) => (
	          <Icon size={23} name='file-check' style={{ color: tintColor }} />
	        )
    	}  
    },
   	AddNew: { 
   		screen: AddNew,
   		navigationOptions: {
   			title: 'Add',
    		tabBarIcon: ({ tintColor, focused }) => (
	          	<Image
			      source={require('../assets/add-square-button.png')}
			      style={{ width: 23, height: 23, tintColor: tintColor, marginTop: focused ? 0 : 3 }}
			    />
	        )
    	}
   	},
    StaffList: { 
    	screen: StaffList,
    	navigationOptions: {
    		title: 'Staff',
    		tabBarIcon: ({ tintColor }) => (
	          <Icon size={23} name='account-group' style={{ color: tintColor }} />
	        )
    	}
    },
    About: { 
    	screen: About,
    	navigationOptions: {
    		title: 'About',
    		tabBarIcon: ({ tintColor }) => (
	          <Icon size={23} name='information' style={{ color: tintColor }} />
	        )
    	} 
    }
  },
  {
    initialRouteName: 'QueuedReports',
    barStyle: { backgroundColor: '#1976d2' },
  }
);

export default createAppContainer(AppNavigator);