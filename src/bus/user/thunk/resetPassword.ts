import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import baseService from '../../../init/axios/baseService';
import {FeedbackData, LoginForm, PayloadResetPasswordData, ResetPassword, Tokens} from '../types';

const resetPasswordAction = createAction('user/resetPassword');

export const resetPasswordData = createAsyncThunk<ResetPassword, ResetPassword>(
    resetPasswordAction.type,
    async ({email}, {rejectWithValue}) => {
        try {
            const {data} = await baseService.post<ResetPassword>('/password_reset/', {email});
            return data;
        } catch (e: any) {
            return rejectWithValue(e.response?.data.error || 'Something is wrong 123123123');
        }
    },
);
