import {HStack, Text, VStack} from '@gluestack-ui/themed';
import React, {useState} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {Controller, useFormContext} from 'react-hook-form';
import ChevronDown from '../../../assets/svg/chevron_down';
import ChevronUp from '../../../assets/svg/chevron_up';

const width = Dimensions.get('screen').width;

type ShotAccordionProps = {
  name: string;
  defaultValue?: string;
};
const ShotAccordion = ({name, defaultValue}: ShotAccordionProps) => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleExpand = () => setCollapsed(prev => !prev);
  const {control} = useFormContext();
  const shots = [
    'DRIVE',
    'CROSS',
    'BOUST',
    'DROP',
    'SERVE',
    'LOB',
    'ВСЕ',
    'ТАКТИКА',
  ];

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue ?? []}
      render={({field: {value, onChange}}) => {
        const chooseShot = (shot: string) => {
          if (!value.includes(shot)) {
            onChange([...value, shot]);
          } else {
            onChange(value.filter((e: string) => shot !== e));
          }
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
                {collapsed ? <ChevronDown /> : <ChevronUp />}
              </HStack>
            </TouchableOpacity>
            <Collapsible collapsed={collapsed}>
              <VStack
                bgColor="#393A40"
                paddingHorizontal={width * 0.03}
                pt={20}
                maxHeight={220}
                flexWrap="wrap">
                {shots.map((shot, i) => (
                  <TouchableOpacity
                    onPress={() => chooseShot(shot)}
                    style={styles.touchable}
                    key={i}>
                    <HStack pl={20}>
                      <Text
                        fontSize={12}
                        color={value.includes(shot) ? '#F7A936' : '#fff'}>
                        {shot}
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
                minHeight={50}
                flexWrap="wrap">
                {value.map((shot: string, i: number) => {
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
                        fontSize={12}
                        color={value.includes(shot) ? '#F7A936' : '#fff'}>
                        {shot}
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

export default ShotAccordion;
