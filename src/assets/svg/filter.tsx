import * as React from 'react';
import Svg, {SvgProps, Path, Ellipse} from 'react-native-svg';
const FilterIcon = (props: SvgProps) => (
  <Svg width={17} height={17} fill="none" {...props}>
    <Path stroke="#F7A936" d="M0 2.242h17M0 8.823h17M0 15.129h17" />
    <Ellipse cx={3.584} cy={2.056} fill="#F7A936" rx={1.536} ry={2.056} />
    <Ellipse cx={13.825} cy={8.637} fill="#F7A936" rx={1.536} ry={2.056} />
    <Ellipse cx={3.584} cy={14.944} fill="#F7A936" rx={1.536} ry={2.056} />
  </Svg>
);
export default FilterIcon;
