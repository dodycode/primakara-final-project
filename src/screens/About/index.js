import * as React from 'react';
import { List, Avatar, Card, Subheading, Paragraph, Headline, Title, Caption } from 'react-native-paper';
import {View, Image, ScrollView} from 'react-native';
import MainHeader from '../../components/MainHeader';

class About extends React.Component {
  state = {
    expanded: true
  }

  render() {
    return (
      <React.Fragment>
        <MainHeader navigation={this.props.navigation}/>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <Image style={{width: '100%', height: 150}} source={{uri:'https://ak2.picdn.net/shutterstock/videos/9707132/thumb/1.jpg'}}/>
          <View style={{paddingHorizontal: 17,marginBottom: 15, marginTop: 15}}>
          <Subheading style={{alignSelf: 'flex-start', marginTop: 8}}>About</Subheading>
          <Caption style={{textAlign: 'justify'}}>Primakara Reports is an app to help Primakara's citizen reporting broken stuffs in Campus.</Caption>
          </View>
          <View style={{paddingHorizontal: 17,marginBottom: 25}}>
          <Subheading style={{alignSelf: 'flex-start', marginTop: 8}}>Origin</Subheading>
          <Caption style={{textAlign: 'justify'}}>Primakara Reports is an idea from a young inspired programmer named Dody. He searched for the partner to help him on his project. Brief story, He found 2 young boys named Gilang and Sujiwa and offered them to join a cause for this project. Many struggled have passed, many enemies has been slayed, they still struggling until this time.</Caption>
          </View>

          <View style={{paddingHorizontal:10, flexDirection:'row', marginTop:10,marginBottom:25, justifyContent:'space-around'}}>
          <View style={{flexDirection:'column', justifyContent:'center'}}>
            <Avatar.Image style={{alignSelf:'center'}} size={90} source={require('../../assets/dody.jpeg')}/>
            <Paragraph style={{alignSelf:'center'}} >Dody</Paragraph>
          </View>
          <View style={{flexDirection: 'column', justifyContent:'center'}}>
          <Avatar.Image style={{alignSelf:'center'}} size={90} source={require('../../assets/gilang.jpg')}/>
          <Paragraph style={{alignSelf:'center'}}>Gilang</Paragraph>
          </View>
          <View style={{flexDirection: 'column', justifyContent:'center'}}>
          <Avatar.Image style={{alignSelf:'center'}} size={90} source={require('../../assets/jojo.jpg')}/>
          <Paragraph style={{alignSelf:'center'}} >Sujiwa</Paragraph>
          </View>
          </View>
        </ScrollView>
      </React.Fragment>
    );
  }
}

export default About;