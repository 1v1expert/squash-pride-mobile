import React, {FC, useEffect, useState} from 'react';
import ViewContainer from '../../components/ViewContainer';
import CustomButton from '../../components/CustomButton';
import {ArrowLeftIcon,} from '@gluestack-ui/themed';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import {FilterScreenProps} from '../../navigation/types';

import {useTraining} from '../../../bus/training';
import {Book} from '../../navigation/book';
import FilterForm from '../../forms/FilterForm';
import {FilterFormType} from '../../../bus/training/types';
// import TooltipModal from "../../components/TooltipModal";
// import {getTooltipStatus, saveTooltipStatus} from "../../../tools/helpers/tooltipStorage";
// import {Dimensions} from 'react-native';
// const width = Dimensions.get('screen').width;

const Filter: FC<FilterScreenProps> = ({navigation, route}) => {
  const {
    setFilters,
    fetchExercise
  } = useTraining();
  const {t} = useCustomTranslation();
  const {goBack, navigate} = navigation;
  const location = route.params?.location || "Home";
  const from = route.params?.from;
  // const isPreparedTrainings = location === 'PreparedTrainings';
  // const tooltip = isPreparedTrainings
  //     ? t('private.filter.preparedTrainingTooltip')
  //     : t('private.filter.createTrainingTooltip');

  // const [showTooltip, setShowTooltip] = useState(false);

  const submit = (values: FilterFormType) => {
    setFilters(values);

    // navigate(Book.ChooseTrainingType, {
    //   from,
    //   location,
    // });
      switch (location) {
          case 'PreparedTrainings' : {
              navigate(Book.PreparedTrainings);
              break;
          }
          case 'CreateTrainingWithoutTab': {
              navigate(Book.ChooseTrainingType, {
                  from,
                  location,
              });
              break;
          }
          default: {
              goBack();
          }
      }


    // switch (location) {
    // case 'StartTraining': {
    //   fetchExercise({
    //     players: values.players,
    //     level: values.level,
    //     group: values.group,
    //     readyTraining: true,
    //   }).then(() =>
    //     navigate(Book.CreateTrainingWithoutTab, {
    //       from,
    //       readyTraining: true,
    //     }),
    //   );
    //   break;
    // }
    // case 'CreateTrainingWithoutTab': {
    //   return fetchExercise({
    //     players: values.players,
    //     level: values.level,
    //     group: values.group,
    //   }).then(() => [
    //     navigate(Book.CreateTrainingWithoutTab, {from, readyTraining: false}),
    //   ]);
    // }
    // default: {
    //   goBack();
    // }

    // }
  };

  // useEffect(()=>{
  //     const getTooltip = async () => {
  //         await saveTooltipStatus(location, false);
  //
  //         const isTooltipClear = await getTooltipStatus(location);
  //         if (isTooltipClear !== true) {
  //             setShowTooltip(true);
  //             await saveTooltipStatus(location, false);
  //         }
  //     };
  //     getTooltip();
  // },[]);

  return (
    <ViewContainer
      title={t('private.filter.title')}
      leftHeaderButton={
        <CustomButton
          iconLeft={ArrowLeftIcon}
          bgColor="#25282D"
          onPress={goBack}
          width={50}
        />
      }>
      <FilterForm onPress={submit} required={!!location} />
      {/*{showTooltip && <TooltipModal tooltip={tooltip}/>}*/}
    </ViewContainer>
  );
};

export default Filter;
