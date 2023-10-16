import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const ChevronUp = (props: SvgProps) => (
  <Svg width={12} height={9} fill="none" {...props}>
    <Path fill="#131517" d="m6 0 5.196 9H.804L6 0Z" />
  </Svg>
);
export default ChevronUp;
