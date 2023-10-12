import React, {FC} from 'react';
import ViewContainer from '../../components/ViewContainer';
import CustomButton from '../../components/CustomButton';
import {ArrowLeftIcon} from '@gluestack-ui/themed';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import {HomeScreensStackScreenProps, TItem} from '../../navigation/types';
import {Book} from '../../navigation/book';
import {Dimensions, FlatList} from 'react-native';
import Item from '../../components/Item';

const width = Dimensions.get('screen').width;

const DATA: TItem[] = [
  {
    id: '1',
    title: 'Правила подачи',
    description:
      'Прямой удар в переднюю стену корта, при котором мяч по прямой направляется бьющим игроком паралельно одной из боковых стен корта в его заднюю часть. Драйв может наноситься с любой части корта (передней, центральной задней). Это основной удар в игре.',
    url: 'test',
  },
  {
    id: '2',
    title: 'Правила 2',
    description:
      'Прямой удар в переднюю стену корта, при котором мяч по прямой направляется бьющим игроком паралельно одной из боковых стен корта в его заднюю часть. Драйв может наноситься с любой части корта (передней, центральной задней). Это основной удар в игре.',
    url: 'test',
  },
  {
    id: '3',
    title: 'Правила 3',
    description:
      'Прямой удар в переднюю стену корта, при котором мяч по прямой направляется бьющим игроком паралельно одной из боковых стен корта в его заднюю часть. Драйв может наноситься с любой части корта (передней, центральной задней). Это основной удар в игре.',
    url: 'test',
  },
];

const Rules: FC<HomeScreensStackScreenProps> = ({navigation}) => {
  const {t} = useCustomTranslation();
  const {navigate, goBack} = navigation;

  const goToItem = (e: TItem) => {
    navigate(Book.MediaViewer, {...e});
  };

  return (
    <ViewContainer
      title={t('private.gameTechnique.title')}
      leftHeaderButton={
        <CustomButton
          iconLeft={ArrowLeftIcon}
          bgColor="#25282D"
          onPress={goBack}
          width={50}
        />
      }>
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item item={item} onPress={goToItem} />}
        style={{width, paddingTop: 20, paddingHorizontal: 20}}
      />
    </ViewContainer>
  );
};

export default Rules;
