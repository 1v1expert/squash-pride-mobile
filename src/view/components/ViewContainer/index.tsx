import {Box, HStack, Text, VStack} from '@gluestack-ui/themed';
import React, {FC, PropsWithChildren, ReactNode} from 'react';
import SafeAreaLayout from '../SafeAreaLayout';

type ViewContainerProps = {
  title?: string;
  leftHeaderButton?: ReactNode;
  rightHeaderButton?: ReactNode;
};

const ViewContainer: FC<PropsWithChildren<ViewContainerProps>> = ({
  children,
  title,
  leftHeaderButton,
  rightHeaderButton,
}) => {
  return (
    <Box flex={1} bgColor="#131517">
      <SafeAreaLayout top>
        <VStack flex={1} alignItems="center" bgColor="#25282D">
          <HStack
            bgColor="#131517"
            width="$full"
            alignItems="center"
            justifyContent="space-between"
            paddingHorizontal={20}
            minHeight={50}
            paddingBottom={15}>
            <HStack minHeight={50} minWidth={50}>
              {leftHeaderButton}
            </HStack>
            <HStack>
              <Text variant="primary">{title}</Text>
            </HStack>
            <HStack minHeight={50} minWidth={50}>
              {rightHeaderButton}
            </HStack>
          </HStack>
          {children}
        </VStack>
      </SafeAreaLayout>
    </Box>
  );
};

export default ViewContainer;
