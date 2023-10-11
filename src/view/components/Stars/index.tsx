import {HStack, Image} from '@gluestack-ui/themed';
import React from 'react';
import {images} from '../../../assets';
type StarsProps = {
  level: number;
  space?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  width?: number;
  unselectedType?: 0 | 1;
  focus?: boolean;
};
const Stars = ({
  level,
  unselectedType,
  focus,
  space = 'md',
  width = 20,
}: StarsProps) => {
  const stars = Array.from({length: 5}, (_, index) => index);

  return (
    <HStack space={space} alignItems="center">
      {stars.map(count => (
        <Image
          key={count}
          source={
            count <= level - 1
              ? focus
                ? images.filledStar
                : images.star
              : unselectedType
              ? images.unselectedStar
              : images.footerStar
          }
          width={width}
          resizeMode="contain"
          alt=""
        />
      ))}
    </HStack>
  );
};

export default Stars;
