import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const ArrowRight = (props: SvgProps) => (
  <Svg width={108} height={30} fill="none" {...props}>
    <Path
      fill="#fff"
      d="M107.414 16.414a2 2 0 0 0 0-2.828L94.686.858a2 2 0 1 0-2.828 2.828L103.172 15 91.858 26.314a2 2 0 1 0 2.828 2.828l12.728-12.728ZM0 17h106v-4H0v4Z"
    />
  </Svg>
);
export default ArrowRight;
