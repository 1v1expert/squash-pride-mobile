import {HStack, Image, Pressable} from '@gluestack-ui/themed';
import React from 'react';
import {images} from '../../../assets';
import {perfectSize} from '../../../tools/helpers/perfectSize';
type PeopleCounterProps = {
  amountOfPeople?: number;
  selected?: number;
  setSelected?: (e: number) => void;
  action?: () => void;
  space?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  width?: number;
  height?: number;
};
const PeopleCounter = ({
  amountOfPeople = 0,
  selected = 0,
  setSelected,
  action,
  space = 'md',
  width = perfectSize(15),
  height = perfectSize(50),
}: PeopleCounterProps) => {
  const players = Array.from({length: amountOfPeople}, (_, index) => index + 1);
  const choosePeople = (i: number) => {
    setSelected && setSelected(i);
    action && action();
  };

  return (
    <HStack space={space}>
      {players.map((target, i) =>
        !setSelected ? (
          <Image
            key={i}
            source={target <= selected ? images.selectedHuman : images.human}
            width={target <= selected ? width + 2.5 : width}
            height={height}
            resizeMode="contain"
            alt=""
          />
        ) : (
          <Pressable key={i} onPress={() => choosePeople(target)} hitSlop={10}>
            <Image
              source={target <= selected ? images.selectedHuman : images.human}
              width={target <= selected ? width + 2.5 : width}
              height={height}
              resizeMode="contain"
              alt=""
            />
          </Pressable>
        ),
      )}
    </HStack>
  );
};

export default PeopleCounter;
