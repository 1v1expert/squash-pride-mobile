import React, {FC} from 'react';
import ViewContainer from '../../components/ViewContainer';
import CustomButton from '../../components/CustomButton';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  HStack,
  ScrollView,
  VStack,
} from '@gluestack-ui/themed';
import TypeOfTraining from '../../components/TypeOfTraining';
import {Dimensions} from 'react-native';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import {HomeScreensStackScreenProps} from '../../navigation/types';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {chooseTrainingTypeSchema} from './schema';
import {useTraining} from '../../../bus/training';
import {Book} from '../../navigation/book';

const width = Dimensions.get('screen').width;

type ChooseTrainingTypeForm = {
  group: string[];
};

const ChooseTrainingType: FC<HomeScreensStackScreenProps> = ({
  navigation,
  route,
}) => {
  const {navigate, goBack} = navigation;
  const {t} = useCustomTranslation();
  const {groups, fetchExercise, filters} = useTraining();
  const location = route.params?.location;
  const groupLength = location === 'CreateTraining' ? 1 : 4;

  const methods = useForm<ChooseTrainingTypeForm>({
    resolver: yupResolver(chooseTrainingTypeSchema),
    mode: 'onSubmit',
  });
  const {handleSubmit, watch} = methods;
  const group = watch('group');

  const onPress = (values: ChooseTrainingTypeForm) => {
    console.log('values', values);
    switch (location) {
      case Book.StartTraining: {
        navigate(location);
        break;
      }
      case Book.CreateTraining: {
        fetchExercise({
          players: filters.players,
          level: filters.level,
          group: values.group,
        });
        navigate(location);
      }
    }
  };
  return (
    <ViewContainer
      title={t('private.createTraining.title')}
      leftHeaderButton={
        <CustomButton
          iconLeft={ArrowLeftIcon}
          bgColor="#25282D"
          onPress={goBack}
          width={50}
        />
      }
      rightHeaderButton={
        <CustomButton
          iconLeft={ArrowRightIcon}
          bgColor="#25282D"
          onPress={handleSubmit(onPress)}
          width={50}
          disabled={!group || groupLength !== group.length}
        />
      }>
      <VStack flex={1} width={width} alignItems="center">
        <FormProvider {...methods}>
          <ScrollView paddingHorizontal={20}>
            <HStack
              paddingVertical={10}
              flexWrap="wrap"
              justifyContent="space-between"
              space="md">
              {groups?.map(({name}, i) => (
                <TypeOfTraining
                  type={name}
                  key={i}
                  name="group"
                  groupLength={groupLength}
                />
              ))}
            </HStack>
          </ScrollView>
        </FormProvider>
      </VStack>
    </ViewContainer>
  );
};

export default ChooseTrainingType;
