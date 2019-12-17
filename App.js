import React from 'react';
import {
  SafeAreaView
} from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import ClosedReports from './src/screens/ClosedReports';

const App = () => {
  return (
    <PaperProvider>
     	<ClosedReports />
    </PaperProvider>
  );
};

export default App;