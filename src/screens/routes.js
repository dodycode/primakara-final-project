import React from 'react';
import { Image } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import QueuedReports from './QueuedReports';
import ClosedReports from './ClosedReports';
import ProceedReports from './ProceedReports';
import AddNew from './AddNew';
import StaffList from './StaffList';
import About from './About';
import Login from './Authentication/Login';
import Register from './Authentication/Register';
import Logout from './Logout';

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
		ProceedReports: {
			screen: ProceedReports,
			navigationOptions: {
				title: 'Proceed',
				tabBarIcon: ({ tintColor }) => (
					<Icon size={23} name='file-chart' style={{ color: tintColor }} />
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
		ClosedReports: {
			screen: ClosedReports,
			navigationOptions: {
				title: 'Closed',
				tabBarIcon: ({ tintColor }) => (
					<Icon size={23} name='file-check' style={{ color: tintColor }} />
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

const DrawerNavigator = createDrawerNavigator({
	MainApp: {
		screen: AppNavigator,
		navigationOptions: {
			title: 'Home'
		}
	},
	Logout: {
		screen: Logout,
		navigationOptions: {
			title: 'Log out'
		}
	}
});

const AuthStack = createStackNavigator({
	Login: {
		screen: Login,
		navigationOptions: {
			title: 'Log In'
		}
	},
	Register: {
		screen: Register,
		navigationOptions: {
			title: 'Register'
		}
	}
},
{
	headerMode: 'none'
});

const Navigators = createSwitchNavigator({
  Auth: {screen: AuthStack},
  App: {screen: DrawerNavigator},
});

export default createAppContainer(Navigators);