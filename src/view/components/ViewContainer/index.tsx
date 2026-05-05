import {Box, HStack, Text, VStack} from '@gluestack-ui/themed';
import React, {FC, PropsWithChildren, ReactNode} from 'react';
import SafeAreaLayout from '../SafeAreaLayout';
import {fontSize} from '../../../assets/fontsSize';
import {perfectSize} from '../../../tools/helpers/perfectSize';
import {Platform, useWindowDimensions} from 'react-native';

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
  const {width} = useWindowDimensions();
  const isWeb = Platform.OS === 'web';
  const headerHorizontalPadding = isWeb ? Math.max(20, Math.min(36, width * 0.04)) : 20;
  const minHeaderHeight = isWeb ? 56 : perfectSize(50);
  const topPadding = isWeb ? 8 : perfectSize(5);
  const bottomPadding = isWeb ? 10 : perfectSize(15);

  return (
    <Box flex={1} bgColor="#131517">
      <SafeAreaLayout top>
        <VStack flex={1} width="$full" alignItems="center" bgColor="#25282D">
          <HStack
            bgColor="#131517"
            width="$full"
            alignItems="center"
            justifyContent={headerContent}
            space="xl"
            paddingHorizontal={headerHorizontalPadding}
            minHeight={minHeaderHeight}
            pt={topPadding}
            paddingBottom={bottomPadding}>
            <HStack minHeight={minHeaderHeight} minWidth={minHeaderHeight}>
              {leftHeaderButton}
            </HStack>
            <VStack justifyContent="center">
              {title && (
                <Text variant="primary" fontSize={fontSize.title}>
                  {title}
                </Text>
              )}
              {header}
            </VStack>
            <HStack minHeight={minHeaderHeight} minWidth={minHeaderHeight}>
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
