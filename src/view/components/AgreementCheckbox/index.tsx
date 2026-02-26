import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
    HStack,
    Text,
    Checkbox,
    CheckboxIndicator,
    CheckboxIcon,
    CheckIcon,
} from '@gluestack-ui/themed';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import {fontSize} from "../../../assets/fontsSize";

interface AgreementCheckboxProps {
    value: boolean;
    onChange: (value: boolean) => void;
    onPressLink: () => void;
    error?: string;
}

const AgreementCheckbox: React.FC<AgreementCheckboxProps> = ({
                                                                 value,
                                                                 onChange,
                                                                 onPressLink,
                                                                 error,
                                                             }) => {
    const { t } = useCustomTranslation();

    return (
        <>
            <HStack space="sm" alignItems="center" mt={10}>
                <Checkbox
                    value="agreement"
                    isChecked={value}
                    onChange={onChange}
                    aria-label="Agree to terms"
                    size="md">
                    <CheckboxIndicator>
                        <CheckboxIcon as={CheckIcon} sx={{
                            color: value ? '#F7A936' : 'transparent',
                            ':checked': {
                                color: '#F7A936',
                            }
                        }}/>
                    </CheckboxIndicator>
                </Checkbox>

                <HStack flexWrap="wrap" flex={1}>
                    <Text
                        textAlign="center"
                        variant="primary"
                        fontSize={fontSize.body}>
                        {t('public.registrationScreen.agreement.text')}
                    </Text>
                    <TouchableOpacity onPress={onPressLink}>
                        <Text
                            textAlign="center"
                            variant="secondary"
                            fontSize={fontSize.body}
                            textDecorationLine="underline">
                            {t('public.registrationScreen.agreement.link')}
                        </Text>
                    </TouchableOpacity>
                </HStack>
            </HStack>

            {error && (
                <Text color="$error500" size="xs" mt={4}>
                    {error}
                </Text>
            )}
        </>
    );
};

export default AgreementCheckbox;