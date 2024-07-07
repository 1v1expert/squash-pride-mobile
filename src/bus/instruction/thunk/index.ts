import {ActionReducerMapBuilder, isAnyOf} from "@reduxjs/toolkit";
import {getInstruction} from "./instruction";
import {InstructionState} from "../types";
import {getGroupData} from "../../training/thunk/group";
import {getExercise} from "../../training/thunk/exercise";
import {getRules} from "../../training/thunk/rules";
import {getTechniques} from "../../training/thunk/techniques";

export const extraReducers = (builder: ActionReducerMapBuilder<InstructionState>,) => {
    builder.addMatcher(isAnyOf(getInstruction.fulfilled), (state, action) => {
        state.instructions = action.payload;
        console.log('extraReducers ', action.payload);
    });
    builder.addMatcher(
        isAnyOf(getInstruction.pending),
        state => {
            state.isLoading = true;
        },

    );
    builder.addMatcher(
        isAnyOf(
            getInstruction.fulfilled,
            getInstruction.rejected,
        ),
        state => {
            state.isLoading = false;
        },
    );
};