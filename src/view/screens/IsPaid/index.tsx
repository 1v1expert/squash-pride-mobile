import {Box, Center, CloseIcon, Text, VStack} from '@gluestack-ui/themed';
import React, {useEffect, useRef} from 'react';
import {AppState, Dimensions, Image, Linking, StyleSheet} from 'react-native';
import {images} from '../../../assets';
import SafeAreaLayout from '../../components/SafeAreaLayout';
import CustomButton from '../../components/CustomButton';
import {useTraining} from '../../../bus/training';
import {useUser} from '../../../bus/user';
import {Book} from '../../navigation/book';

const width = Dimensions.get('screen').width;
// const URL = 'https://pay-squash-pride.lava-bots.ru/ru';
const URL = 'https://pay-squash-pride.lava-bots.ru/en';

const IsPaid = ({navigation}: any) => {
  const {replace} = navigation;
  const appState = useRef(AppState.currentState);
  const {fetchUser} = useUser();
  const {fetchGroup, fetchRules, fetchTechniques, resetStack} = useTraining();

  const handleClick = () => Linking.openURL(URL);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        const init = () => {
          fetchUser().then(() => {
            fetchGroup();
            fetchRules();
            fetchTechniques();
          });
          resetStack();
        };
        init();
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <Box flex={1} bgColor="#000000">
      <SafeAreaLayout top bottom style={styles.container}>
        <VStack
          flex={1}
          justifyContent="space-around"
          alignItems="center"
          width="$full"
          space="4xl">
          <CustomButton
            iconLeft={CloseIcon}
            bgColor="#25282D"
            onPress={() => replace(Book.TabNavigator)}
            width={50}
            style={styles.close}
          />
          <VStack alignItems="center" space="4xl">
            <Image
              source={images.crown}
              resizeMode="contain"
              style={{
                width: width * 0.3,
                height: width * 0.3,
              }}
            />
            <VStack width="$full" alignItems="center" space="4xl">
              <Center>
                <Text variant="primary">РАЗБЛОКИРОВАТЬ ТРЕНИРОВКИ!</Text>
                <Box bgColor="#F7A936" height={2} width={width * 0.6} />
              </Center>
              <VStack>
                <Text variant="primary" textAlign="center">
                  {
                    'Тренируйтесь\nна новом уровне!\n\n\nПолучите доступ ко всем\nфункциям приложения\nоформив подписку.'
                  }
                </Text>
              </VStack>
            </VStack>
          </VStack>
          <CustomButton
            title="ОФОРМИТЬ ПОДПИСКУ"
            bgColor="grey"
            onPress={handleClick}
          />
        </VStack>
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
  close: {position: 'absolute', left: 30, top: 0},
});
export default IsPaid;
