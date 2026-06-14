import {useCallback} from 'react';
import {useDispatch, useSelector} from "../../tools/hooks";
import {useUser} from "../user";
import {getInstruction} from "./thunk/instruction";
import {instructionActions} from "./slice";
import {InstructionType} from "./types";

export const useInstruction = () => {
    const dispatch = useDispatch();
    const {tokenRefresh} = useUser();
    const fetchInstruction = useCallback(
        async () => tokenRefresh(() => dispatch(getInstruction())),
        [dispatch, tokenRefresh],
    );

    const isLoading = useSelector(({instruction}) => instruction.isLoading);
    const instructions = useSelector(({instruction}) => instruction.instructions);

    const setInstructions = useCallback((state: InstructionType[]) => {
        dispatch(instructionActions.setInstructions(state));
    }, [dispatch]);

    return {
        fetchInstruction,
        isLoading,
        instructions,
        setInstructions,
    }
}