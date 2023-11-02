import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const Prev = (props: SvgProps) => (
  <Svg width={22} height={38} fill="none" {...props}>
    <Path
      fill={props.color}
      d="M1.232 17.232a2.5 2.5 0 0 0 0 3.536l15.91 15.91a2.5 2.5 0 0 0 3.536-3.536L6.536 19 20.678 4.858a2.5 2.5 0 1 0-3.536-3.536l-15.91 15.91ZM7 16.5H3v5h4v-5Z"
    />
  </Svg>
);
export default Prev;
