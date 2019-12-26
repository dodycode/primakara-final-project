import * as React from 'react';
import { List, Avatar, Card, Subheading, Paragraph, Headline } from 'react-native-paper';
import {View, Image, ScrollView} from 'react-native';
import MainHeader from '../../components/MainHeader';

class About extends React.Component {
  state = {
    expanded: true
  }

  _handlePress = () =>
    this.setState({
      expanded: !this.state.expanded
    });

  render() {
    return (
      <React.Fragment>
        <MainHeader />
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <Image style={{width: '100%', height: 200}} source={{uri:'https://ak2.picdn.net/shutterstock/videos/9707132/thumb/1.jpg'}}/>
          <View style={{paddingHorizontal: 17}}>
          <Headline style={{alignSelf: 'center', marginTop: 8}}>About</Headline>
          <Paragraph style={{textAlign: 'justify'}}>Overview Other Details Product Description This amazing SBSA034 watch piece from the Seiko x Diavolo JoJo's Bizarre Adventure Golden Wind</Paragraph>
          </View>
          <View style={{justifyContent:'center'}}>
            <Avatar.Image style={{alignSelf:'center', marginTop: 10}} size={100} source={{uri:'https://s.pacn.ws/640/w0/jojos-bizarre-adventure-golden-wind-original-soundtrack-vol-1-576057.2.jpg?pjzeh5'}}/>
            <Subheading style={{alignSelf:'center'}} >Dobleh</Subheading>
          </View>
          <View style={{flexDirection: 'row', alignSelf:'center'}}>
          <Avatar.Image style={{marginRight:20}} size={100} source={{uri:'https://s.pacn.ws/640/w0/jojos-bizarre-adventure-golden-wind-original-soundtrack-vol-1-576057.2.jpg?pjzeh5'}}/>
          <Avatar.Image size={100} source={{uri:'https://s.pacn.ws/640/w0/jojos-bizarre-adventure-golden-wind-original-soundtrack-vol-1-576057.2.jpg?pjzeh5'}}/>
          </View>
          <View style={{flexDirection: 'row', alignSelf:'center'}}>
            <Subheading style={{marginRight:80}}>Jamal</Subheading>
            <Subheading>Kabur</Subheading>
          </View>
        </ScrollView>
      </React.Fragment>
    );
  }
}

export default About;