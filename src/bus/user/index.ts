import {userActions} from './slice';

// Tools
import {useSelector, useDispatch} from '../../tools/hooks';
import {LoginForm, RegisterForm} from './types';
import {login} from './thunk/login';
import {getUserData} from './thunk/getUserData';
import {
  accessToken,
  clearTokens,
  setAuthHeader,
} from '../../init/axios/baseService';
import {load} from '../../utils/storage';
import {register} from './thunk/register';

// Types
// import * as types from './types';

export const useUser = () => {
  const dispatch = useDispatch();

  const setAuthorize = (state: boolean) =>
    dispatch(userActions.setAuthorize(state));

  const logout = async () => {
    clearTokens();
    dispatch(userActions.setAuthorize(false));
  };
  const fetchUser = async () => {
    const access = await load(accessToken);

    if (access) {
      setAuthHeader(access);
    }
    dispatch(getUserData());
  };
  return {
    user: useSelector(({user}) => user.user),
    isLoading: useSelector(({user}) => user.isLoading),
    isAuthorized: useSelector(({user}) => user.isAuthorized),
    login: (values: LoginForm) => dispatch(login(values)).unwrap(),
    register: (values: RegisterForm) => dispatch(register(values)).unwrap(),
    fetchUser,
    setAuthorize,
    logout,
  };
};
