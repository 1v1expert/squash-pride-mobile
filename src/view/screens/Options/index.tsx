import {
  ArrowLeftIcon,
  ArrowRightIcon,
  HStack,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import React, {FC, useState} from 'react';

import Teams from '../../components/Team';
import CustomButton from '../../components/CustomButton';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {optionsSchema} from './schema';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Indicator from '../../components/Indicator';
import Levels from '../../components/Levels';
import {OptionsScreenProps} from '../../navigation/types';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import {useTraining} from '../../../bus/training';
import ViewContainer from '../../components/ViewContainer';
import {Dimensions} from 'react-native';
import {Book} from '../../navigation/book';

const height = Dimensions.get('screen').height;

interface OptionsForm {
  players: number;
  level: 'amateur' | 'professional';
}

const Options: FC<OptionsScreenProps> = ({navigation, route}) => {
  const {setFilters} = useTraining();
  const {navigate, goBack} = navigation;
  const [step, setStep] = useState(0);
  const {t} = useCustomTranslation();
  const {bottom} = useSafeAreaInsets();
  const teams = Array.from({length: 4}, (_, index) => index + 1);
  const levels = [
    {label: t('private.optionsScreen.step2.amateur'), value: 'amateur'},
    {
      label: t('private.optionsScreen.step2.professional'),
      value: 'professional',
    },
  ];
  const location = route.params?.location;
  const methods = useForm<OptionsForm>({
    resolver: yupResolver(optionsSchema),
    mode: 'onSubmit',
  });
  const {handleSubmit, watch} = methods;

  const person = watch('players');
  const nextStep = () => person && setStep(prev => prev + 1);
  const onPress = (values: OptionsForm) => {
    console.log('values', values);
    setFilters(values);
    location ? navigate(Book.ChooseTrainingType, {location}) : goBack();
  };
  const back = () => (step ? setStep(0) : goBack());

  return (
    <ViewContainer
      header={
        <VStack alignItems="center" space="sm" minHeight={50}>
          <Text variant="primary">
            {t(`private.optionsScreen.step${step ? 2 : 1}.title`)}
          </Text>
          <Indicator selected={step} length={2} />
        </VStack>
      }
      leftHeaderButton={
        <CustomButton
          iconLeft={ArrowLeftIcon}
          bgColor="#25282D"
          onPress={back}
          width={50}
        />
      }>
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
                <Teams teamLength={team} key={team} name="players" />
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
              {levels.map((level, i) => (
                <Levels params={level} key={i} name="level" />
              ))}
            </HStack>
          )}
          <HStack
            justifyContent="center"
            alignItems="flex-end"
            pb={height * 0.02}>
            <CustomButton
              title={t('private.optionsScreen.button')}
              onPress={step ? handleSubmit(onPress) : nextStep}
              iconRight={ArrowRightIcon}
            />
          </HStack>
        </VStack>
      </FormProvider>
    </ViewContainer>
  );
};

export default Options;
