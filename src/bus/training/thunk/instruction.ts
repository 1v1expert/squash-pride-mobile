import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import baseService from '../../../init/axios/baseService';
import {InstructionType} from '../types';

const instructionAction = createAction('user/getInstructionData');

export const getInstructionData = createAsyncThunk<InstructionType[]>(
    instructionAction.type,
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await baseService.get<InstructionType[]>('/instructions/');

            return data;
        } catch (e: any) {
            console.log('test group');
            return rejectWithValue(e.response?.data.error || 'Something is wrong');
        }
    },
);
