import {trainingActions} from './slice';

// Tools
import {useSelector, useDispatch} from '../../tools/hooks';
import {ExerciseType, FavoriteType, FiltersType, TrainingType} from './types';
import {getGroupData} from './thunk/group';
import {getExercise} from './thunk/exercise';
import {getRules} from './thunk/rules';
import {getTechniques} from './thunk/techniques';
import {useUser} from '../user';
import {getInstructionData} from "./thunk/instruction";

export const useTraining = () => {
  const dispatch = useDispatch();
  const {tokenRefresh} = useUser();
  const filters = useSelector(({training}) => training.filters);
  const completedTrainings = useSelector(({training}) => training.trainings);

  const groups = useSelector(({training}) => training.group);
  const exercises = useSelector(({training}) => training.exercises);
  const rules = useSelector(({training}) => training.rules);
  const techniques = useSelector(({training}) => training.techniques);
  const isLoading = useSelector(({training}) => training.isLoading);
  const stackOfExercises = useSelector(
    ({training}) => training.stackOfExercises,
  );
  const favorites = useSelector(({training}) => training.favorites);

  const addFavoriteItem = (item: FavoriteType | FavoriteType[]) => {
    dispatch(trainingActions.addFavorite(item));
  };
  const removeFavoriteItem = (item: FavoriteType) => {
    dispatch(trainingActions.removeFavorite(item));
  };
  const editFavoriteItem = (item: FavoriteType) => {
    dispatch(trainingActions.editFavorite(item));
  };
  const getFavoriteItem = (item: ExerciseType | ExerciseType[] | undefined) => {
    if (item) {
      if (Array.isArray(item)) {
        return !!favorites.filter(
          e => JSON.stringify(e.training) === JSON.stringify(item),
        ).length;
      } else {
        return !!favorites.filter(e => e.exercise?.uid === item.uid).length;
      }
    }
  };

  const addDoneTraining = (state: TrainingType) => {
    const included = completedTrainings.some(
      e => JSON.stringify(e.training) === JSON.stringify(state.training),
    );
    if (!included) {
      dispatch(trainingActions.addCompletedTraining(state));
    }
  };
  const removeDoneTraining = (item: TrainingType) => {
    dispatch(trainingActions.removeCompletedTraining(item));
  };
  const editDoneTraining = (item: TrainingType) => {
    dispatch(trainingActions.editCompletedTraining(item));
  };

  const setFilters = (state: FiltersType) => {
    dispatch(trainingActions.setFilters(state));
  };
  const setExercises = (state: ExerciseType[]) => {
    dispatch(trainingActions.setExercises(state));
  };
  const addToStack = (state: ExerciseType | ExerciseType[]) => {
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
  const resetFilters = () => {
    dispatch(trainingActions.resetFilters());
  };
  const fetchGroup = async () => {
    tokenRefresh(() => dispatch(getGroupData()));
  };
  const fetchExercise = async (
    data?: FiltersType & {readyTraining?: boolean},
  ): Promise<ExerciseType[]> => {
    return tokenRefresh(() => dispatch(getExercise(data)).unwrap());
  };
  const fetchInstructions = async () => tokenRefresh(() => dispatch(getInstructionData()));
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
    favorites,
    completedTrainings,
    setFilters,
    setExercises,
    addToStack,
    removeFromStack,
    resetStack,
    fetchRules,
    fetchTechniques,
    fetchExercise,
    fetchGroup,
    resetExercises,
    addFavoriteItem,
    removeFavoriteItem,
    getFavoriteItem,
    editFavoriteItem,
    addDoneTraining,
    resetFilters,
    editDoneTraining,
    removeDoneTraining,
  };
};
