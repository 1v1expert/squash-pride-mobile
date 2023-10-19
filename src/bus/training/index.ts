import {trainingActions} from './slice';

// Tools
import {useSelector, useDispatch} from '../../tools/hooks';
import {FiltersType} from './types';

export const useTraining = () => {
  const dispatch = useDispatch();
  const filters = useSelector(({training}) => training.filters);

  const setFilters = (state: FiltersType) => {
    dispatch(trainingActions.setFilters(state));
  };

  return {
    filters,
    setFilters,
  };
};
