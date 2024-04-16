import {deviceActions} from './slice';

// Tools
import {useDispatch, useSelector} from '../../tools/hooks';
import {Dimensions} from './types';

export const useDevice = () => {
  const dispatch = useDispatch();
  const portrait = useSelector(({device}) => device.portrait);
  const landscape = useSelector(({device}) => device.landscape);
  const fullscreen = useSelector(({device}) => device.fullscreen);

  const setDeviceDimensions = (state: Dimensions) =>
    dispatch(deviceActions.setDimensions(state));

  const setScreenMode = (state: boolean) =>
    dispatch(deviceActions.setFullscreen(state));

  return {
    portrait,
    landscape,
    fullscreen,
    setDeviceDimensions,
    setScreenMode,
  };
};
