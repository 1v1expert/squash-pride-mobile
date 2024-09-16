import React, {FC, useEffect, useState} from 'react';
import ViewContainer from '../../components/ViewContainer';
import CustomButton from '../../components/CustomButton';
import {ArrowLeftIcon, Text} from '@gluestack-ui/themed';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import {HomeScreensStackScreenProps, TItem} from '../../navigation/types';
import {Dimensions, FlatList} from 'react-native';
import Item from '../../components/Item';
import {Book} from '../../navigation/book';
import {useTraining} from '../../../bus/training';
import TooltipModal from "../../components/TooltipModal";
import {getTooltipStatus, saveTooltipStatus} from "../../../tools/helpers/tooltipStorage";

const width = Dimensions.get('screen').width;

// const DATA: TItem[] = [
//   {
//     uid: '3221312-2131231-21312312',
//     title: 'Test',
//     video:
//       'https://squash-pride.ru/api/media/drive-boost-cross-2players-amat.MOV',
//     ru_description: 'test',
//     en_description: 'test',
//   },
//   {
//     uid: '3221312-2131231-4543534',
//     title: 'Test2',
//     video:
//       'https://squash-pride.ru/api/media/drive-boost-cross-2players-amat.MOV',
//     ru_description: 'test2',
//     en_description: 'test2',
//   },
//   {
//     uid: '3221312-2131231-234325523',
//     title: 'Test3',
//     video:
//       'https://squash-pride.ru/api/media/drive-boost-cross-2players-amat.MOV',
//     ru_description: 'test3',
//     en_description: 'test3',
//   },
// ];

const GameTechnique: FC<HomeScreensStackScreenProps> = ({navigation}) => {
  const {t} = useCustomTranslation();
  const {navigate, goBack} = navigation;
  const {techniques} = useTraining();

  const [showTooltip, setShowTooltip] = useState(false);

    const goToItem = (e: TItem) => {
    navigate(Book.MediaViewer, {...e});
  };

    useEffect(()=>{
        const getTooltip = async () => {
            // note: for only debug! will be fix it later
            await saveTooltipStatus('GameTechnique', false);

            const isTooltipClear = await getTooltipStatus('GameTechnique');
            if (isTooltipClear !== true) {
                setShowTooltip(true);
                await saveTooltipStatus('GameTechnique', true);
            }
        };
        getTooltip();
    },[]);

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
      {!techniques.length && (
        <Text variant="primary" pt={20}>
          No data
        </Text>
      )}
      <FlatList
        data={techniques}
        renderItem={({item}) => <Item item={item} onPress={goToItem} />}
        style={{width, paddingTop: 20, paddingHorizontal: 20}}
      />
        {showTooltip && <TooltipModal tooltip={t('private.gameTechnique.tooltip')}/>}
    </ViewContainer>
  );
};

export default GameTechnique;
