import React, {useEffect} from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {store} from './src/init/redux';
import {Navigation} from './src/view/navigation';
import {config} from './config/gluestack-ui.config';
import SplashScreen from 'react-native-splash-screen';
import {Platform, View, StyleSheet, useWindowDimensions} from 'react-native';
import Orientation from 'react-native-orientation-locker';

const App = () => {
  const {width: screenWidth} = useWindowDimensions();
  const isDesktopWeb = Platform.OS === 'web' && screenWidth >= 900;

  // Dynamic maxWidth: ~85% of screen but constrained between 380-760px
  const dynamicMaxWidth = Math.min(
    Math.max(Math.round(screenWidth * 0.85), 380),
    760,
  );

  const styles = StyleSheet.create({
    appContainer: {
      flex: 1,
    },
    appWrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: isDesktopWeb ? 'center' : 'stretch',
      backgroundColor: '#131517',
    },
    appContent: {
      flex: 1,
      width: '100%',
      maxWidth: isDesktopWeb ? dynamicMaxWidth : undefined,
      backgroundColor: '#131517',
    },
  });

  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }

    if (Platform.OS !== 'web') {
      Orientation.lockToPortrait();
    }
  }, []);

  return (
    <ReduxProvider store={store}>
      <SafeAreaProvider>
        <GluestackUIProvider config={config}>
          <View style={styles.appWrapper}>
            <View style={styles.appContent}>
              <View style={styles.appContainer}>
                <Navigation />
              </View>
            </View>
          </View>
        </GluestackUIProvider>
      </SafeAreaProvider>
    </ReduxProvider>
  );
};

export default App;
