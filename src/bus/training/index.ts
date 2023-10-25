import {trainingActions} from './slice';

// Tools
import {useSelector, useDispatch} from '../../tools/hooks';
import {FiltersType} from './types';
import {getGroupData} from './thunk/group';
import {getExercise} from './thunk/exercise';

export const useTraining = () => {
  const dispatch = useDispatch();
  const filters = useSelector(({training}) => training.filters);
  const groups = useSelector(({training}) => training.group);
  const exercises = useSelector(({training}) => training.exercises);
  const isLoading = useSelector(({training}) => training.isLoading);

  const setFilters = (state: FiltersType) => {
    dispatch(trainingActions.setFilters(state));
  };
  const fetchGroup = () => {
    dispatch(getGroupData());
  };
  const fetchExercise = ({players, group, level}: FiltersType) => {
    dispatch(getExercise({players, group, level}));
  };

  return {
    groups,
    filters,
    exercises,
    isLoading,
    setFilters,
    fetchGroup,
    fetchExercise,
  };
};
