import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Avatar, Caption, Subheading, Divider, TouchableRipple } from 'react-native-paper';
class StaffList extends React.Component{
 render(){
  let staffs = [
  	{
  		title: 'Albert Einstein',
  		job: 'President of UPT'
  	},
  	{
  		title: 'Kathleen Principato',
  		job: 'Vice President of UPT'
  	},
  	{
  		title: 'Chris Collum',
  		job: 'UPT'
  	},
  	{
  		title: 'Wink Tomczak',
  		job: 'UPT'
  	},
  	{
  		title: 'Wade Fagundes',
  		job: 'UPT'
  	}
  ];
  return(
   <View style={styles.container}>
   		{
   			staffs.map((staff, index, arr) => {
   				return(
   					<View key={index}>
	   					<View style={styles.userCard}>
				   			<Avatar.Image style={{marginRight: 5}} size={50} source={{uri: 'https://source.unsplash.com/50x50/?people'}}/>
				   			<View style={styles.userContent}>
				   				<Subheading>{staff.title}</Subheading>
				   				<Caption>{staff.job}</Caption>
				   			</View>
				   			<TouchableRipple style={styles.btn} rippleColor="rgba(0, 0, 0, .32)">
			   					<Image style={{width: 14, resizeMode: 'contain'}} source={require('../../assets/menu.png')}/>
			   				</TouchableRipple>
				   		</View>

				   		{arr.length - 1 != index ? <Divider /> : null}
			   		</View>
   				);
   			})
   		}
   </View>
  );
 }
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 17,
		paddingTop: 10,
		flexDirection: 'column',
		backgroundColor: '#FFFFFF',
		flex: 1
	},
	userCard: {
		flexDirection: 'row',
		alignItems: 'center',
		position: 'relative'
	},
	userContent:{
		flexDirection: 'column',
		paddingVertical: 10,
		position: 'relative'
	},
	btn: {
		position: 'absolute', 
		right: 0, 
		top: 10
	}
})

export default StaffList;