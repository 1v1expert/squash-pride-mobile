import {Box, HStack} from '@gluestack-ui/themed';
import React from 'react';

interface TabIndicatorProps {
  selected: number;
  length: number;
}
const Indicator = ({selected, length}: TabIndicatorProps) => {
  const position = Array.from({length}, (_, index) => index);

  return (
    <HStack space="xl">
      {position.map((_, i) => {
        return (
          <Box
            key={i}
            bgColor={i === selected ? '#F7AB39' : '#D9D9D9'}
            width={10}
            height={10}
            borderRadius={10}
          />
        );
      })}
    </HStack>
  );
};
export default Indicator;
