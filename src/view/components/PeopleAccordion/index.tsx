import {HStack, Text, VStack} from '@gluestack-ui/themed';
import React, {useState} from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import Collapsible from 'react-native-collapsible';
import PeopleCounter from '../PeopleCounter';
import {Controller, useFormContext} from 'react-hook-form';
import ChevronDown from '../../../assets/svg/chevron_down';
import ChevronUp from '../../../assets/svg/chevron_up';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';

const width = Dimensions.get('screen').width;
type PeopleAccordionProps = {
  name: string;
  defaultValue?: string;
};
const PeopleAccordion = ({name, defaultValue}: PeopleAccordionProps) => {
  const [collapsed, setCollapsed] = useState(true);
  const {t} = useCustomTranslation();
  const toggleExpand = () => setCollapsed(prev => !prev);
  const number: string[] = Array.from({length: 4}, (_, index) =>
    t(`private.peopleAccordion.number${index + 1}`),
  );

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
                minHeight={50}
                alignItems="center"
                justifyContent="space-between">
                <Text color="#fff">{t('private.peopleAccordion.title')}</Text>
                {collapsed ? <ChevronDown /> : <ChevronUp />}
              </HStack>
            </TouchableOpacity>
            <Collapsible collapsed={collapsed}>
              <VStack
                bgColor="#393A40"
                paddingHorizontal={width * 0.03}
                minHeight={50}>
                <HStack space="4xl" alignItems="center" padding={10}>
                  <Text fontSize={12} color="#fff">
                    {t('private.peopleAccordion.text')}
                  </Text>
                  <PeopleCounter
                    amountOfPeople={4}
                    selected={value}
                    setSelected={onChange}
                    action={() => setCollapsed(true)}
                    space="3xl"
                  />
                </HStack>
              </VStack>
            </Collapsible>
            {collapsed && !!value && (
              <VStack
                bgColor="#393A40"
                paddingHorizontal={width * 0.03}
                minHeight={50}>
                <HStack
                  justifyContent="space-between"
                  alignItems="center"
                  paddingHorizontal={10}>
                  <Text
                    fontSize={12}
                    color="#fff"
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
