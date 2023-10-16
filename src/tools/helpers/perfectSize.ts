import {Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
const designSize = {width: 375, height: 812};
const CURRENT_RESOLUTION = Math.sqrt(height * height + width * width);
const DESIGN_RESOLUTION = Math.sqrt(
  designSize.height * designSize.height + designSize.width * designSize.width,
);
const RESOLUTIONS_PROPORTION = CURRENT_RESOLUTION / DESIGN_RESOLUTION;

export const perfectSize = (size: number) => {
  return RESOLUTIONS_PROPORTION * size;
};
