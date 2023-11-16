import {
  Box,
  HStack,
  Modal,
  ModalContent,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import React from 'react';
import CustomInput from '../CustomInput';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {itemEditSchema} from './schema';
import {fontSize} from '../../../assets/fontsSize';
import CustomButton from '../CustomButton';

type ItemEditForm = {
  title: string;
  description: string;
};
type TrainingItemEditModalProps = {
  visible: boolean;
  setVisible: (e: boolean) => void;
};

const TrainingItemEditModal = ({
  visible,
  setVisible,
}: TrainingItemEditModalProps) => {
  const methods = useForm<ItemEditForm>({
    resolver: yupResolver(itemEditSchema),
    mode: 'onSubmit',
    defaultValues: async () => {
      return {
        title: '',
        description: '',
      };
    },
  });
  const {
    formState: {errors},
    handleSubmit,
  } = methods;

  return (
    <Modal isOpen={visible} alignItems="center">
      <ModalContent width="90%" borderRadius={10}>
        <Box bgColor="#131517">
          <VStack paddingVertical={20}>
            <HStack alignItems="center" justifyContent="center" mb={20}>
              <Text
                variant="primary"
                textAlign="center"
                fontSize={fontSize.title}>
                РЕДАКТИРОВАТЬ
              </Text>
            </HStack>
            <VStack paddingHorizontal={40}>
              <FormProvider {...methods}>
                <VStack space="xs">
                  <Text variant="secondary" fontSize={fontSize.body}>
                    Название тренировки
                  </Text>
                  <CustomInput
                    name="title"
                    placeholder={''}
                    error={errors.title}
                    variant="textEdit"
                  />
                </VStack>
                <VStack space="xs">
                  <Text variant="secondary" fontSize={fontSize.body}>
                    Описание тренировки
                  </Text>
                  <CustomInput
                    name="description"
                    placeholder={''}
                    error={errors.title}
                    variant="textEdit"
                    multiline
                  />
                </VStack>
                <HStack width="100%" justifyContent="center">
                  <CustomButton
                    title="Сохранить"
                    onPress={() => setVisible(false)}
                  />
                </HStack>
              </FormProvider>
            </VStack>
          </VStack>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default TrainingItemEditModal;
