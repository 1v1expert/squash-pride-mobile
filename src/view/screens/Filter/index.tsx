import React, {FC} from 'react';
import ViewContainer from '../../components/ViewContainer';
import CustomButton from '../../components/CustomButton';
import {ArrowLeftIcon, HStack, Text, VStack} from '@gluestack-ui/themed';
// import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import {HomeScreensStackScreenProps} from '../../navigation/types';
import {Dimensions, TouchableOpacity} from 'react-native';
import PeopleAccordion from '../../components/PeopleAccordion';
import {FormProvider, useForm} from 'react-hook-form';
import {filterSchema} from './schema';
import {yupResolver} from '@hookform/resolvers/yup';
import LevelAccordion from '../../components/LevelAccordion';
import ShotAccordion from '../../components/ShotAccordion';
type FilterForm = {
  level?: number;
  people?: number;
  shot?: string;
};
const width = Dimensions.get('screen').width;
const Filter: FC<HomeScreensStackScreenProps> = ({navigation}) => {
  //   const {t} = useCustomTranslation();
  const {goBack} = navigation;

  const methods = useForm<FilterForm>({
    resolver: yupResolver(filterSchema),
    mode: 'onSubmit',
  });
  const {handleSubmit} = methods;
  const submit = (e: FilterForm) => {
    console.log(e);
  };
  return (
    <ViewContainer
      title="ФИЛЬТР"
      leftHeaderButton={
        <CustomButton
          iconLeft={ArrowLeftIcon}
          bgColor="#25282D"
          onPress={goBack}
          width={50}
        />
      }>
      <VStack flex={1} pt={20} paddingHorizontal={30} width={width} space="xl">
        <FormProvider {...methods}>
          <LevelAccordion name="level" />
          <PeopleAccordion name="people" />
          <ShotAccordion name="shot" />
        </FormProvider>
      </VStack>
      <HStack
        width="$full"
        bgColor="#1B1E20"
        height={75}
        alignItems="center"
        justifyContent="flex-end"
        paddingHorizontal={50}
        space="xl">
        <TouchableOpacity onPress={handleSubmit(submit)}>
          <Text color="#F7A936">Применть</Text>
        </TouchableOpacity>
      </HStack>
    </ViewContainer>
  );
};

export default Filter;
