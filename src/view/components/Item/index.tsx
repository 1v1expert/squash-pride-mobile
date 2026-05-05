import {Center, Image, Text} from '@gluestack-ui/themed';
import {HStack, VStack} from '@gluestack-ui/themed';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, useWindowDimensions} from 'react-native';
import {TItem} from '../../navigation/types';
import {perfectSize} from '../../../tools/helpers/perfectSize';
import {fontSize} from '../../../assets/fontsSize';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import {getVideoThumbnail} from '../../../tools/helpers/videoPreview';
import {images} from '../../../assets';

type ItemProps = {
  item: TItem;
  onPress: (e: TItem) => void;
};
const Item = ({item, onPress}: ItemProps) => {
  const {i18n} = useCustomTranslation();
  const {width} = useWindowDimensions();
  const {title, ru_description, description, video, uid} = item;
  let descriptionText = i18n.language === 'ru' ? ru_description : description;
  const containerWidth = Math.min(Math.max(width * 0.85, 380), 760);
  const imageSize = containerWidth * 0.28;

  const [thumbnail, setThumbnail] = useState<string>();

  useEffect(() => {
    const getThumbnail = async () => {
      const path = await getVideoThumbnail(video, uid);
      setThumbnail(path);
    };
    getThumbnail();
  }, [uid, video]);

  return (
    <TouchableOpacity onPress={() => onPress(item)}>
      <HStack alignItems="center" marginBottom={20} space="xl">
        {thumbnail ? (
          <Image
            width={imageSize}
            height={imageSize}
            bgColor={'#393A40'}
            borderRadius={20}
            alignItems="center"
            justifyContent="center"
            shadowColor="#000"
            shadowOffset={{width: 0, height: 5}}
            shadowOpacity={0.36}
            shadowRadius={6.68}
            source={{uri: thumbnail}}
            alt=""
          />
        ) : (
          <Image
            width={imageSize}
            height={imageSize}
            bgColor={'#393A40'}
            borderRadius={20}
            alignItems="center"
            justifyContent="center"
            shadowColor="#000"
            shadowOffset={{width: 0, height: 5}}
            shadowOpacity={0.36}
            shadowRadius={6.68}
            source={images.logo}
            alt=""
          />
        )}
        <VStack space="md" flex={1} minWidth={0}>
          <Text
            variant="primary"
            fontSize={perfectSize(14)}
            flexWrap="wrap"
            alignItems="center">
            {title}
          </Text>
          <HStack justifyContent="space-between">
            <Text
              variant="primary"
              fontSize={fontSize.body}
              flexWrap="wrap"
              lineHeight={12}
              width="100%"
              numberOfLines={3}>
              {descriptionText}
            </Text>
          </HStack>
        </VStack>
      </HStack>
    </TouchableOpacity>
  );
};

export default Item;
