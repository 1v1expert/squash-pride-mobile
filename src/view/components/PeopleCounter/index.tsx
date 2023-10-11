import {HStack, Image} from '@gluestack-ui/themed';
import React from 'react';
import {images} from '../../../assets';
type PeopleCounterProps = {
  amountOfPeople: number;
  space?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  width?: number;
  height?: number;
};
const PeopleCounter = ({
  amountOfPeople,
  space = 'md',
  width = 15,
  height = 50,
}: PeopleCounterProps) => {
  const people = Array.from({length: amountOfPeople}, (_, index) => index);

  return (
    <HStack space={space}>
      {people.map((_, i) => (
        <Image
          key={i}
          source={images.human}
          width={width}
          height={height}
          resizeMode="contain"
          alt=""
        />
      ))}
    </HStack>
  );
};

export default PeopleCounter;
