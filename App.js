import React from 'react';
import {
  SafeAreaView
} from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import QueuedReports from './src/screens/QueuedReports';

const App = () => {
  return (
    <PaperProvider>
     	<QueuedReports />
    </PaperProvider>
  );
};

export default App;