import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import baseService from '../../../init/axios/baseService';
import {ExerciseType, FiltersType} from '../types';

const exerciseAction = createAction('user/getExercise');

export const getExercise = createAsyncThunk<ExerciseType[], FiltersType>(
  exerciseAction.type,
  async ({players, group, level}, {rejectWithValue}) => {
    try {
      const currentGroup = group && group[0];

      const {data} = await baseService.get<ExerciseType[]>(
        `/exercise/?group=${currentGroup}&level=${level}&players=${players}`,
      );
      console.log('data', data);
      return data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data.error || 'Something is wrong');
    }
  },
);
