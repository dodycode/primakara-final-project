import * as React from 'react';
import {Appbar} from 'react-native-paper';

export default class QueuedReports extends React.Component{
    goBack = () => console.log('went back');

    handleSearch = () => console.log('Searching');

    handleMore = () => console.log('Shown more');
    
    render(){
        return(
            <Appbar.Header>
                 <Appbar.Action icon="menu" onPress={this.handleMore}/>
                <Appbar.Content title="Primakara Reports"/>
                <Appbar.Action icon="magnify" onPress={this.handleSearch}/>
            </Appbar.Header>
        );
    }
}