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
  name?: string;
};
type TrainingItemTitleEditModalProps = {
  item: FavoriteType;
  visible: boolean;
  setVisible: (e: boolean) => void;
  fromTraining?: boolean;
};

const TrainingItemTitleEditModal = ({
  item,
  visible,
  setVisible,
  fromTraining,
}: TrainingItemTitleEditModalProps) => {
  const {editFavoriteItem, editDoneTraining} = useTraining();
  const {i18n, t} = useCustomTranslation();

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
    const name = item.name || '';

    setValue('name', name);
  }, [item, setValue, i18n]);

  const onPress = (value: ItemEditForm) => {
    if (item) {
      const edited: FavoriteType = {
        ...item,
        name: value.name,
      };

      console.log('fromTraining', fromTraining);
      !fromTraining ? editFavoriteItem(edited) : editDoneTraining(edited);
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
                {t('private.trainingModals.edit')}
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
                    {t('private.trainingModals.title')}
                  </Text>
                  <CustomInput
                    name="name"
                    placeholder={''}
                    error={errors.name}
                    variant="textEdit"
                    // multiline
                  />
                </VStack>
                <HStack width="100%" justifyContent="center">
                  <CustomButton
                    title={t('private.trainingModals.save')}
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

export default TrainingItemTitleEditModal;
