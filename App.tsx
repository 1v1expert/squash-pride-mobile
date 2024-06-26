import React, {useEffect} from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {store} from './src/init/redux';
import {Navigation} from './src/view/navigation';
import {config} from './config/gluestack-ui.config';
import SplashScreen from 'react-native-splash-screen';
import {Platform} from 'react-native';
import Orientation from 'react-native-orientation-locker';

const App = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
    Orientation.lockToPortrait();
  }, []);
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
