import * as React from 'react';
import { Button, Card, Title, Paragraph, Text, Subheading, Caption, Avatar, Divider, TouchableRipple } from 'react-native-paper';
import { ScrollView, StyleSheet, View, Image } from 'react-native';
import MainHeader from '../../components/MainHeader';

class QueuedReports extends React.Component {
    render() {
        const imgData = ['1', '2', '3', '4', '5', '6', '7', '8']
        return (
            <React.Fragment>
                <MainHeader navigation={this.props.navigation}/>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    {imgData.map((data, index) => {
                        return (
                            <View key={index}>
                                <Card>
                                    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                                    <Card.Content style={{flexDirection: 'row', paddingTop: 10, paddingBottom: 15, position: 'relative'}}>
                                        <Avatar.Image style={{ marginRight: 10 }} size={35} source={{ uri: 'https://source.unsplash.com/50x50/?people' }} />
                                        <View style={{flex: 1}}>
                                            <Text>Toilet rusak dan mengeluarkan Bau Menyengat</Text>
                                            <Caption>Arif Muhammad - 3 Hari yang lalu</Caption>
                                        </View>
                                        <TouchableRipple style={{position: 'absolute', right: 8, top: 16}}>
                                            <Image
                                            style={{width: 14, height: 14, resizeMode: 'contain'}} 
                                            source={require('../../assets/menu.png')}></Image>
                                        </TouchableRipple>
                                    </Card.Content>
                                </Card>
                                <Divider />
                            </View>
                        );
                    })}
                </ScrollView>
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({

})

export default QueuedReports;