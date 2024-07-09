import {Box, Center, Modal, Text, VStack} from "@gluestack-ui/themed";
import SafeAreaLayout from "../SafeAreaLayout";
import {Image, StyleSheet, TouchableOpacity} from "react-native";
import {images} from "../../../assets";
import CustomButton from "../CustomButton";
import React, {useState} from "react";
import {perfectSize} from "../../../tools/helpers/perfectSize";
import Indicator from "../Indicator";

const TooltipModal = () => {
    const [visible, setVisible] = useState(true);

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
                    bgColor="#131517"
                    style={styles.nextIconBg}>
                    <Indicator
                        items={[{title:'',done:false},{title:'',done:false},{title:'',done:false},{title:'',done:false}]}
                        selected={1}
                        length={4}
                        space="4xl"
                    />
                    <Text variant="primary" fontSize={30}>Tooltip</Text>
                    <CustomButton
                        title="Понятно"
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
    },
    nextIconBg: {
        // backgroundColor: '#f7ab39',
        backgroundColor: 'black',

    },

});

export default TooltipModal;