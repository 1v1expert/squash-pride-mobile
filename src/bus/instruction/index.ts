import {useDispatch, useSelector} from "../../tools/hooks";
import {useUser} from "../user";
import {getInstruction} from "./thunk/instruction";
import {instructionActions} from "./slice";
import {InstructionType} from "./types";

export const useInstruction = () => {
    console.log('useInstruction');
    const dispatch = useDispatch();
    const {tokenRefresh} = useUser();
    const fetchInstruction = async () => tokenRefresh(() => dispatch(getInstruction()));

    const isLoading = useSelector(({instruction}) => instruction.isLoading);
    const instructions = useSelector(({instruction}) => instruction.instructions);

    const setInstructions = (state: InstructionType[]) => {
        dispatch(instructionActions.setInstructions(state));
    };

    return {
        fetchInstruction,
        isLoading,
        instructions,
        setInstructions,
    }
}