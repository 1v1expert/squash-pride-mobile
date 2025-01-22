import React, {FC, useEffect} from 'react';
import ViewContainer from '../../components/ViewContainer';
import CustomButton from '../../components/CustomButton';
import {
  ArrowLeftIcon,
  CheckIcon,
  HStack,
  ScrollView,
  Spinner,
  VStack,
} from '@gluestack-ui/themed';
import TypeOfTraining from '../../components/TypeOfTraining';
import {Dimensions} from 'react-native';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import {ChooseTrainingTypeScreenProps} from '../../navigation/types';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {chooseTrainingTypeSchema} from './schema';
import {useTraining} from '../../../bus/training';
import {Book} from '../../navigation/book';

const width = Dimensions.get('screen').width;

type ChooseTrainingTypeForm = {
  group: string[];
};
const Loader = () => <Spinner color="#F7AA37" />;
const ChooseTrainingType: FC<ChooseTrainingTypeScreenProps> = ({
  navigation,
  route,
}) => {
  const {navigate, goBack} = navigation;
  const {t} = useCustomTranslation();
  const {
    groups,
    fetchExercise,
    fetchPreparedTrainings,
    filters,
    addToStack,
    resetStack,
    setExercises,
    setPreparedTrainings,
    setFilters,
    isLoading,
  } = useTraining();
  const location = route.params?.location;
  const from = route.params?.from;
  const groupLength = 4;

  const methods = useForm<ChooseTrainingTypeForm>({
    resolver: yupResolver(chooseTrainingTypeSchema),
    mode: 'onSubmit',
    defaultValues: {
      group: [],
    },
  });
  const {handleSubmit, watch, getValues, reset} = methods;
  const group = watch('group');

  const onPress = async (values: ChooseTrainingTypeForm) => {
    setFilters(values);
    // resetStack();
    reset();

    switch (location) {
      case Book.PreparedTrainings: {
        const res = await fetchPreparedTrainings(
            {
              players: filters.players,
              group: filters.group,
            }
        );
        setPreparedTrainings(res);
        navigate(Book.PreparedTrainings);
        break;
      }
      case Book.StartTraining: {
        const training = values.group.map(async e => {
          const res = await fetchExercise({
            players: filters.players,
            level: filters.level,
            group: [e],
            readyTraining: true,
          });
          addToStack({...res[0], group: e || ''});
        });
        Promise.allSettled(training).then(() => {
          navigate(Book.StartTraining, {
            from,
          });
        });
        break;
      }
      case Book.CreateTrainingWithoutTab: {
        const uniq = [...new Set(values.group)];
        const training = uniq.map(async e => {
          const res = await fetchExercise({
            players: filters.players,
            level: filters.level,
            group: [e],
          });
          return res;
        });
        Promise.all(training).then(res => {
          const uniqTrainings = [
            ...new Set(res.flat().map(e => JSON.stringify(e))),
          ].map(e => JSON.parse(e));
          setExercises(uniqTrainings);
          navigate(Book.CreateTrainingWithoutTab, {
            from,
            readyTraining: false,
          });
        });
        break;
      }
    }
  };

  useEffect(() => {
    if (group.length > 0) {
      onPress(getValues());
    }
  },[group]);

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
                  isOneGroup={true}
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
