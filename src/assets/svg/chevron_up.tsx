import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const ChevronUp = (props: SvgProps) => (
  <Svg width={16} height={12} fill="none" {...props}>
    <Path fill="#F7A936" d="m8.178.952 7.275 10.56-14.722-.12L8.178.952Z" />
  </Svg>
);
export default ChevronUp;
