import {Box, Center, Modal, Text, VStack} from "@gluestack-ui/themed";
import SafeAreaLayout from "../SafeAreaLayout";
import {Image, StyleSheet, TouchableOpacity} from "react-native";
import {images} from "../../../assets";
import CustomButton from "../CustomButton";
import React, {useState} from "react";
import {perfectSize} from "../../../tools/helpers/perfectSize";
import Indicator from "../Indicator";
import {useCustomTranslation} from "../../../tools/hooks/useTranslation";

const TooltipModal = ({tooltip}) => {
    const [visible, setVisible] = useState(true);

    const {t} = useCustomTranslation();

    const onPressButton = () => {
        setVisible(false);
    };

    return (
        visible && (
            <TouchableOpacity
                hitSlop={10}
                style={styles.tooltip}
                onPress={() => {}}>
                <Center
                    width={'100%'}
                    height={perfectSize(150)}
                    borderRadius={30}
                    style={styles.tooltipBg}>
                    <Text variant="primary" fontSize={20} style={styles.text}>{tooltip}</Text>
                    <CustomButton
                        onPress={onPressButton}
                        title={t('public.default.clear')}
                        bgColor="#25282D"
                    />
                </Center>
            </TouchableOpacity>
        )
    )};

const styles = StyleSheet.create({
    tooltip: {
        width: '100%',
        position: "absolute",
        top: 10,
        zIndex: 10,
    },
    tooltipBg: {
        backgroundColor: "#131517",
        padding: 20,
    },
    text: {
        paddingBottom: 20,
    }

});

export default TooltipModal;