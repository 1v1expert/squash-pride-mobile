import {useCallback} from 'react';
import {trainingActions} from './slice';

// Tools
import {useSelector, useDispatch} from '../../tools/hooks';
import {ExerciseType, FavoriteType, FiltersType, PreparedTrainingType, TrainingType} from './types';
import {getGroupData} from './thunk/group';
import {getExercise} from './thunk/exercise';
import {getRules} from './thunk/rules';
import {getTechniques} from './thunk/techniques';
import {useUser} from '../user';
import PreparedTrainings from "../../view/screens/PreparedTrainings";
import {getPreparedTrainings} from "./thunk/prepared-training";

export const useTraining = () => {
  const dispatch = useDispatch();
  const {tokenRefresh} = useUser();
  const filters = useSelector(({training}) => training.filters);
  const completedTrainings = useSelector(({training}) => training.trainings);

  const groups = useSelector(({training}) => training.group);
  const exercises = useSelector(({training}) => training.exercises);
  const preparedTrainings = useSelector(({training}) => training.preparedTrainings);
  const rules = useSelector(({training}) => training.rules);
  const techniques = useSelector(({training}) => training.techniques);
  const isLoading = useSelector(({training}) => training.isLoading);
  const stackOfExercises = useSelector(
    ({training}) => training.stackOfExercises,
  );
  const favorites = useSelector(({training}) => training.favorites);

  const addFavoriteItem = useCallback((item: FavoriteType | FavoriteType[]) => {
    dispatch(trainingActions.addFavorite(item));
  }, [dispatch]);
  const removeFavoriteItem = useCallback((item: FavoriteType) => {
    dispatch(trainingActions.removeFavorite(item));
  }, [dispatch]);
  const editFavoriteItem = useCallback((item: FavoriteType) => {
    dispatch(trainingActions.editFavorite(item));
  }, [dispatch]);
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

  const addDoneTraining = useCallback((state: TrainingType) => {
    const included = completedTrainings.some(
      e => JSON.stringify(e.training) === JSON.stringify(state.training),
    );
    if (!included) {
      dispatch(trainingActions.addCompletedTraining(state));
    }
  }, [completedTrainings, dispatch]);
  const removeDoneTraining = useCallback((item: TrainingType) => {
    dispatch(trainingActions.removeCompletedTraining(item));
  }, [dispatch]);
  const editDoneTraining = useCallback((item: TrainingType) => {
    dispatch(trainingActions.editCompletedTraining(item));
  }, [dispatch]);

  const setFilters = useCallback((state: FiltersType) => {
    dispatch(trainingActions.setFilters(state));
  }, [dispatch]);
  const setExercises = useCallback((state: ExerciseType[]) => {
    dispatch(trainingActions.setExercises(state));
  }, [dispatch]);
  const setPreparedTrainings = useCallback((state: PreparedTrainingType[]) => {
    dispatch(trainingActions.setPreparedTrainings(state));
  }, [dispatch]);
  const addToStack = useCallback((state: ExerciseType | ExerciseType[]) => {
    dispatch(trainingActions.addToStack(state));
  }, [dispatch]);
  const removeFromStack = useCallback((state: ExerciseType['uid']) => {
    dispatch(trainingActions.removeFromStack(state));
  }, [dispatch]);
  const resetStack = useCallback(() => {
    dispatch(trainingActions.resetStack());
  }, [dispatch]);
  const resetExercises = useCallback(() => {
    dispatch(trainingActions.resetExercises());
  }, [dispatch]);
  const resetFilters = useCallback(() => {
    dispatch(trainingActions.resetFilters());
  }, [dispatch]);
  const fetchGroup = useCallback(async () => {
    tokenRefresh(() => dispatch(getGroupData()));
  }, [dispatch, tokenRefresh]);
  const fetchExercise = useCallback(async (
    data?: FiltersType & {readyTraining?: boolean},
  ): Promise<ExerciseType[]> => {
    return tokenRefresh(() => dispatch(getExercise(data)).unwrap());
  }, [dispatch, tokenRefresh]);
  // const fetchInstructions = async () => tokenRefresh(() => dispatch(getInstructionData()));
  const fetchRules = useCallback(async () => tokenRefresh(() => dispatch(getRules())), [dispatch, tokenRefresh]);
  const fetchTechniques = useCallback(async () =>
    tokenRefresh(() => dispatch(getTechniques())), [dispatch, tokenRefresh]);
  const fetchPreparedTrainings = useCallback(async (data?: FiltersType): Promise<PreparedTrainingType[]> =>
      tokenRefresh(() => dispatch(getPreparedTrainings(data)).unwrap()), [dispatch, tokenRefresh]);

  return {
    groups,
    filters,
    exercises,
    preparedTrainings,
    rules,
    techniques,
    isLoading,
    stackOfExercises,
    favorites,
    completedTrainings,
    setFilters,
    setExercises,
    setPreparedTrainings,
    addToStack,
    removeFromStack,
    resetStack,
    fetchRules,
    fetchTechniques,
    fetchExercise,
    fetchGroup,
    fetchPreparedTrainings,
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
