import {Modal, VStack} from '@gluestack-ui/themed';
import React from 'react';
import FilterForm from '../../forms/FilterForm';
import ViewContainer from '../ViewContainer';
import {Dimensions} from 'react-native';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import {FilterFormType} from '../../../bus/training/types';

type FilterModalProps = {
  visible: boolean;
  setVisible: (e: boolean) => void;
  onPress: (e: FilterFormType) => void;
  required?: boolean;
};
const width = Dimensions.get('screen').width;

const FilterModal = ({
  visible,
  setVisible,
  onPress,
  required,
}: FilterModalProps) => {
  const {t} = useCustomTranslation();

  return (
    <Modal isOpen={visible} bgColor="red">
      <ViewContainer title={t('private.filter.title')}>
        <VStack flex={1} width={width}>
          <FilterForm
            onPress={e => [onPress(e), setVisible(false)]}
            required={required}
            withValue
          />
        </VStack>
      </ViewContainer>
    </Modal>
  );
};

export default FilterModal;
