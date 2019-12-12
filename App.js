import React from 'react';
import {
  SafeAreaView
} from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import Home from './src/screens/Home';

const App = () => {
  return (
    <PaperProvider>
      <Home />
    </PaperProvider>
  );
};

export default App;