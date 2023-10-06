import * as React from 'react';
import Svg, {SvgProps, Rect, Path} from 'react-native-svg';
const CalendarIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Rect width={20.351} height={16.14} y={3.86} fill="#D9D9D9" rx={4} />
    <Path
      fill="#D9D9D9"
      d="M4.912 0h1.754v4.912H4.912zM13.684 0h1.754v4.912h-1.754z"
    />
    <Path
      fill="#25282D"
      d="M13.684 15.088h1.754v1.754h-1.754zM10.175 15.088h1.754v1.754h-1.754zM6.667 15.088h1.754v1.754H6.667zM3.158 15.088h1.754v1.754H3.158zM13.684 11.228h1.754v1.754h-1.754zM10.175 11.228h1.754v1.754h-1.754zM6.667 11.228h1.754v1.754H6.667zM3.158 11.228h1.754v1.754H3.158z"
    />
  </Svg>
);
export default CalendarIcon;
