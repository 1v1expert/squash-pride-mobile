import * as types from "./types";
import {createSlice} from "@reduxjs/toolkit";

import * as reducers from "./reducers";
import {extraReducers} from "./thunk";

const initialState: types.InstructionState = {
    isLoading: false,
    instructions: [],
};

export const instructionSlice = createSlice({
    name: 'instruction',
    initialState,
    reducers,
    extraReducers,
});

export const instructionActions = instructionSlice.actions;
export default instructionSlice.reducer;