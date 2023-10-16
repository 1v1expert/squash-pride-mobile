import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const ChevronDown = (props: SvgProps) => (
  <Svg width={12} height={9} fill="none" {...props}>
    <Path fill="#F7A936" d="m6 9 5.196-9H.804L6 9Z" />
  </Svg>
);
export default ChevronDown;
