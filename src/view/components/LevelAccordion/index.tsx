import {HStack, Text, VStack} from '@gluestack-ui/themed';
import React, {useState} from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {Controller, useFormContext} from 'react-hook-form';
import Stars from '../Stars';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import ChevronDown from '../../../assets/svg/chevron_down';
import ChevronUp from '../../../assets/svg/chevron_up';

const width = Dimensions.get('screen').width;
type LevelAccordionProps = {
  name: string;
  defaultValue?: string;
};
const LevelAccordion = ({name, defaultValue}: LevelAccordionProps) => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleExpand = () => setCollapsed(prev => !prev);
  const {t} = useCustomTranslation();
  const levels = Array.from({length: 5}, (_, index) => index + 1);
  const {control} = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({field: {onChange, value}}) => {
        const chooseLevel = (level: number) => {
          onChange(level);
          toggleExpand();
        };
        return (
          <VStack>
            <TouchableOpacity onPress={toggleExpand}>
              <HStack
                bgColor={collapsed ? '#000' : '#F7A936'}
                paddingHorizontal={width * 0.03}
                minHeight={50}
                alignItems="center"
                justifyContent="space-between">
                <Text color="#fff">
                  {t('private.optionsScreen.step2.title')}
                </Text>
                {collapsed ? <ChevronDown /> : <ChevronUp />}
              </HStack>
            </TouchableOpacity>
            <Collapsible collapsed={collapsed}>
              <VStack
                bgColor="#393A40"
                paddingHorizontal={width * 0.03}
                minHeight={50}>
                {levels.map(level => (
                  <TouchableOpacity
                    onPress={() => chooseLevel(level)}
                    key={level}>
                    <HStack
                      justifyContent="space-between"
                      alignItems="center"
                      paddingHorizontal={5}
                      borderBottomWidth={levels.length !== level ? 1 : 0}>
                      <Text
                        fontSize={12}
                        color="#fff"
                        width="$1/2"
                        textAlign="center">
                        {t(`private.optionsScreen.step2.level${level}`)}
                      </Text>
                      <Stars level={level} space="sm" />
                    </HStack>
                  </TouchableOpacity>
                ))}
              </VStack>
            </Collapsible>
            {collapsed && !!value && (
              <VStack bgColor="#393A40" paddingHorizontal={width * 0.03}>
                <HStack
                  justifyContent="space-between"
                  alignItems="center"
                  paddingHorizontal={5}>
                  <Text
                    fontSize={12}
                    color="#fff"
                    width="$1/2"
                    textAlign="center">
                    {t(`private.optionsScreen.step2.level${value}`)}
                  </Text>
                  <Stars level={value} space="sm" />
                </HStack>
              </VStack>
            )}
          </VStack>
        );
      }}
    />
  );
};

export default LevelAccordion;
