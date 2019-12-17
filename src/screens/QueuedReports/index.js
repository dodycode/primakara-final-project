import * as React from 'react';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { ScrollView } from 'react-native';

export default class QueuedReports extends React.Component {    

    render() {
        return (
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <Card>
                    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                    <Card.Content>
                        <Title>The First Report</Title>
                        <Paragraph>this is about a broken stuff</Paragraph>
                    </Card.Content>
                    <Card.Actions>
                        <Button>Proceed</Button>
                    </Card.Actions>
                </Card>

                <Card>
                    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                    <Card.Content>
                        <Title>The First Report</Title>
                        <Paragraph>this is about a broken stuff</Paragraph>
                    </Card.Content>
                    <Card.Actions>
                        <Button>Proceed</Button>
                    </Card.Actions>
                </Card>

                <Card>
                    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                    <Card.Content>
                        <Title>The First Report</Title>
                        <Paragraph>this is about a broken stuff</Paragraph>
                    </Card.Content>
                    <Card.Actions>
                        <Button>Proceed</Button>
                    </Card.Actions>
                </Card>
            </ScrollView>

        );
    }
}