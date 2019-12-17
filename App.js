import React from 'react';
import {
  ScrollView,
  View
} from 'react-native';
import { BottomNavigation, Appbar, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import QueuedReports from './src/screens/QueuedReports';
import ClosedReports from './src/screens/ClosedReports';

const primakaraReportsTheme = {
  ...DefaultTheme,
  roundness: 2,
  dark: true
};

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
          { key: 'recents', title: 'Staff', icon: 'account-group' },
          { key: 'four', title: 'About', icon: 'information' },
      ],
  };

  handleIndexChange = index => this.setState({ index });

  renderScene = () => BottomNavigation.SceneMap({
      music: MusicRoute,
      albums: AlbumsRoute,
      recents: RecentsRoute,
      four: FourRoute
  });

  goBack = () => console.log('went back');

  handleSearch = () => console.log('Searching');

  handleMore = () => console.log('Shown more');

  render(){
    return (
      <PaperProvider theme={primakaraReportsTheme}>
        <View style={{flex: 1}}>
          <Appbar.Header>
              <Appbar.Action icon="menu" onPress={this.handleMore} />
              <Appbar.Content title="Primakara Reports" />
              <Appbar.Action icon="magnify" onPress={this.handleSearch} />
          </Appbar.Header>
          <View style={{flex: 10}}>
            <ClosedReports theme={primakaraReportsTheme} />
          </View>
          <BottomNavigation
                navigationState={this.state}
                onIndexChange={this.handleIndexChange}
                renderScene={this.renderScene}
                style={{flex: 0}}
            />
        </View>
      </PaperProvider>
    );
  }
};

export default App;