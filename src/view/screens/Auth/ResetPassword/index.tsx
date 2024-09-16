import React from "react";
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
    const {t} = useCustomTranslation();
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
            // await register({
            //     password: values.password,
            //     email: values.email.toLocaleLowerCase(),
            //     first_name: values.firstName,
            //     birth_year: new Date().getFullYear() - values.age,
            //     gender: values.gender,
            //     country: values.country,
            // });
            replace(Book.Login);
        } catch (e: any) {
            console.log('Register error', e)
            e.email && setError('email', {message: e.email});
        }
    };

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
                        <Text
                            textAlign="center"
                            variant="secondary"
                            fontSize={fontSize.title}>
                            {t('public.resetPasswordScreen.title')}
                        </Text>
                    </VStack>
                    <FormProvider {...methods}>
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
                                    onPress={onPress}
                                />
                            </VStack>
                        </VStack>
                    </FormProvider>
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