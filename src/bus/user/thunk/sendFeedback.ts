import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import baseService from '../../../init/axios/baseService';
import {FeedbackData, PayloadFeedbackData} from '../types';

const sendFeedback = createAction('user/sendFeedback');

export const sendFeedbackData = createAsyncThunk<FeedbackData, PayloadFeedbackData>(
    sendFeedback.type,
    async (feedback, {rejectWithValue}) => {
        try {
            const {data} = await baseService.post<FeedbackData>('/feedback/', {
                ...feedback,
            });
            return data;
        } catch (e: any) {
            return rejectWithValue(e.response?.data || 'Something is wrong');
        }
    },
);
