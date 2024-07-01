import {Text, VStack} from '@gluestack-ui/themed';
import {Box, HStack} from '@gluestack-ui/themed';
import React from 'react';
import {fontSize} from '../../../assets/fontsSize';

interface TabIndicatorProps {
  selected: number;
  length?: number;
  items?: {title: string; done: boolean}[] | string[];
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
        const current = i === selected;
        const title = typeof text === 'object' ? text.title : text;
        const done = typeof text === 'object' ? text.done : false;
        return (
          <VStack
            alignItems="center"
            space="xs"
            key={i}
            justifyContent="center">
            {items && (
              <Text variant="primary" fontSize={fontSize.text}>
                {title}
              </Text>
            )}
            <Box
              bgColor={current || done ? '#F7AB39' : '#D9D9D9'}
              width={current ? 12 : 10}
              height={current ? 12 : 10}
              borderRadius={10}
            />
          </VStack>
        );
      })}
    </HStack>
  );
};
export default Indicator;
