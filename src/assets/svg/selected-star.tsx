import * as React from 'react';
import Svg, {
  SvgProps,
  Path,
  Rect,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';
const SelectedStar = (props: SvgProps) => (
  <Svg width={17} height={15} fill="none" {...props}>
    <Path fill="#F5F5F5" d="M0 0h17v15H0z" />
    <Rect width={321} height={51} x={-287} y={-17} fill="#090A0B" rx={10} />
    <Path
      fill="url(#a)"
      d="m8.799.805 3 3.882 5.089 1.33-3.236 3.73.146 4.706-5-1.577L3.8 14.453l.146-4.705L.71 6.018 5.8 4.687 8.798.805Z"
    />
    <Path
      fill="url(#b)"
      stroke="#fff"
      strokeWidth={4}
      d="m8.755 4 1.764 2.276 2.992.78-1.902 2.186.085 2.758-2.939-.924L5.816 12l.086-2.758L4 7.056l2.992-.78L8.755 4Z"
    />
    <Path
      fill="url(#c)"
      d="m9 4.176 1.854 2.129 3.146.73-2 2.045.09 2.58L9 10.795l-3.09.865L6 9.08 4 7.035l3.146-.73L9 4.176Z"
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
      <LinearGradient
        id="b"
        x1={8.755}
        x2={8.755}
        y1={4.176}
        y2={13.021}
        gradientUnits="userSpaceOnUse">
        <Stop offset={0.245} stopColor="#FBC66F" />
        <Stop offset={0.869} stopColor="#F7AB39" />
      </LinearGradient>
      <LinearGradient
        id="c"
        x1={5.35}
        x2={5.35}
        y1={-0.551}
        y2={7.723}
        gradientUnits="userSpaceOnUse">
        <Stop offset={0.245} stopColor="#FBC66F" />
        <Stop offset={0.869} stopColor="#F7AB39" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default SelectedStar;
