import {userActions} from './slice';

// Tools
import {useSelector, useDispatch} from '../../tools/hooks';

// Types
// import * as types from './types';

export const useUser = () => {
  const dispatch = useDispatch();

  const setAuthorize = (state: boolean) =>
    dispatch(userActions.setAuthorize(state));

  return {
    isAuthorized: useSelector(({user}) => user.isAuthorized),
    setAuthorize,
  };
};
