import {ArrowRightIcon, Box, HStack, Text, VStack} from '@gluestack-ui/themed';
import React, {FC, useState} from 'react';
import {Dimensions, StyleSheet} from 'react-native';

import SafeAreaLayout from '../../components/SafeAreaLayout';
import Teams from '../../components/Team';
import CustomButton from '../../components/CustomButton';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {optionsSchema} from './schema';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Indicator from '../../components/Indicator';
import Levels from '../../components/Levels';
import {PrivateStackScreenProps} from '../../navigation/types';
import {Book} from '../../navigation/book';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import {useUser} from '../../../bus/user';

const height = Dimensions.get('screen').height;
interface OptionsForm {
  people: number;
  level: number;
}

const Options: FC<PrivateStackScreenProps> = ({navigation}) => {
  const {setFilters} = useUser();
  const {navigate} = navigation;
  const [step, setStep] = useState(0);
  const {bottom} = useSafeAreaInsets();
  const teams = Array.from({length: 4}, (_, index) => index + 1);
  const levels = Array.from({length: 5}, (_, index) => index + 1);
  const {t} = useCustomTranslation();
  const methods = useForm<OptionsForm>({
    resolver: yupResolver(optionsSchema),
    mode: 'onSubmit',
    defaultValues: async () => {
      return {
        people: 0,
        level: 0,
      };
    },
  });
  const {handleSubmit, watch} = methods;

  const person = watch('people');
  const nextStep = () => person && setStep(prev => prev + 1);
  const onPress = (values: OptionsForm) => {
    console.log('values', values);
    setFilters(values);
    navigate(Book.TabNavigator);
  };

  return (
    <Box flex={1} bgColor="#131517">
      <SafeAreaLayout top style={styles.container}>
        <VStack bgColor="#131517" alignItems="center" space="sm" minHeight={50}>
          <Text variant="primary">
            {t(`private.optionsScreen.step${step ? 2 : 1}.title`)}
          </Text>
          <Indicator selected={step} length={2} />
        </VStack>
        <FormProvider {...methods}>
          <VStack flex={1} bgColor="#25282D" pb={bottom}>
            {!step ? (
              <HStack
                flex={1}
                mt={40}
                alignItems="center"
                justifyContent="center"
                space="xl"
                flexWrap="wrap">
                {teams.map(team => (
                  <Teams teamLength={team} key={team} name="people" />
                ))}
              </HStack>
            ) : (
              <HStack
                flex={1}
                mt={40}
                alignItems="center"
                justifyContent="center"
                space="xl"
                flexWrap="wrap">
                {levels.map(level => (
                  <Levels level={level} key={level} name="level" />
                ))}
              </HStack>
            )}
            <HStack
              justifyContent="center"
              alignItems="flex-end"
              pb={height * 0.025}>
              <CustomButton
                title={t('private.optionsScreen.button')}
                onPress={step ? handleSubmit(onPress) : nextStep}
                iconRight={ArrowRightIcon}
              />
            </HStack>
          </VStack>
        </FormProvider>
      </SafeAreaLayout>
    </Box>
  );
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

export default Options;
