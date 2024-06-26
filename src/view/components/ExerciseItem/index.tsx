import {Image, Text} from '@gluestack-ui/themed';
import {Center, HStack, VStack} from '@gluestack-ui/themed';
import React, {useEffect, useState} from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import Check from '../../../assets/svg/check';
import {images} from '../../../assets';
import {ExerciseType} from '../../../bus/training/types';
import {fontSize} from '../../../assets/fontsSize';
import {useTraining} from '../../../bus/training';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import {createThumbnail} from 'react-native-create-thumbnail';

const width = Dimensions.get('screen').width;
type ExerciseItemProps = {
  item: ExerciseType;
  selected?: boolean;
  onPress: () => void;
};
const ExerciseItem = ({item, selected, onPress}: ExerciseItemProps) => {
  const {getFavoriteItem} = useTraining();
  const {i18n} = useCustomTranslation();
  const [thumbnail, setThumbnail] = useState<string>();

  const favorite = getFavoriteItem(item);

  useEffect(() => {
    const getThumbnail = async () => {
      await createThumbnail({
        url: item.video,
        timeStamp: 0,
        format: 'jpeg',
        cacheName: item.uid,
      }).then(response => {
        setThumbnail(response.path);
      });
    };
    getThumbnail();
  }, [item.uid, item.video]);

  return (
    <TouchableOpacity onPress={onPress}>
      <HStack alignItems="center" marginBottom={20} space="xl">
        {thumbnail ? (
          <Image
            width={width * 0.3}
            height={width * 0.3}
            bgColor={'#393A40'}
            borderRadius={20}
            alignItems="center"
            justifyContent="center"
            shadowColor="#000"
            shadowOffset={{width: 0, height: 5}}
            shadowOpacity={0.36}
            shadowRadius={6.68}
            source={{uri: thumbnail || ''}}
            alt=""
          />
        ) : (
          <Center
            width={width * 0.3}
            height={width * 0.3}
            bgColor={'#393A40'}
            borderRadius={20}
            alignItems="center"
            justifyContent="center"
            shadowColor="#000"
            shadowOffset={{width: 0, height: 5}}
            shadowOpacity={0.36}
            shadowRadius={6.68}
          />
        )}
        <VStack space="md" flex={1}>
          <Text
            variant="primary"
            fontSize={fontSize.body}
            fontWeight="$bold"
            flexWrap="wrap"
            alignItems="center">
            {item.title}
          </Text>
          <HStack justifyContent="space-between">
            <Text
              variant="primary"
              fontSize={fontSize.body}
              flexWrap="wrap"
              lineHeight={12}
              width="70%"
              numberOfLines={3}>
              {i18n.language === 'ru' && item.ru_description
                ? item.ru_description
                : item.description}
            </Text>
            <HStack space="md">
              <Center minWidth={20} minHeight={20}>
                {favorite && (
                  <Image source={images.heart} width={15} height={15} alt="" />
                )}
              </Center>
              <Center minWidth={20} minHeight={20}>
                {selected && <Check />}
              </Center>
            </HStack>
          </HStack>
        </VStack>
      </HStack>
    </TouchableOpacity>
  );
};

export default ExerciseItem;
