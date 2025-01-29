import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import baseService from '../../../init/axios/baseService';
import {FiltersType, PreparedTrainingType} from '../types';

const preparedTrainingAction = createAction('user/getPreparedTraining');

export const getPreparedTrainings = createAsyncThunk<
    PreparedTrainingType[],
  (FiltersType & {readyTraining?: boolean}) | undefined
>(preparedTrainingAction.type, async (payload, {rejectWithValue}) => {
  try {
    const currentGroup = payload && payload.group && payload.group[0];
    // const groupPath = currentGroup ? `?group=${currentGroup}` : '';
    const playersPath =
      payload && payload.players
        ? `?players=${payload.players}`
        : '';
    const paths = `/training/${playersPath}`;
    console.log('paths', paths)

    const {data} = await baseService.get<PreparedTrainingType[]>(paths);
    console.log('data', data)
    return data;
  } catch (e: any) {
    return rejectWithValue(e.response?.data.error || 'Something is wrong');
  }
});
