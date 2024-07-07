import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import baseService from '../../../init/axios/baseService';
import {InstructionType} from '../types';

const instructionAction = createAction('user/getInstruction');

export const getInstruction = createAsyncThunk<InstructionType[]>(
    instructionAction.type,
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await baseService.get<InstructionType[]>('/instructions/');
            // console.log('thunk/getInstruction ',data);

            return data;
        } catch (e: any) {
            return rejectWithValue(e.response?.data.error || 'Something is wrong');
        }
    },
);
