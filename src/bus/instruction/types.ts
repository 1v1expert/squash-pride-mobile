import {CaseReducer, PayloadAction} from "@reduxjs/toolkit";

export type InstructionState = {
    isLoading: boolean;
    instructions: InstructionType[];
}

export type InstructionType = {
    uid: string;
    video: string;
    description: string;
    title: string;
    ru_description: string;
};

export type BaseContract<T = any> = CaseReducer<
    InstructionState,
    PayloadAction<T>
    >;