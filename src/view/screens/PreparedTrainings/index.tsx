import React, {FC, useCallback, useEffect, useState} from "react";
import {HomeScreensStackScreenProps, TItem} from "../../navigation/types";
import {useCustomTranslation} from "../../../tools/hooks/useTranslation";
import {useTraining} from "../../../bus/training";
import {Book} from "../../navigation/book";
import CustomButton from "../../components/CustomButton";
import {ArrowLeftIcon, Spinner, Text} from "@gluestack-ui/themed";
import ViewContainer from "../../components/ViewContainer";
import {Dimensions, FlatList} from "react-native";
import Item from "../../components/Item";

const width = Dimensions.get('screen').width;

const PreparedTrainings: FC<HomeScreensStackScreenProps> = ({navigation}) => {
    const {t} = useCustomTranslation();
    const {navigate, goBack} = navigation;
    const {preparedTrainings, fetchPreparedTrainings, setPreparedTrainings, filters} = useTraining();

    const goToItem = (e: TItem) => {
        navigate(Book.MediaViewer, {...e});
    };

    return (
        <ViewContainer
            title={t('private.gameTechnique.title')}
            leftHeaderButton={
                <CustomButton
                    iconLeft={ArrowLeftIcon}
                    bgColor="#25282D"
                    onPress={goBack}
                    width={50}
                />
            }>
            {!preparedTrainings.length && (
                <Spinner color="#F7AA37" />
            )}
            <FlatList
                data={preparedTrainings}
                renderItem={({item}) => <Item item={item} onPress={goToItem} />}
                style={{width, paddingTop: 20, paddingHorizontal: 20}}
            />
        </ViewContainer>
    )
};

export default PreparedTrainings;