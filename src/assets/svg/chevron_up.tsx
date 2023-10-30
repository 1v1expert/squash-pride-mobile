import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
type ChevronUpProps = {
  color: string;
} & SvgProps;
const ChevronUp = (props: ChevronUpProps) => (
  <Svg width={16} height={12} fill="none" {...props}>
    <Path fill={props.color} d="m8.178.952 7.275 10.56-14.722-.12L8.178.952Z" />
  </Svg>
);
export default ChevronUp;
