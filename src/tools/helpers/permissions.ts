import {PermissionsAndroid, Platform} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const checkIOSLocationPermissions = async () => {
  let isIOSLocationGranted = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

  if (isIOSLocationGranted !== RESULTS.GRANTED) {
    isIOSLocationGranted = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
  }

  return isIOSLocationGranted;
};

const checkAndroidLocationPermissions = async () => {
  const permissionStatus = await PermissionsAndroid.request(
    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    {
      title: 'Permission for location access',
      message: 'We need your permission to access your location',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    },
  );

  return permissionStatus;
};

export const getLocationPermission = () => {
  if (Platform.OS === 'ios') {
    try {
      return checkIOSLocationPermissions();
    } catch (error) {
      console.warn('iosLocationError', error);
    }
  }

  if (Platform.OS === 'android') {
    try {
      return checkAndroidLocationPermissions();
    } catch (error) {
      console.warn('androidLocationError', error);
    }
  }

  return 'denied';
};
