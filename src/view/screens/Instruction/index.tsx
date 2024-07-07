import {Text, VStack} from '@gluestack-ui/themed';
import React, {useCallback, useEffect} from 'react';
import ViewContainer from '../../components/ViewContainer';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';
import {RefreshControl, StyleSheet, TouchableOpacity} from 'react-native';
import TrainingItem from '../../components/TrainingItem';
import {FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useInstruction} from "../../../bus/instruction";
import Item from "../../components/Item";
import {PrivateStackScreenProps, TItem} from "../../navigation/types";
import {Book} from "../../navigation/book";

const Instruction = () => {
  const {addListener} = useNavigation();
  const {
      fetchInstruction,
      isLoading,
      instructions,
      setInstructions,
  } = useInstruction();
  const {t} = useCustomTranslation();

  const {navigate} = useNavigation<PrivateStackScreenProps['navigation']>();

  const fetch = useCallback(
      async () => {
        const res = await fetchInstruction();
          // setInstructions(res);
    },
    [
        fetchInstruction,
        // setInstructions,
    ],
  );

  useEffect(() => {
    const unsubscribe = addListener('focus', () => {
      fetch();
    });

    return unsubscribe;
  }, [addListener, fetch]);

    const goToItem = (e: TItem) => {
        navigate(Book.MediaViewer, {...e});
    };

    // console.log('Instruction isLoading: ', isLoading);
    console.log('Instruction instructions: ', instructions);

  return (
    <ViewContainer
      title={t('private.instructionScreen.title')}>
      <VStack flex={1} width="$full">
          <FlatList
            data={instructions}
            renderItem={({item}) => {
              return <Item item={item} onPress={goToItem} />;
            }}
            style={styles.flatList}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={fetch}
                tintColor="#F7AB39"
              />
            }
            // keyExtractor={(item, i) =>
            //   item.exercise ? item.exercise.uid : i.toString()
            // }
          />
      </VStack>
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  selected: {
    borderBottomWidth: 2,
    borderBottomColor: '#F7AB39',
  },
  touchableOpacity: {
    width: '50%',
  },
  flatList: {width: '100%', paddingTop: 20, paddingHorizontal: 20},
});
export default Instruction;
