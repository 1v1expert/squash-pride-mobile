import React from 'react';
import { Modal, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Box, Text } from '@gluestack-ui/themed';
import {useCustomTranslation} from '../../../tools/hooks/useTranslation';

interface UserAgreementModalProps {
    visible: boolean;
    onClose: () => void;
}

const UserAgreementModal: React.FC<UserAgreementModalProps> = ({ visible, onClose }) => {
    const { t } = useCustomTranslation();

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}>
            <Box style={styles.modalOverlay}>
                <Box style={styles.modalContent}>
                    <Box style={styles.modalHeader}>
                        <Text bold size="lg">
                            {t('public.registrationScreen.agreement.title')}
                        </Text>
                        <TouchableOpacity onPress={onClose}>
                            <Text size="xl" color="$textDark400">✕</Text>
                        </TouchableOpacity>
                    </Box>

                    <ScrollView style={styles.modalScrollView}>
                        <Text style={styles.agreementText}>
                            {t('public.agreementText')}
                        </Text>
                    </ScrollView>
                </Box>
            </Box>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 12,
        width: '100%',
        maxHeight: '80%',
        overflow: 'hidden',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
    },
    modalScrollView: {
        padding: 16,
    },
    agreementText: {
        fontSize: 14,
        lineHeight: 20,
        color: '#333',
    },
});

export default UserAgreementModal;