import * as React from 'react';
import { ScrollView, View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Dialog, Portal, Button, Paragraph } from 'react-native-paper';

const fullWidth = Dimensions.get('window').width;

class ClosedReports extends React.Component {

    state = {
        visible: false,
    };

    _showDialog = () => this.setState({ visible: true });

    _hideDialog = () => this.setState({ visible: false });

    render() {

        const imgData = ['1', '2', '3', '4', '5', '6', '7', '8']

        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                {imgData.map((index, data) => {
                    return (
                        <View key={index} style={style.imgWrapper}>
                            <TouchableOpacity onPress={this._showDialog}>
                                <Image
                                    source={{ uri: 'https://picsum.photos/700' }}
                                    style={style.img} />
                            </TouchableOpacity>
                        </View>
                    )
                })}

                <Portal>
                    <Dialog
                        visible={this.state.visible}
                        onDismiss={this._hideDialog}>
                        <Dialog.Title>The First Report</Dialog.Title>
                        <Dialog.Content>
                            <Image
                                source={{ uri: 'https://picsum.photos/700' }}
                                style={style.imgDidalem} />
                            <Paragraph>this is about a broken stuff</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={this._hideDialog}>Done</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </ScrollView>
        );
    }
}

const style = StyleSheet.create({
    imgWrapper: {
        margin: 1
    },
    img: {
        width: fullWidth / 2 - 2,
        height: 150,
        resizeMode: 'cover'
    },
    imgDidalem: {
        width: 200,
        height: 150,
        resizeMode: 'cover'
    }
})

export default ClosedReports;