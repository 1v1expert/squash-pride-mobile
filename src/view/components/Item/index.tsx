import {Image, Text} from '@gluestack-ui/themed';
import {Center, HStack, VStack} from '@gluestack-ui/themed';
import React from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import Check from '../../../assets/svg/check';
import {images} from '../../../assets';
import {TItem} from '../../navigation/types';

const width = Dimensions.get('screen').width;
type ItemProps = {
  item: TItem;
  onPress: (e: TItem) => void;
};
const Item = ({item, onPress}: ItemProps) => {
  return (
    <TouchableOpacity onPress={() => onPress(item)}>
      <HStack alignItems="center" marginBottom={20} space="xl">
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
          elevation={11}
        />
        <VStack space="md" maxWidth={width * 0.6}>
          <Text
            variant="primary"
            fontSize={18}
            fontWeight="$bold"
            flexWrap="wrap"
            alignItems="center">
            {item.title}
          </Text>
          <HStack justifyContent="space-between">
            <Text
              variant="primary"
              fontSize={9}
              flexWrap="wrap"
              lineHeight={12}
              width="70%"
              numberOfLines={3}>
              {item.description}
            </Text>
            <HStack space="md">
              <Center minWidth={20} minHeight={20}>
                {item.favorite && (
                  <Image source={images.heart} width={15} height={15} alt="" />
                )}
              </Center>
              <Center minWidth={20} minHeight={20}>
                {item.completed && <Check />}
              </Center>
            </HStack>
          </HStack>
        </VStack>
      </HStack>
    </TouchableOpacity>
  );
};

export default Item;
