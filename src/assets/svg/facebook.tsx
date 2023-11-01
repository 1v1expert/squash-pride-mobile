import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const Facebook = (props: SvgProps) => {
  const {color, width, height} = props;
  return (
    <Svg
      width={width}
      height={height}
      fill={color}
      viewBox="0 0 50 50"
      {...props}>
      <Path d="M32 11h5a1 1 0 0 0 1-1V3.263a.997.997 0 0 0-.925-.997C35.484 2.153 32.376 2 30.141 2 24 2 20 5.68 20 12.368V19h-7a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7v19a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V28h7.222a1 1 0 0 0 .994-.89l.778-7A1 1 0 0 0 37 19h-8v-5a3 3 0 0 1 3-3z" />
    </Svg>
  );
};
export default Facebook;
