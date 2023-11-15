import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import baseService from '../../../init/axios/baseService';
import {ExerciseType, FiltersType} from '../types';

const exerciseAction = createAction('user/getExercise');

export const getExercise = createAsyncThunk<
  ExerciseType[],
  FiltersType & {readyTraining?: boolean}
>(
  exerciseAction.type,
  async ({players, group, level, readyTraining}, {rejectWithValue}) => {
    try {
      const currentGroup = group && group[0];

      const path = `/exercise/?group=${currentGroup}&level=${level}&players=${players}${
        readyTraining ? '&type=automate' : ''
      }`;

      const {data} = await baseService.get<ExerciseType[]>(path);

      console.log('data', data);
      return data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data.error || 'Something is wrong');
    }
  },
);
