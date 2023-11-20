import {
  Box,
  CloseIcon,
  HStack,
  Icon,
  Modal,
  ModalContent,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import React, {useEffect} from 'react';
import CustomInput from '../CustomInput';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {itemEditSchema} from './schema';
import {fontSize} from '../../../assets/fontsSize';
import CustomButton from '../CustomButton';
import {FavoriteType} from '../../../bus/training/types';
import {useTraining} from '../../../bus/training';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import {TouchableOpacity} from 'react-native';

type ItemEditForm = {
  title?: string;
  description?: string;
};
type TrainingItemEditModalProps = {
  item: FavoriteType;
  visible: boolean;
  setVisible: (e: boolean) => void;
};

const TrainingItemEditModal = ({
  item,
  visible,
  setVisible,
}: TrainingItemEditModalProps) => {
  const {editFavoriteItem} = useTraining();
  const {i18n} = useCustomTranslation();

  const methods = useForm<ItemEditForm>({
    resolver: yupResolver(itemEditSchema),
    mode: 'onSubmit',
  });
  const {
    formState: {errors},
    handleSubmit,
    setValue,
  } = methods;

  useEffect(() => {
    const title =
      item.type === 'exercise' && item.exercise ? item.exercise.title : '';
    const description =
      item.type === 'exercise' && item.exercise
        ? i18n.language === 'ru'
          ? item.exercise.ru_description
          : item.exercise.description
        : '';

    setValue('title', title);
    setValue('description', description);
  }, [item, setValue, i18n]);

  const onPress = (value: ItemEditForm) => {
    if (item && item.exercise) {
      const edited: FavoriteType = {
        ...item,
        exercise: {
          ...item.exercise,
          title: value.title || item.exercise.title,
          ru_description:
            i18n.language === 'ru' && value.description
              ? value.description
              : item.exercise.ru_description,
          description:
            i18n.language === 'en' && value.description
              ? value.description
              : item.exercise.description,
        },
      };
      editFavoriteItem(edited);
    }
    setVisible(false);
  };
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

              <TouchableOpacity
                onPress={() => [setVisible(false)]}
                style={{position: 'absolute', right: 20}}
                hitSlop={20}>
                <Icon as={CloseIcon} size="xl" color="#F7AB39" />
              </TouchableOpacity>
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
                    multiline
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
                    onPress={handleSubmit(onPress)}
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
