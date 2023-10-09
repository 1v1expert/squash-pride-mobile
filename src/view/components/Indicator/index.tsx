import {Text, VStack} from '@gluestack-ui/themed';
import {Box, HStack} from '@gluestack-ui/themed';
import React from 'react';

interface TabIndicatorProps {
  selected: number;
  length?: number;
  items?: string[];
  space?: 'xl' | 'xs' | 'sm' | 'md' | 'lg' | '2xl' | '3xl' | '4xl';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
}
const Indicator = ({
  selected,
  length,
  items,
  space = 'xl',
  justifyContent = 'center',
}: TabIndicatorProps) => {
  const position = items
    ? items
    : Array.from({length: length || 0}, (_, index) => index);

  return (
    <HStack space={space} width="$full" justifyContent={justifyContent}>
      {position.map((text, i) => {
        return (
          <VStack alignItems="center" space="md">
            {items && <Text variant="primary">{text}</Text>}
            <Box
              bgColor={i === selected ? '#F7AB39' : '#D9D9D9'}
              width={10}
              height={10}
              borderRadius={10}
            />
          </VStack>
        );
      })}
    </HStack>
  );
};
export default Indicator;
