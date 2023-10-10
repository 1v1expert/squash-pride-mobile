import * as React from 'react';
import Svg, {
  SvgProps,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';
const Star = (props: SvgProps) => (
  <Svg width={17} height={15} fill="none" {...props}>
    <Path
      fill="url(#a)"
      d="m8.799.805 3 3.882 5.089 1.33-3.236 3.73.146 4.706-5-1.577L3.8 14.453l.146-4.705L.71 6.018 5.8 4.687 8.798.805Z"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={8.799}
        x2={8.799}
        y1={0.805}
        y2={15.893}
        gradientUnits="userSpaceOnUse">
        <Stop offset={0.245} stopColor="#FBC66F" />
        <Stop offset={0.869} stopColor="#F7AB39" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default Star;
