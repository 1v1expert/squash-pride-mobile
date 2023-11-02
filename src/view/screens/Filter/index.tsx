import React, {FC} from 'react';
import ViewContainer from '../../components/ViewContainer';
import CustomButton from '../../components/CustomButton';
import {
  ArrowLeftIcon,
  HStack,
  ScrollView,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import {FilterScreenProps} from '../../navigation/types';
import {Dimensions, TouchableOpacity} from 'react-native';
import PeopleAccordion from '../../components/PeopleAccordion';
import {FormProvider, useForm} from 'react-hook-form';
import {filterSchemaWithGroup, filterSchemaWithoutGroup} from './schema';
import {yupResolver} from '@hookform/resolvers/yup';
import LevelAccordion from '../../components/LevelAccordion';
import GroupAccordion from '../../components/GroupAccordion';
import {useTraining} from '../../../bus/training';
import {Book} from '../../navigation/book';

type FilterForm = {
  players: number;
  level: 'amateur' | 'professional';
  group?: string[];
};
const width = Dimensions.get('screen').width;
const Filter: FC<FilterScreenProps> = ({navigation, route}) => {
  const {setFilters, fetchExercise} = useTraining();
  const {t} = useCustomTranslation();
  const {goBack, navigate} = navigation;
  const location = route.params?.location;

  const methods = useForm<FilterForm>({
    resolver: yupResolver(
      location === 'CreateTrainingWithoutTab'
        ? filterSchemaWithGroup
        : filterSchemaWithoutGroup,
    ),
    mode: 'onSubmit',
  });
  const {
    handleSubmit,
    formState: {errors},
  } = methods;
  const submit = (values: FilterForm) => {
    setFilters(values);
    switch (location) {
      case 'StartTraining': {
        navigate(Book.StartTraining);
        break;
      }
      case 'CreateTrainingWithoutTab': {
        fetchExercise({
          players: values.players,
          level: values.level,
          group: values.group,
        });
        navigate(Book.CreateTrainingWithoutTab);
        break;
      }
      default: {
        goBack();
      }
    }
  };
  return (
    <ViewContainer
      title={t('private.filter.title')}
      leftHeaderButton={
        <CustomButton
          iconLeft={ArrowLeftIcon}
          bgColor="#25282D"
          onPress={goBack}
          width={50}
        />
      }>
      <ScrollView>
        <VStack
          flex={1}
          pt={20}
          paddingHorizontal={30}
          width={width}
          space="xl">
          <FormProvider {...methods}>
            <LevelAccordion name="level" error={errors.level} />
            <PeopleAccordion name="players" error={errors.players} />
            {location === 'CreateTrainingWithoutTab' && (
              <GroupAccordion
                name="group"
                error={errors.group}
                groupLength={1}
              />
            )}
          </FormProvider>
        </VStack>
      </ScrollView>

      <HStack
        width="$full"
        bgColor="#1B1E20"
        height={75}
        alignItems="center"
        justifyContent="flex-end"
        paddingHorizontal={50}
        space="xl">
        <TouchableOpacity onPress={handleSubmit(submit)}>
          <Text variant="secondary">{t('private.filter.saveButton')}</Text>
        </TouchableOpacity>
      </HStack>
    </ViewContainer>
  );
};

export default Filter;
