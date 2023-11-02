import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const Google = (props: SvgProps) => {
  const {color, width, height} = props;
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 50 50"
      fill={color}
      {...props}>
      <Path d="M17.188 10.938C9.421 10.938 3.124 17.233 3.124 25c0 7.766 6.297 14.063 14.063 14.063 7.765 0 14.062-6.297 14.062-14.063 0-.965-.105-1.906-.29-2.813l-.077-.312H17.188v4.688h9.375c-.747 4.433-4.731 7.812-9.375 7.812A9.372 9.372 0 0 1 7.813 25a9.372 9.372 0 0 1 9.375-9.375c2.343 0 4.48.867 6.125 2.29l3.359-3.29a13.997 13.997 0 0 0-9.485-3.688Zm21.875 6.25v4.687h-4.688V25h4.688v4.688h3.124V25h4.688v-3.125h-4.688v-4.688Z" />
    </Svg>
  );
};
export default Google;
