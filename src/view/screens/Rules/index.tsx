import React, {FC} from 'react';
import ViewContainer from '../../components/ViewContainer';
import CustomButton from '../../components/CustomButton';
import {ArrowLeftIcon, VStack} from '@gluestack-ui/themed';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import {HomeScreensStackScreenProps} from '../../navigation/types';

const Rules: FC<HomeScreensStackScreenProps> = ({navigation}) => {
  const {t} = useCustomTranslation();
  const {goBack} = navigation;

  return (
    <ViewContainer
      title={t('private.rules.title')}
      leftHeaderButton={
        <CustomButton
          iconLeft={ArrowLeftIcon}
          bgColor="#25282D"
          onPress={goBack}
          width={50}
        />
      }>
      <VStack flex={1} />
    </ViewContainer>
  );
};

export default Rules;
