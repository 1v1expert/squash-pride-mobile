import * as types from "./types";

export const setInstructions: types.BaseContract<types.InstructionType[]> = (
    state,
    action,
) => {
    return {
        ...state,
        instructions: action.payload,
    };
};