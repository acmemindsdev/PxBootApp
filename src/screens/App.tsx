import React, { useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import Navigation from 'src/navigation/Navigator';
import theme from 'src/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as StateProvider } from 'react-redux';
import store from 'src/state/store';

const App = () => {
  // console.disableYellowBox = true;
  return (
    <StateProvider store={store}>
      <PaperProvider theme={theme.AppTheme}>
        <SafeAreaProvider>
          <Navigation />
        </SafeAreaProvider>
      </PaperProvider>
    </StateProvider>
  );
};

export default App;
