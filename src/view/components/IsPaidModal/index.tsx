import {
  Box,
  Center,
  CloseIcon,
  Modal,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import React, {useEffect, useRef, useState} from 'react';
import {AppState, Dimensions, Image, Linking, StyleSheet} from 'react-native';
import {images} from '../../../assets';
import SafeAreaLayout from '../SafeAreaLayout';
import CustomButton from '../CustomButton';
import {useTraining} from '../../../bus/training';
import {useUser} from '../../../bus/user';

const width = Dimensions.get('screen').width;
const URL = 'https://squash-pride.ru';

const IsPaidModal = () => {
  const appState = useRef(AppState.currentState);
  const {fetchUser, user} = useUser();
  const [visible, setVisible] = useState(false);
  const {fetchGroup, fetchRules, fetchTechniques, resetStack} = useTraining();

  const handleClick = () => Linking.openURL(URL);

  useEffect(() => {
    user.is_paid !== null && !user.is_paid && setVisible(true);
  }, [user.is_paid]);

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
    visible && (
      <Modal isOpen={visible}>
        <Box flex={1} bgColor="#000000" width={'100%'}>
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
                onPress={() => setVisible(prev => !prev)}
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
      </Modal>
    )
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
export default IsPaidModal;
