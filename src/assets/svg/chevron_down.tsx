import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const ChevronDown = (props: SvgProps) => (
  <Svg width={15} height={11} fill="none" {...props}>
    <Path fill="#F7A936" d="M7.5 11 .139.5H14.86L7.5 11Z" />
  </Svg>
);
export default ChevronDown;
