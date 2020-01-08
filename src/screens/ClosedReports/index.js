import * as React from 'react';
import { ScrollView, View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Dialog, Portal, Button, Paragraph, Caption } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import MainHeader from '../../components/MainHeader';

const fullWidth = Dimensions.get('window').width;

class ClosedReports extends React.Component {

    state = {
        visible: false,
        loading: false,
        closedReports: null
    };

    _showDialog = (id) => this.setState({ visible: id });

    _hideDialog = () => this.setState({ visible: false });

    componentDidMount() {
        this.setState({
            loading: true
        });
        this.unsubscribe = firestore()
        .collection('reports')
        .where('status', '==', 'Closed')
        .onSnapshot({
            error: e => Alert.alert('Error', e),
            next: reports => {
                if (reports._docs.length > 0) {
                    const list = [];

                    reports.forEach(async report => {
                        const {title, desc, imgSrc, date} = report.data();
                        await list.push({
                            id: report.id,
                            title: title,
                            desc: desc,
                            imgSrc: imgSrc,
                            date: date
                        });
                    });

                    this.setState({
                        loading: false,
                        closedReports: list
                    });
                }else{
                    this.setState({
                        loading: false
                    });
                }
            }
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {

        return (
            <React.Fragment>
                <MainHeader navigation={this.props.navigation}/>
                <ScrollView contentContainerStyle={this.state.closedReports != null ? style.scrollViewStyle : {flexDirection: 'column', flexGrow: 1}}>
                    { this.state.closedReports != null ?
                        this.state.closedReports.map((data,index) => {
                            return (
                                <React.Fragment key={index}>
                                    <View style={style.imgWrapper}>
                                        <TouchableOpacity onPress={() => this._showDialog(data.id)}>
                                            <Image
                                                source={{ uri: data.imgSrc }}
                                                style={style.img} />
                                        </TouchableOpacity>
                                    </View>
                                    <Portal>
                                        <Dialog
                                            visible={this.state.visible == data.id}
                                            onDismiss={this._hideDialog}>
                                            <Dialog.Title>{data.title}</Dialog.Title>
                                            <Dialog.Content>
                                                <Image
                                                    source={{ uri: data.imgSrc }}
                                                    style={style.imgDidalem} />
                                                <Paragraph>
                                                    {data.desc}
                                                </Paragraph>
                                            </Dialog.Content>
                                            <Dialog.Actions>
                                                <Button onPress={this._hideDialog}>Done</Button>
                                            </Dialog.Actions>
                                        </Dialog>
                                    </Portal>
                                </React.Fragment>
                            )
                        }) : <Caption style={{alignSelf: 'center', marginTop: 14}}>Tidak ada laporan yang ditutup.</Caption>}
                </ScrollView>
            </React.Fragment>
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
    },
    scrollViewStyle: { 
        flexGrow: 1, 
        flexDirection: 'row', 
        flexWrap: 'wrap' 
    }
})

export default ClosedReports;