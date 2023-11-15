import {HStack, Text, VStack} from '@gluestack-ui/themed';
import React, {useEffect, useState} from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {Controller, FieldError, useFormContext} from 'react-hook-form';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import ChevronDown from '../../../assets/svg/chevron_down';
import ChevronUp from '../../../assets/svg/chevron_up';
import {fontSize} from '../../../assets/fontsSize';
import {perfectSize} from '../../../tools/helpers/perfectSize';

const width = Dimensions.get('screen').width;
type LevelAccordionProps = {
  name: string;
  defaultValue?: string;
  error?: FieldError;
};
type RenderType = {
  field: {
    value: 'amateur' | 'professional';
    onChange: (e: 'amateur' | 'professional') => void;
  };
};
const LevelAccordion = ({name, defaultValue, error}: LevelAccordionProps) => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleExpand = () => setCollapsed(prev => !prev);
  const {t} = useCustomTranslation();
  const levels: ('amateur' | 'professional')[] = ['amateur', 'professional'];
  const {control} = useFormContext();

  useEffect(() => {
    error && setCollapsed(false);
  }, [error]);

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({field: {onChange, value}}: RenderType) => {
        const chooseLevel = (level: 'amateur' | 'professional') => {
          onChange(level);
          toggleExpand();
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
                  {t('private.optionsScreen.step2.title')}
                </Text>
                {collapsed ? <ChevronDown /> : <ChevronUp color="#000" />}
              </HStack>
            </TouchableOpacity>
            <Collapsible collapsed={collapsed}>
              <VStack
                bgColor="#393A40"
                paddingHorizontal={width * 0.03}
                minHeight={perfectSize(50)}>
                {levels.map((level, i) => (
                  <TouchableOpacity onPress={() => chooseLevel(level)} key={i}>
                    <HStack
                      justifyContent="space-between"
                      alignItems="center"
                      p={10}
                      borderBottomWidth={levels.length !== i ? 1 : 0}>
                      <Text
                        variant="primary"
                        fontSize={fontSize.accordionBody}
                        textAlign="center"
                        width="$full">
                        {t(`private.optionsScreen.step2.${level}`)}
                      </Text>
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
                    fontSize={fontSize.accordionBody}
                    variant="secondary"
                    textAlign="center"
                    p={10}
                    width="$full">
                    {t(`private.optionsScreen.step2.${value}`)}
                  </Text>
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
