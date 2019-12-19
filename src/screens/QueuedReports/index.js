import * as React from 'react';
import { Button, Card, Title, Paragraph, Text, Subheading, Caption, Avatar, Divider } from 'react-native-paper';
import { ScrollView, StyleSheet, View } from 'react-native';

class QueuedReports extends React.Component {
    render() {
        const imgData = ['1', '2', '3', '4', '5', '6', '7', '8']
        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {imgData.map((data, index) => {
                    return (
                        <View key={index}>
                        <Card>
                            <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                            <Card.Content style={{flexDirection: 'row', paddingTop: 10, paddingBottom: 10}}>
                                <Avatar.Image style={{ marginRight: 10 }} size={35} source={{ uri: 'https://source.unsplash.com/50x50/?people' }} />
                                <View>
                                    <Text>Dobleh Awwwse</Text>
                                    <Caption>Head of UPT</Caption>
                                </View>
                            </Card.Content>
                        </Card>
                        <Divider/>
                        </View>
                    );
                })}
            </ScrollView>
        );
    }
}

export default QueuedReports;