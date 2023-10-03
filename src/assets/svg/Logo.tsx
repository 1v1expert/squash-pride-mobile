import * as React from 'react';
import Svg, {Rect, Path, Defs, Pattern, Use, Image} from 'react-native-svg';
function Logo(props) {
  return (
    <Svg
      width={1440}
      height={1516}
      viewBox="0 0 1440 1516"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}>
      <Rect
        opacity={0.4}
        x={-38}
        width={1516}
        height={1516}
        rx={758}
        fill="#000"
      />
      <Path fill="url(#pattern0)" d="M122 160H1319V1357H122z" />
      <Defs>
        <Pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}>
          <Use xlinkHref="#image0_164_4095" transform="scale(.00024)" />
        </Pattern>
        <Image id="image0_164_4095" width={4096} height={4096} />
      </Defs>
    </Svg>
  );
}
export default Logo;
