import React from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {store} from './src/init/redux';
import {Navigation} from './src/view/navigation';
import {config} from './gluestack-ui.config';

const App = () => {
  return (
    <ReduxProvider store={store}>
      <SafeAreaProvider>
        <GluestackUIProvider config={config}>
          <Navigation />
        </GluestackUIProvider>
      </SafeAreaProvider>
    </ReduxProvider>
  );
};

export default App;
