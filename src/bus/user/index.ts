import {useCallback} from 'react';
import {userActions} from './slice';

// Tools
import {useSelector, useDispatch} from '../../tools/hooks';
import {
  LoginForm,
  PayloadFeedbackData,
  PayloadUserData,
  RegisterForm,
  ResetPassword,
} from './types';
import {login} from './thunk/login';
import {getUserData} from './thunk/getUserData';
import {clearTokens, refreshToken} from '../../init/axios/baseService';
import {load} from '../../utils/storage';
import {register} from './thunk/register';
import {refresh} from './thunk/refresh';
import {updateUserData} from './thunk/updateUser';
import {sendFeedbackData} from './thunk/sendFeedback';
import {resetPasswordData} from './thunk/resetPassword';

// Types
// import * as types from './types';

let refreshInFlight: Promise<unknown> | null = null;

export const useUser = () => {
  const dispatch = useDispatch();

  const setAuthorize = useCallback(
    (state: boolean) => dispatch(userActions.setAuthorize(state)),
    [dispatch],
  );

  const logout = useCallback(async () => {
    clearTokens();
    refreshInFlight = null;
    dispatch(userActions.setAuthorize(false));
  }, [dispatch]);

  const tokenRefresh = useCallback(
    async (callback?: () => void | Promise<unknown>) => {
      const token = await load(refreshToken);

      if (!token) {
        dispatch(userActions.setAuthorize(false));
        return false;
      }

      if (!refreshInFlight) {
        refreshInFlight = dispatch(refresh({refreshToken: token}))
          .unwrap()
          .finally(() => {
            refreshInFlight = null;
          });
      }

      try {
        await refreshInFlight;
        return callback ? callback() : true;
      } catch {
        dispatch(userActions.setAuthorize(false));
        return false;
      }
    },
    [dispatch],
  );

  const fetchUserData = useCallback(async () => {
    dispatch(getUserData());
  }, [dispatch]);

  const fetchUser = useCallback(
    () => tokenRefresh(fetchUserData),
    [fetchUserData, tokenRefresh],
  );

  const updateUser = useCallback(
    (state: PayloadUserData) => {
      tokenRefresh(() => dispatch(updateUserData(state)));
    },
    [dispatch, tokenRefresh],
  );

  const sendFeedback = useCallback(
    (state: PayloadFeedbackData) => {
      tokenRefresh(() => dispatch(sendFeedbackData(state)));
    },
    [dispatch, tokenRefresh],
  );

  const resetPassword = useCallback(
    (state: ResetPassword) => {
      dispatch(resetPasswordData(state));
    },
    [dispatch],
  );

  const loginUser = useCallback(
    (values: LoginForm) => dispatch(login(values)).unwrap(),
    [dispatch],
  );

  const registerUser = useCallback(
    (values: RegisterForm) => dispatch(register(values)).unwrap(),
    [dispatch],
  );

  return {
    user: useSelector(({user}) => user.user),
    isLoading: useSelector(({user}) => user.isLoading),
    isAuthorized: useSelector(({user}) => user.isAuthorized),
    login: loginUser,
    register: registerUser,
    fetchUser,
    setAuthorize,
    logout,
    tokenRefresh,
    updateUser,
    sendFeedback,
    resetPassword,
  };
};
