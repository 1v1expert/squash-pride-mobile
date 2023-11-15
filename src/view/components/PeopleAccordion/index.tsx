import {HStack, Text, VStack} from '@gluestack-ui/themed';
import React, {useEffect, useState} from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import Collapsible from 'react-native-collapsible';
import PeopleCounter from '../PeopleCounter';
import {Controller, FieldError, useFormContext} from 'react-hook-form';
import ChevronDown from '../../../assets/svg/chevron_down';
import ChevronUp from '../../../assets/svg/chevron_up';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import {perfectSize} from '../../../tools/helpers/perfectSize';
import {fontSize} from '../../../assets/fontsSize';

const width = Dimensions.get('screen').width;

type PeopleAccordionProps = {
  name: string;
  defaultValue?: string;
  error?: FieldError;
};

const PeopleAccordion = ({name, defaultValue, error}: PeopleAccordionProps) => {
  const [collapsed, setCollapsed] = useState(true);
  const {t} = useCustomTranslation();
  const toggleExpand = () => setCollapsed(prev => !prev);
  const number = [
    t('private.peopleAccordion.number1'),
    t('private.peopleAccordion.number2'),
    t('private.peopleAccordion.number3'),
    t('private.peopleAccordion.number4'),
  ];

  useEffect(() => {
    error && setCollapsed(false);
  }, [error]);

  const {control} = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({field: {onChange, value}}) => {
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
                  {t('private.peopleAccordion.title')}
                </Text>
                {collapsed ? <ChevronDown /> : <ChevronUp color="#000" />}
              </HStack>
            </TouchableOpacity>
            <Collapsible collapsed={collapsed}>
              <VStack
                bgColor="#393A40"
                paddingHorizontal={width * 0.03}
                minHeight={perfectSize(50)}
                justifyContent="center">
                <HStack
                  alignItems="center"
                  justifyContent="space-between"
                  paddingHorizontal={10}>
                  <Text variant="primary" fontSize={fontSize.accordionBody}>
                    {t('private.peopleAccordion.text')}
                  </Text>
                  <PeopleCounter
                    amountOfPeople={4}
                    selected={value}
                    setSelected={onChange}
                    action={() => setCollapsed(true)}
                    space="xl"
                  />
                </HStack>
              </VStack>
            </Collapsible>
            {collapsed && !!value && (
              <VStack
                bgColor="#393A40"
                paddingHorizontal={width * 0.03}
                minHeight={perfectSize(50)}
                justifyContent="center">
                <HStack
                  justifyContent="space-between"
                  alignItems="center"
                  paddingHorizontal={10}>
                  <Text
                    fontSize={fontSize.accordionBody}
                    variant="secondary"
                    textAlign="center"
                    width="$1/2">
                    {number[value - 1]}
                  </Text>
                  <PeopleCounter
                    amountOfPeople={4}
                    selected={value}
                    space="xl"
                  />
                </HStack>
              </VStack>
            )}
          </VStack>
        );
      }}
    />
  );
};

export default PeopleAccordion;
