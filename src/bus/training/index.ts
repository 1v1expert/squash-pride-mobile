import {trainingActions} from './slice';

// Tools
import {useSelector, useDispatch} from '../../tools/hooks';
import {ExerciseType, FiltersType} from './types';
import {getGroupData} from './thunk/group';
import {getExercise} from './thunk/exercise';
import {getRules} from './thunk/rules';
import {getTechniques} from './thunk/techniques';
import {useUser} from '../user';

export const useTraining = () => {
  const dispatch = useDispatch();
  const {tokenRefresh} = useUser();
  const filters = useSelector(({training}) => training.filters);
  const groups = useSelector(({training}) => training.group);
  const exercises = useSelector(({training}) => training.exercises);
  const rules = useSelector(({training}) => training.rules);
  const techniques = useSelector(({training}) => training.techniques);
  const isLoading = useSelector(({training}) => training.isLoading);
  const stackOfExercises = useSelector(
    ({training}) => training.stackOfExercises,
  );

  const setFilters = (state: FiltersType) => {
    dispatch(trainingActions.setFilters(state));
  };
  const addToStack = (state: ExerciseType) => {
    dispatch(trainingActions.addToStack(state));
  };
  const removeFromStack = (state: ExerciseType['uid']) => {
    dispatch(trainingActions.removeFromStack(state));
  };
  const resetStack = () => {
    dispatch(trainingActions.resetStack());
  };
  const resetExercises = () => {
    dispatch(trainingActions.resetExercises());
  };
  const fetchGroup = async () => {
    tokenRefresh(() => dispatch(getGroupData()));
  };
  const fetchExercise = async (
    data: FiltersType & {readyTraining?: boolean},
  ) => {
    console.log(data);
    tokenRefresh(() => dispatch(getExercise(data)));
  };
  const fetchRules = async () => tokenRefresh(() => dispatch(getRules()));
  const fetchTechniques = async () =>
    tokenRefresh(() => dispatch(getTechniques()));

  return {
    groups,
    filters,
    exercises,
    rules,
    techniques,
    isLoading,
    stackOfExercises,
    setFilters,
    addToStack,
    removeFromStack,
    resetStack,
    fetchRules,
    fetchTechniques,
    fetchExercise,
    fetchGroup,
    resetExercises,
  };
};
