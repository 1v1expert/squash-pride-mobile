import {
  ArrowLeftIcon,
  Center,
  HStack,
  // HStack,
  SettingsIcon,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import React, {useState} from 'react';
import ViewContainer from '../../components/ViewContainer';
import CustomButton from '../../components/CustomButton';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {fontSize} from '../../../assets/fontsSize';
// import PeopleCounter from '../../components/PeopleCounter';
// import Stars from '../../components/Stars';
// import {useTraining} from '../../../bus/training';

const Training = () => {
  // const {filters} = useTraining();
  const {t} = useCustomTranslation();
  const [state, setState] = useState(false);

  return (
    <ViewContainer
      title={t('private.trainingScreen.title')}
      leftHeaderButton={
        <CustomButton
          iconLeft={ArrowLeftIcon}
          bgColor="#25282D"
          onPress={() => {}}
          width={50}
        />
      }
      rightHeaderButton={
        <CustomButton
          iconLeft={SettingsIcon}
          bgColor="#25282D"
          onPress={() => {}}
          width={50}
        />
      }>
      <VStack flex={1}>
        <HStack width="$full" bgColor="#131517">
          <TouchableOpacity
            style={styles.touchableOpacity}
            onPress={() => setState(false)}>
            <Center p={5} style={!state && styles.selected}>
              <Text variant="primary" fontSize={fontSize.title}>
                тренировки
              </Text>
            </Center>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchableOpacity}
            onPress={() => setState(true)}>
            <Center p={5} style={state && styles.selected}>
              <Text variant="primary" fontSize={fontSize.title}>
                упражнения
              </Text>
            </Center>
          </TouchableOpacity>
        </HStack>
      </VStack>
      {/* <HStack
        width="$full"
        bgColor="#1B1E20"
        height={75}
        alignItems="center"
        paddingHorizontal={30}
        space="xl">
        <PeopleCounter amountOfPeople={filters.players} />
        <Stars level={filters.level} />
      </HStack> */}
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  selected: {
    borderBottomWidth: 2,
    borderBottomColor: '#F7AB39',
  },
  touchableOpacity: {
    width: '50%',
  },
});
export default Training;
