import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const Plus = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path fill="#F7AB39" d="M0 9.144h20v1.714H0z" />
    <Path fill="#F7AB39" d="M9.143 20V0h1.714v20z" />
  </Svg>
);
export default Plus;
