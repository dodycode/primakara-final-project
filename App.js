import React from 'react';
import {
  ScrollView,
  View,
  YellowBox
} from 'react-native';
import { BottomNavigation, Appbar, DefaultTheme, Text, Provider as PaperProvider } from 'react-native-paper';
import QueuedReports from './src/screens/QueuedReports';
import ClosedReports from './src/screens/ClosedReports';
import StaffList from './src/screens/StaffList';
import About from './src/screens/About';

const MusicRoute = () => <Text>Musicaaa</Text>;

const AlbumsRoute = () => <Text>Albums</Text>;

const RecentsRoute = () => <Text>Recents</Text>;

const FourRoute = () => <Text>Recents</Text>;


class App extends React.Component {

  constructor(props){
    super(props);
  }

  state = {
      index: 0,
      routes: [
          { key: 'music', title: 'Queued', icon: 'file-alert' },
          { key: 'albums', title: 'Closed', icon: 'file-check' },
          { key: 'shit', title: 'Add', icon: require('./src/assets/add-square-button.png')},
          { key: 'recents', title: 'Staff', icon: 'account-group' },
          { key: 'four', title: 'About', icon: 'information' },
      ],
  };

  handleIndexChange = index => this.setState({ index });

  renderScene = BottomNavigation.SceneMap({
      music: MusicRoute,
      albums: AlbumsRoute,
      shit: RecentsRoute,
      recents: RecentsRoute,
      four: FourRoute
  });

  goBack = () => console.log('went back');

  handleSearch = () => console.log('Searching');

  handleMore = () => console.log('Shown more');

  render(){
  	{/* Bugs generated by React Native Paper */}
  	YellowBox.ignoreWarnings([
  		'Warning: componentWillReceiveProps'
  	]);
  	const theme = {
	  ...DefaultTheme,
	  roundness: 0
	};
    return (
      <PaperProvider theme={theme}>
        <View style={{flex: 1}}>
          <Appbar.Header
          	style={{backgroundColor: '#1976d2'}}>
              <Appbar.Action icon="menu" onPress={this.handleMore} />
              <Appbar.Content title="Primakara Reports" />
              <Appbar.Action icon="magnify" onPress={this.handleSearch} />
          </Appbar.Header>
          <View style={{flex: 10}}>
            <About />
          </View>
          <BottomNavigation
                navigationState={this.state}
                onIndexChange={this.handleIndexChange}
                renderScene={this.renderScene}
                style={{flex: 0}}
                barStyle={{backgroundColor: '#1976d2'}}
            />
        </View>
      </PaperProvider>
    );
  }
};

export default App;