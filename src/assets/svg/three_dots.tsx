import * as React from 'react';
import Svg, {SvgProps, Circle} from 'react-native-svg';
const ThreeDots = (props: SvgProps) => (
  <Svg width={6} height={31} fill="none" {...props}>
    <Circle cx={3} cy={3} r={3} fill={props.color} />
    <Circle cx={3} cy={15.389} r={3} fill={props.color} />
    <Circle cx={3} cy={27.779} r={3} fill={props.color} />
  </Svg>
);
export default ThreeDots;
