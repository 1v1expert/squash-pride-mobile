import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const TraningIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#D9D9D9"
      d="M0 10.461h6v9.538H0zM7 5.231h6V20H7zM14 0h6v20h-6z"
    />
  </Svg>
);
export default TraningIcon;
