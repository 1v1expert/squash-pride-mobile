import {Box, HStack, Text, VStack} from '@gluestack-ui/themed';
import React from 'react';
import SafeAreaLayout from '../../components/SafeAreaLayout';

const Home = () => {
  return (
    <Box flex={1} bgColor="#131517">
      <SafeAreaLayout top>
        <VStack flex={1} alignItems="center" bgColor="#25282D">
          <VStack
            bgColor="#131517"
            width="$full"
            alignItems="center"
            paddingHorizontal={20}
            minHeight={160}
            space="xs">
            <Text variant="primary">Добро пожаловать, Кристи!</Text>
            <Box bgColor="#F7A936" width="$full" height={2} />
          </VStack>
          <VStack
            flex={1}
            // bgColor="red"
            width="$full"
            // height="$full"
            paddingHorizontal={20}
            justifyContent="space-evenly">
            <HStack bgColor="#393A40" padding={25} borderRadius={15}>
              <Box
                width={60}
                height={60}
                bgColor="orange"
                borderRadius={15}></Box>
            </HStack>
            <HStack bgColor="#393A40" padding={25} borderRadius={15}>
              <Box
                width={60}
                height={60}
                bgColor="orange"
                borderRadius={15}></Box>
            </HStack>
            <HStack bgColor="#393A40" padding={25} borderRadius={15}>
              <Box
                width={60}
                height={60}
                bgColor="orange"
                borderRadius={15}></Box>
            </HStack>
            <HStack bgColor="#393A40" padding={25} borderRadius={15}>
              <Box
                width={60}
                height={60}
                bgColor="orange"
                borderRadius={15}></Box>
            </HStack>
          </VStack>
        </VStack>
      </SafeAreaLayout>
    </Box>
  );
};

export default Home;
