import {Box, HStack, Text, VStack} from '@gluestack-ui/themed';
import React, {FC, PropsWithChildren, ReactNode} from 'react';
import SafeAreaLayout from '../SafeAreaLayout';

type ViewContainerProps = {
  header?: ReactNode;
  title?: string;
  leftHeaderButton?: ReactNode;
  rightHeaderButton?: ReactNode;
  headerContent?:
    | 'space-between'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-around'
    | 'space-evenly';
};

const ViewContainer: FC<PropsWithChildren<ViewContainerProps>> = ({
  children,
  header,
  title,
  leftHeaderButton,
  rightHeaderButton,
  headerContent = 'space-between',
}) => {
  return (
    <Box flex={1} bgColor="#131517">
      <SafeAreaLayout top>
        <VStack flex={1} alignItems="center" bgColor="#25282D">
          <HStack
            bgColor="#131517"
            width="$full"
            alignItems="center"
            justifyContent={headerContent}
            space="xl"
            paddingHorizontal={20}
            minHeight={50}
            pt={5}
            paddingBottom={15}>
            <HStack minHeight={50} minWidth={50}>
              {leftHeaderButton}
            </HStack>
            <VStack justifyContent="center">
              {title && <Text variant="primary">{title}</Text>}
              {header}
            </VStack>
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
