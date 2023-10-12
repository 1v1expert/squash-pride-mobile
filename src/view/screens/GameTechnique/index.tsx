import React, {FC} from 'react';
import ViewContainer from '../../components/ViewContainer';
import CustomButton from '../../components/CustomButton';
import {ArrowLeftIcon} from '@gluestack-ui/themed';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import {HomeScreensStackScreenProps, TItem} from '../../navigation/types';
import {Dimensions, FlatList} from 'react-native';
import Item from '../../components/Item';
import {Book} from '../../navigation/book';

const width = Dimensions.get('screen').width;

const DATA: TItem[] = [
  {
    id: '1',
    title: 'Боуст- драйв',
    description:
      'Прямой удар в переднюю стену корта, при котором мяч по прямой направляется бьющим игроком паралельно одной из боковых стен корта в его заднюю часть. Драйв может наноситься с любой части корта (передней, центральной задней). Это основной удар в игре.',
    url: 'test',
    favorite: false,
    completed: false,
  },
  {
    id: '2',
    title: 'Боуст- драйв',
    description:
      'Прямой удар в переднюю стену корта, при котором мяч по прямой направляется бьющим игроком паралельно одной из боковых стен корта в его заднюю часть. Драйв может наноситься с любой части корта (передней, центральной задней). Это основной удар в игре.',
    url: 'test',
    favorite: false,
    completed: false,
  },
  {
    id: '3',
    title: 'Боуст- драйв',
    description:
      'Прямой удар в переднюю стену корта, при котором мяч по прямой направляется бьющим игроком паралельно одной из боковых стен корта в его заднюю часть. Драйв может наноситься с любой части корта (передней, центральной задней). Это основной удар в игре.',
    url: 'test',
    favorite: false,
    completed: false,
  },
  {
    id: '4',
    title: 'Боуст- драйв',
    description:
      'Прямой удар в переднюю стену корта, при котором мяч по прямой направляется бьющим игроком паралельно одной из боковых стен корта в его заднюю часть. Драйв может наноситься с любой части корта (передней, центральной задней). Это основной удар в игре.',
    url: 'test',
    favorite: false,
    completed: false,
  },
  {
    id: '5',
    title: 'Боуст- драйв',
    description:
      'Прямой удар в переднюю стену корта, при котором мяч по прямой направляется бьющим игроком паралельно одной из боковых стен корта в его заднюю часть. Драйв может наноситься с любой части корта (передней, центральной задней). Это основной удар в игре.',
    url: 'test',
    favorite: false,
    completed: false,
  },
];

const GameTechnique: FC<HomeScreensStackScreenProps> = ({navigation}) => {
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

export default GameTechnique;
