import React, {useState} from "react";
import {
    Dimensions,
    Image,
    Keyboard,
    StyleSheet,
    TouchableWithoutFeedback
} from "react-native";
import {Box, Text, VStack} from "@gluestack-ui/themed";
import {images} from "../../../../assets";
import SafeAreaLayout from "../../../components/SafeAreaLayout";
import {useCustomTranslation} from "../../../../tools/hooks/useTranslation";
import {perfectSize} from "../../../../tools/helpers/perfectSize";
import CustomInput from "../../../components/CustomInput";
import CustomButton from "../../../components/CustomButton";
import {FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {fontSize} from "../../../../assets/fontsSize";
import * as yup from "yup";
import {Book} from "../../../navigation/book";
import {useNavigation} from "@react-navigation/native";
import {PublicStackScreenProps} from "../../../navigation/types";
import {useUser} from "../../../../bus/user";

const width = Dimensions.get('screen').width;

const resetPasswordSchema = yup.object({
    email: yup
        .string()
        .email('Please enter a valid email address')
        .required('public.registrationScreen.requiredError'),
});

interface ResetPasswordForm {
    email: string;
}

const ResetPassword = () => {
    const navigate = useNavigation();
    const {resetPassword} = useUser();
    const {t} = useCustomTranslation();
    const [isReset, setReset] = useState(false);
    const {replace} = useNavigation<PublicStackScreenProps['navigation']>();

    const methods = useForm<ResetPasswordForm>({
        resolver: yupResolver(resetPasswordSchema),
        mode: 'onSubmit',
    });

    const {
        formState: {errors},
        setError,
        handleSubmit,
    } = methods;

    const onPress = async (values: ResetPasswordForm) => {
        try {
            await resetPassword({
                email: values.email.toLocaleLowerCase(),
            });
            setReset(true);
        } catch (e: any) {
            console.log('Register error', e)
            e.email && setError('email', {message: e.email});
        }
    };

    const onBack = () => navigate.goBack();

    return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Box flex={1} bgColor="#25282D">
            <SafeAreaLayout top bottom style={styles.container}>
                <VStack space="md" flex={1}>
                    <VStack alignItems="center" space="xl">
                        <Image
                            source={images.logo}
                            resizeMode="contain"
                            style={{
                                width: width * 0.25,
                                height: width * 0.25,
                            }}
                            alt=""
                        />
                        {isReset
                            ? <VStack space="xl" paddingHorizontal={40}>
                                <Text
                                    textAlign="center"
                                    variant="secondary"
                                    fontSize={fontSize.title}>
                                    {t('public.resetPasswordScreen.note')}
                                </Text>
                                <CustomButton
                                    title={t('public.resetPasswordScreen.back')}
                                    onPress={() => replace(Book.Login)}
                                />
                            </VStack>
                            : <Text
                            textAlign="center"
                            variant="secondary"
                            fontSize={fontSize.title}>
                            {t('public.resetPasswordScreen.title')}
                            </Text>
                        }

                    </VStack>
                    {!isReset && <FormProvider {...methods}>
                        <VStack paddingHorizontal={40} mb={perfectSize(20)}>
                            <VStack space="xl">
                                <VStack space="xs">
                                    <CustomInput
                                        name="email"
                                        placeholder={t(
                                            'public.resetPasswordScreen.resetPasswordPlaceholder',
                                        )}
                                        variant="primary"
                                    />
                                </VStack>
                                <CustomButton
                                    title={t('public.resetPasswordScreen.button')}
                                    onPress={handleSubmit(onPress)}
                                />
                                <CustomButton
                                    title={t('public.resetPasswordScreen.back')}
                                    onPress={onBack}
                                />
                            </VStack>
                        </VStack>
                    </FormProvider>}
                </VStack>
            </SafeAreaLayout>
        </Box>
    </TouchableWithoutFeedback>
    )
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
    },
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-between',
    },
    keyboardAvoidingContainer: {
        flex: 1,
    },
});

export default ResetPassword;