import {userActions} from './slice';

// Tools
import {useSelector, useDispatch} from '../../tools/hooks';
import {FiltersType} from './types';

// Types
// import * as types from './types';

export const useUser = () => {
  const dispatch = useDispatch();

  const setAuthorize = (state: boolean) =>
    dispatch(userActions.setAuthorize(state));

  const setFilters = (state: FiltersType) =>
    dispatch(userActions.setFilters(state));

  return {
    isAuthorized: useSelector(({user}) => user.isAuthorized),
    filters: useSelector(({user}) => user.filters),
    setAuthorize,
    setFilters,
  };
};
