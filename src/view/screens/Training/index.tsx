import {VStack} from '@gluestack-ui/themed';
import React from 'react';
import ViewContainer from '../../components/ViewContainer';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';

const Training = () => {
  const {t} = useCustomTranslation();

  return (
    <ViewContainer title={t('private.trainingScreen.title')}>
      <VStack flex={1} width="$full" />
    </ViewContainer>
  );
};

export default Training;
