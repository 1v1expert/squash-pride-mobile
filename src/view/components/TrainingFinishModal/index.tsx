import {Box, Modal, ModalContent, Text, VStack} from '@gluestack-ui/themed';
import React from 'react';

import CustomButton from '../CustomButton';
import {Image} from '@gluestack-ui/themed';
import {images} from '../../../assets';
import {Dimensions} from 'react-native';
import {perfectSize} from '../../../tools/helpers/perfectSize';

const width = Dimensions.get('screen').width;

type TrainingFinishModalProps = {
  visible: boolean;
  setVisible: (e: boolean) => void;
};

const TrainingFinishModal = ({
  visible,
  setVisible,
}: TrainingFinishModalProps) => {
  return (
    <Modal isOpen={visible} alignItems="center">
      <ModalContent>
        <VStack
          alignItems="center"
          space="4xl"
          bgColor="#131517"
          paddingVertical={30}>
          <Image
            source={images.goldBrilliant}
            resizeMode="contain"
            style={{
              width: width * 0.3,
              height: width * 0.3,
            }}
            alt=""
          />
          <VStack width="$full" alignItems="center" space="4xl">
            <VStack space="xs" alignItems="center">
              <Text variant="primary">ВЫ ПРОШЛИ ТРЕНИРОВКУ</Text>
              <Box bgColor="#F7A936" height={2} width={width * 0.6} />
            </VStack>
            <VStack>
              <Text variant="primary" textAlign="center">
                {`Нажмите   `}
                <Image
                  source={images.unselectedHeart}
                  alt=""
                  width={perfectSize(20)}
                  height={perfectSize(20)}
                  resizeMode="contain"
                />
                {`    чтобы добавить тренировку в избранное`}
              </Text>
            </VStack>
          </VStack>
          <CustomButton
            title="Завершить"
            outline
            onPress={() => setVisible(false)}
          />
        </VStack>
      </ModalContent>
    </Modal>
  );
};

export default TrainingFinishModal;
