import {load, save} from '../../utils/storage';

export const saveTooltipStatus = async (tooltip: string, isShow: boolean) => {
    await save(tooltip, isShow);
};
export const getTooltipStatus = async (tooltip: string) => {
    return await load(tooltip);
};