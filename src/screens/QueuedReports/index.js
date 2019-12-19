import * as React from 'react';
import { Button, Card, Title, Paragraph, Text } from 'react-native-paper';
import { ScrollView, StyleSheet, View } from 'react-native';

class QueuedReports extends React.Component {    
    render() {
        const imgData = ['1', '2', '3', '4', '5', '6', '7', '8']
        return (
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                {imgData.map((data, index) => {
                    return(
                        <Card key={index}>
                            <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                            <Card.Content>
                                <Title>The Report Titles</Title>
                                <Paragraph>this is about a broken stuff</Paragraph>
                            </Card.Content>
                            <Card.Actions>
                                <Button>
                                    <Text style={{color: '#d81b60', fontWeight: 'bold'}}>Proceed</Text>
                                </Button>
                            </Card.Actions>
                        </Card>
                    );
                })}
            </ScrollView>
        );
    }
}

export default QueuedReports;