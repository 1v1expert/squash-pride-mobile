import {HStack, Text, VStack} from '@gluestack-ui/themed';
import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {
  Controller,
  FieldError,
  FieldErrorsImpl,
  Merge,
  useFormContext,
} from 'react-hook-form';
import ChevronDown from '../../../assets/svg/chevron_down';
import ChevronUp from '../../../assets/svg/chevron_up';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import {useTraining} from '../../../bus/training';
import {GroupData} from '../../../bus/training/types';
import {perfectSize} from '../../../tools/helpers/perfectSize';
import {fontSize} from '../../../assets/fontsSize';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

type GroupAccordionProps = {
  name: string;
  defaultValue?: string;
  error?: Merge<
    FieldError,
    (Merge<FieldError, FieldErrorsImpl<GroupData>> | undefined)[]
  >;
  groupLength: number;
};
const GroupAccordion = ({
  name,
  defaultValue,
  error,
  groupLength,
}: GroupAccordionProps) => {
  const [collapsed, setCollapsed] = useState(true);
  const {t} = useCustomTranslation();
  const {control} = useFormContext();
  const {groups} = useTraining();

  const toggleExpand = () => setCollapsed(prev => !prev);
  useEffect(() => {
    error && setCollapsed(false);
  }, [error]);
  console.log('error', error);
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue ?? []}
      render={({field: {value, onChange}}) => {
        console.log('value', value);
        const chooseGroup = (group: string) => {
          if (!value.includes(group) && value.length < groupLength) {
            onChange([...value, group]);
            if (groupLength - 1 === value.length) {
              setCollapsed(true);
            }
          } else {
            onChange(value.filter((e: string) => group !== e));
          }
        };
        const forOne = (group: string) => {
          onChange([group]);
          if (!value.includes(group)) {
            onChange([group]);
            setCollapsed(true);
          } else {
            onChange([]);
          }
        };

        return (
          <VStack>
            <TouchableOpacity onPress={toggleExpand}>
              <HStack
                bgColor={collapsed ? '#000' : '#F7A936'}
                paddingHorizontal={width * 0.03}
                minHeight={perfectSize(50)}
                alignItems="center"
                justifyContent="space-between">
                <Text variant="primary" fontSize={fontSize.text}>
                  {t('private.groupAccordion.title')}
                </Text>
                {collapsed ? <ChevronDown /> : <ChevronUp color="#000" />}
              </HStack>
            </TouchableOpacity>
            <Collapsible collapsed={collapsed}>
              <VStack
                bgColor="#393A40"
                paddingHorizontal={width * 0.03}
                pt={20}
                maxHeight={height * 0.3}
                flexWrap="wrap">
                {groups.map((group, i) => (
                  <TouchableOpacity
                    onPress={() =>
                      groupLength === 1
                        ? forOne(group.name)
                        : chooseGroup(group.name)
                    }
                    style={styles.touchable}
                    key={i}>
                    <HStack pl={20}>
                      <Text
                        variant="primary"
                        fontSize={fontSize.accordionBody}
                        color={value.includes(group.name) ? '#F7A936' : '#fff'}>
                        {group.name}
                      </Text>
                    </HStack>
                  </TouchableOpacity>
                ))}
              </VStack>
            </Collapsible>
            {collapsed && !!value.length && (
              <HStack
                bgColor="#393A40"
                paddingHorizontal={width * 0.03}
                justifyContent="center"
                flexWrap="wrap">
                {value.map((group: string, i: number) => {
                  return (
                    <HStack
                      key={i}
                      width="$1/3"
                      p={10}
                      borderRightWidth={
                        i === value.length - 1 ? 0 : (i + 1) % 3 !== 0 ? 1 : 0
                      }
                      justifyContent="center"
                      marginVertical={5}>
                      <Text
                        variant="primary"
                        fontSize={fontSize.accordionBody}
                        color={value.includes(group) ? '#F7A936' : '#fff'}>
                        {group}
                      </Text>
                    </HStack>
                  );
                })}
              </HStack>
            )}
          </VStack>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  touchable: {
    width: '50%',
    minHeight: 50,
  },
});

export default GroupAccordion;
