import {Dispatch, SetStateAction} from 'react';
import {Platform, NativeModules} from 'react-native';

const {EsimChecker, ESIMSupportModule} = NativeModules;

type SetEsimSupported = Dispatch<SetStateAction<boolean>>;

export const checkEsimSupport = (setEsimSupported: SetEsimSupported) => {
  try {
    if (Platform.OS === 'ios') {
      EsimChecker.isEsimSupported((isSupported: boolean) => {
        setEsimSupported(isSupported);
      });
    }

    if (Platform.OS === 'android') {
      const isSupported = ESIMSupportModule.supportsEmbeddedSIM();
      setEsimSupported(isSupported);
    }
  } catch (err) {
    console.log('Error checking ESIM support:', err);
  }
};
