import {Center, Image, Text} from '@gluestack-ui/themed';
import {HStack, VStack} from '@gluestack-ui/themed';
import React, {useEffect, useState} from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import {TItem} from '../../navigation/types';
import {perfectSize} from '../../../tools/helpers/perfectSize';
import {fontSize} from '../../../assets/fontsSize';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import {createThumbnail} from 'react-native-create-thumbnail';

const width = Dimensions.get('screen').width;
type ItemProps = {
  item: TItem;
  onPress: (e: TItem) => void;
};
const Item = ({item, onPress}: ItemProps) => {
  const {i18n} = useCustomTranslation();
  const {title, ru_description, description, video, uid} = item;
  let descriptionText = i18n.language === 'ru' ? ru_description : description;

  const [thumbnail, setThumbnail] = useState<string>();

  useEffect(() => {
    const getThumbnail = async () => {
      await createThumbnail({
        url: video,
        timeStamp: 0,
        format: 'jpeg',
        cacheName: uid,
      }).then(response => {
        setThumbnail(response.path);
      });
    };
    getThumbnail();
  }, [uid, video]);

  return (
    <TouchableOpacity onPress={() => onPress(item)}>
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
            source={{uri: thumbnail}}
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
        <VStack space="md" maxWidth={width * 0.6}>
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
              width="70%"
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
