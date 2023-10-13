import {HStack, Icon, Text, VStack} from '@gluestack-ui/themed';
import React, {useState} from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {Controller, useFormContext} from 'react-hook-form';
import Stars from '../Stars';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';

const width = Dimensions.get('screen').width;
type ShotAccordionnProps = {
  name: string;
  defaultValue?: string;
};
const ShotAccordion = ({name, defaultValue}: ShotAccordionnProps) => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleExpand = () => setCollapsed(prev => !prev);
  const {t} = useCustomTranslation();
  const levels = Array.from({length: 5}, (_, index) => index + 1);
  const {control} = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue ?? 0}
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
                <Text color="#fff">ТИП УДАРА</Text>
                <Icon />
              </HStack>
            </TouchableOpacity>
            <Collapsible collapsed={collapsed}>
              <VStack
                bgColor="#393A40"
                paddingHorizontal={width * 0.03}
                minHeight={50}>
                {levels.map(level => (
                  <TouchableOpacity onPress={() => chooseLevel(level)}>
                    <HStack
                      justifyContent="space-between"
                      alignItems="center"
                      paddingHorizontal={5}
                      key={level}
                      borderBottomWidth={levels.length !== level ? 1 : 0}>
                      <Text fontSize={12} color="#fff" maxWidth="$1/2">
                        {t(`private.optionsScreen.step2.level${level}`)}
                      </Text>
                      <Stars level={level} space="sm" />
                    </HStack>
                  </TouchableOpacity>
                ))}
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
                  paddingHorizontal={5}>
                  <Text fontSize={12} color="#fff">
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

export default ShotAccordion;
