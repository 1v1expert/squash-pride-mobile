import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import baseService from '../../../init/axios/baseService';
import {ExerciseType, FiltersType} from '../types';

const exerciseAction = createAction('user/getExercise');

export const getExercise = createAsyncThunk<
  ExerciseType[],
  (FiltersType & {readyTraining?: boolean}) | undefined
>(exerciseAction.type, async (payload, {rejectWithValue}) => {
  // const {players, group, level, readyTraining} = payload;
  try {
    const currentGroup = payload && payload.group && payload.group[0];
    const groupPath = currentGroup ? `?group=${currentGroup}` : '';
    const levelPath =
      payload && payload.level
        ? `${currentGroup ? '&' : '?'}level=${payload.level}`
        : '';
    const playersPath =
      payload && payload.players
        ? `${
            payload.level && !currentGroup
              ? '&'
              : !payload.level && !currentGroup
              ? '?'
              : '&'
          }players=${payload.players}`
        : '';
    const typePath = payload && payload.readyTraining ? '&type=automate' : '';

    // const path = `/exercise/?group=${currentGroup}&level=${level}&players=${players}${
    //   readyTraining ? '&type=automate' : ''
    // }`;
    const paths = `/exercise/${groupPath + levelPath + playersPath + typePath}`;

    const {data} = await baseService.get<ExerciseType[]>(paths);

    console.log('data', data);
    return data;
  } catch (e: any) {
    return rejectWithValue(e.response?.data.error || 'Something is wrong');
  }
});
