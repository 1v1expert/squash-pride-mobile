import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const Check = (props: SvgProps) => (
  <Svg width={17} height={16} fill="none" {...props}>
    <Path
      stroke="#F7AB39"
      strokeWidth={2}
      d="m1 5.026 3.927 8.53a1.5 1.5 0 0 0 2.613.201L16 1"
    />
  </Svg>
);
export default Check;
