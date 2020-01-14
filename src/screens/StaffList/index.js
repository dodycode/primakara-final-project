import React from 'react';
import { View, StyleSheet, Image, Text, ScrollView, Alert } from 'react-native';
import { Avatar, Caption, Subheading, Divider, TouchableRipple, Menu } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import MainHeader from '../../components/MainHeader';
import Loader from '../../components/Loader';

class StaffList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			users: null,
			loading: false,
			showMenu: false,
			currentSelectedId: null,
            currentUser: null
		}
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
                    const { fullName, isStaff } = user.data();
                    list = {
                        fullName,
                        isStaff
                    }
                });
                await this.setState({
                    currentUser: list
                });
                // console.log(this.state.currentUser.isStaff);
            })
            .catch(error => {
                console.error(error);
            })
        }
      } catch(e) {
        console.error(e);
      }
    }

    getUsers = async () => {
        this.setState({
            loading: true
        });
        const querySnapshot = await firestore()
        .collection('users')
        .get()
        .then(snapshot => {
            if (snapshot._docs.length > 0) {
                const list = [];
                snapshot
                .docs
                .forEach(async user => {
                    const {fullName, isStaff, uid } = user.data();
                    await list.push({
                        id: user.id,
                        uid: uid,
                        fullName: fullName,
                        isStaff: isStaff
                    });
                });
                this.setState({
                    loading: false,
                    users: list
                });
            }else{
                this.setState({
                    loading: false,
                    users: null
                });
            }
        })
    }

    hideMenu = () => {
        this.setState({
            showMenu: false
        })
    }

    showMenu = id => {
        this.setState({
            showMenu: id
        });
    }

    confirmAlert = async (msg, id) => {
        await this.setState({
            currentSelectedId: id
        });
        Alert.alert(
          'Confirmation Message',
          msg,
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
                text: 'OK', 
                onPress: async () => {
                    await this.hideMenu();
                    this.setStaff();
                }
            },
          ],
          {cancelable: false},
        );
    }

    setStaff = async () => {
        if (this.state.currentSelectedId != null) {
            this.setState({
                loading: true
            });
            await firestore()
            .collection('users')
            .doc(this.state.currentSelectedId)
            .update({
                isStaff: true,
            })
            .then(async user => {
                await this.getUsers();
            })
            .catch(err => {
                this.setState({
                    loading: false
                });
                Alert.alert('Error', err);
            });
        }
    }

    componentDidMount() {
    	this.getUser();
    	//force to recall the method when stack navigate
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.getUsers();
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
			   <ScrollView style={styles.container}>
			   		{ this.state.users != null ? (
			   			this.state.users.map((user, index, arr) => {
			   				return(
			   					<View key={index}>
				   					<View style={styles.userCard}>
							   			<View style={styles.userContent}>
							   				<Subheading>{user.fullName}</Subheading>
							   				<Caption>{user.isStaff ? 'Staff' : 'Primers'}</Caption>
							   			</View>

							   			{
                                            this.state.currentUser != null
                                            && !user.isStaff ? 
                                            (
                                                this.state.currentUser.isStaff ?
                                                (
                                                    <Menu
                                                        visible={this.state.showMenu == user.id}
                                                        onDismiss={this.hideMenu}
                                                        anchor={
                                                            <TouchableRipple
                                                            onPress={() => this.showMenu(user.id)}>
                                                                    <Image
                                                                    style={{width: 14, height: 14, resizeMode: 'contain'}} 
                                                                    source={require('../../assets/menu.png')}></Image>
                                                                </TouchableRipple>
                                                            }
                                                        >
                                                        <Menu.Item 
                                                        title="set as Staff" 
                                                        onPress={() => this.confirmAlert(
                                                            'Yakin ingin menjadikan user ini sebagai staff?',
                                                            user.id
                                                        )} />
                                                    </Menu>
                                                ) : null 
                                            ) : null
                                        }
							   		</View>

							   		{arr.length - 1 != index ? <Divider /> : null}
						   		</View>
			   				);
			   			})
			   			) : <Text style={{alignSelf: 'center'}}>Tidak ada users</Text>
			   		}
			   </ScrollView>
		   </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 17,
        paddingTop: 10,
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        flex: 1,
        flexGrow: 1
    },
    userCard: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative'
    },
    userContent: {
        flexDirection: 'column',
        paddingVertical: 10,
        position: 'relative',
        flex: 1
    },
    btn: {
        position: 'absolute',
        right: 0,
        top: 10
    }
})

export default StaffList;