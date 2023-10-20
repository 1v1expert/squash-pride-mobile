import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const ArrowLeft = (props: SvgProps) => (
  <Svg width={10} height={12} fill="none" {...props}>
    <Path
      fill="#F7A936"
      d="M.47 5.47a.75.75 0 0 0 0 1.06l4.773 4.773a.75.75 0 1 0 1.06-1.06L2.061 6l4.242-4.243a.75.75 0 0 0-1.06-1.06L.47 5.47ZM2 5.25H1v1.5h1v-1.5Z"
    />
  </Svg>
);
export default ArrowLeft;
