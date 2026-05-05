import {HStack, ScrollView, Text, VStack} from '@gluestack-ui/themed';
import React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
// import LevelAccordion from '../../components/LevelAccordion';
import PeopleAccordion from '../../components/PeopleAccordion';
import GroupAccordion from '../../components/GroupAccordion';
import {yupResolver} from '@hookform/resolvers/yup';
import {Platform, TouchableOpacity, useWindowDimensions} from 'react-native';
import {filterSchema, filterSchemaWithGroup} from './schema';
import {fontSize} from '../../../assets/fontsSize';
import {perfectSize} from '../../../tools/helpers/perfectSize';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import {FilterFormType} from '../../../bus/training/types';
// import {useTraining} from '../../../bus/training';

type FilterFormProps = {
  required?: boolean;
  withValue?: boolean;
  withGroup?: boolean;
  onPress: (e: FilterFormType) => void;
};

const FilterForm = ({
  onPress,
  required,
  withValue,
  withGroup,
}: FilterFormProps) => {
  const {t} = useCustomTranslation();
  const {width} = useWindowDimensions();
  const isWeb = Platform.OS === 'web';
  const contentHorizontalPadding = isWeb
    ? Math.max(16, Math.min(30, width * 0.04))
    : 30;
  const footerHorizontalPadding = isWeb
    ? Math.max(16, Math.min(50, width * 0.08))
    : 50;
  // const {filters} = useTraining();

  const methods = useForm<FilterFormType>({
    resolver: yupResolver(required ? filterSchemaWithGroup : filterSchema),
    mode: 'onSubmit',
    defaultValues: async () => {
      return {
        players: undefined,
        level: undefined,
        group: undefined,
      };
    },
  });

  const onPressWithReset = (e: FilterFormType) => {
    onPress(e);
    reset({players: undefined, group: [], level: undefined});
  };

  const {
    handleSubmit,
    formState: {errors},
    reset,
  } = methods;
  return (
    <VStack flex={1}>
      <ScrollView>
        <VStack
          flex={1}
          pt={20}
          alignSelf="center"
          width="100%"
          paddingHorizontal={contentHorizontalPadding}
          space="xl">
          <FormProvider {...methods}>
            {/*<LevelAccordion name="level" error={errors.level} />*/}
            <PeopleAccordion name="players" error={errors.players} />
            {withGroup && (
              <GroupAccordion
                name="group"
                error={errors.group}
                groupLength={4}
              />
            )}
          </FormProvider>
        </VStack>
      </ScrollView>
      <HStack
        width="100%"
        bgColor="#1B1E20"
        height={perfectSize(75)}
        alignItems="center"
        justifyContent="space-between"
        paddingHorizontal={footerHorizontalPadding}
        space="xl">
        <TouchableOpacity
          onPress={() =>
            reset({players: undefined, group: [], level: undefined})
          }>
          <Text variant="secondary" fontSize={fontSize.text}>
            {t('private.filter.reset')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSubmit(onPressWithReset)}>
          <Text variant="secondary" fontSize={fontSize.text}>
            {t('private.filter.saveButton')}
          </Text>
        </TouchableOpacity>
      </HStack>
    </VStack>
  );
};

export default FilterForm;
