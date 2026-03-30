import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Linking, Modal, ToastAndroid, Platform } from 'react-native';
import { theme } from '../../theme/Theme';
import NfcManager, { NfcEvents } from 'react-native-nfc-manager';
import { apiClient } from '../../api/client';
import { useAuthStore } from '../../store/useAuthStore';
import { Radio } from 'lucide-react-native';
import * as ClipboardExpo from 'expo-clipboard';

export default function NfcVerifyScreen({ navigation }: any) {
  const [isScanning, setIsScanning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [hasNfc, setHasNfc] = useState<boolean | null>(null);
  const { updateUser } = useAuthStore();

  useEffect(() => {
    async function checkNfc() {
      try {
        const supported = await NfcManager.isSupported();
        setHasNfc(supported);
        if (supported) {
          NfcManager.start().catch((err) => {
            console.warn('NFC Manager could not start', err);
          });
        }
      } catch (e) {
        setHasNfc(false);
      }
    }
    checkNfc();

    return () => {
      if (hasNfc) {
        NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
        if (isScanning) {
          NfcManager.unregisterTagEvent().catch(() => {});
        }
      }
    };
  }, [hasNfc, isScanning]);

  const scanChip = async () => {
    try {
      setIsScanning(true);
      await NfcManager.registerTagEvent();
      NfcManager.setEventListener(NfcEvents.DiscoverTag, async (tag: any) => {
        NfcManager.unregisterTagEvent().catch(() => {});
        setIsScanning(false);
        if (tag.id) {
          verifyChip(tag.id);
        } else {
          Alert.alert('Error', 'Could not read chip ID');
        }
      });
    } catch (ex) {
      setIsScanning(false);
      Alert.alert('Error', 'NFC scan failed');
      NfcManager.unregisterTagEvent().catch(() => {});
    }
  };

  const cancelScan = async () => {
    if (hasNfc !== false) {
      NfcManager.unregisterTagEvent().catch(() => {});
    }
    setIsScanning(false);
  };

  const verifyChip = async (uid: string) => {
    setLoading(true);
    try {
      await apiClient.post('/api/nfc/verify', { uid });
      
      updateUser({ chipStatus: 'verified', scannedChipId: uid });
      if (Platform.OS === 'android') {
        ToastAndroid.show('Chip verified! Ready for activation.', ToastAndroid.LONG);
      }
      // Navigate to activation screen
      navigation.navigate('NfcActivate', { uid });
    } catch (error: any) {
      const msg = error.response?.data?.error || 'Verification failed';
      if (error.response?.status === 400 && msg.includes('recognized')) {
        Alert.alert(
          'Unregistered Test Chip', 
          `Raw Phone UID: ${uid}\n\nThis physical card hasn't been recognized yet.\n\nI just copied this EXACT raw UID to your clipboard! Delete your old Prisma Studio row, paste this exact string in, and save it.`
        );
        ClipboardExpo.setStringAsync(uid);
      } else {
        Alert.alert('Error', msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Radio color={theme.colors.primary} size={64} />
        </View>
        <Text style={styles.title}>Verify Your Tapifi Chip</Text>
        <Text style={styles.subtitle}>
          Tap your NFC chip against the back of your phone to verify its authenticity.
        </Text>

        {isScanning ? (
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={cancelScan}>
            <Text style={styles.buttonText}>Cancel Scan</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={scanChip} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'Verifying...' : 'Scan Chip'}</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity 
          style={styles.supportButton} 
          onPress={() => setShowSupport(true)}
        >
          <Text style={styles.supportButtonText}>Help & Support</Text>
        </TouchableOpacity>

        {/* Support Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={showSupport}
          onRequestClose={() => setShowSupport(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Contact Support</Text>
              
              <TouchableOpacity style={styles.contactItem} onPress={() => Linking.openURL('mailto:support@tapifi.in')}>
                <Text style={styles.contactLabel}>Email: </Text>
                <Text style={styles.contactLink}>support@tapifi.in</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.contactItem} onPress={() => Linking.openURL('tel:+918618686152')}>
                <Text style={styles.contactLabel}>Mobile: </Text>
                <Text style={styles.contactLink}>+91 8618686152</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalCloseButton} onPress={() => setShowSupport(false)}>
                <Text style={styles.modalCloseButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: theme.spacing.xl },
  iconCircle: {
    width: 120, height: 120, borderRadius: 60,
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    justifyContent: 'center', alignItems: 'center',
    marginBottom: theme.spacing.xl
  },
  title: { ...theme.typography.header, textAlign: 'center', marginBottom: theme.spacing.md },
  subtitle: { ...theme.typography.body, textAlign: 'center', color: theme.colors.textSecondary, marginBottom: theme.spacing.xxl, lineHeight: 24 },
  button: { backgroundColor: theme.colors.primary, paddingVertical: 16, paddingHorizontal: 32, borderRadius: 30, width: '100%', alignItems: 'center' },
  cancelButton: { backgroundColor: theme.colors.border },
  buttonText: { ...theme.typography.button },
  supportButton: { marginTop: theme.spacing.xl, paddingVertical: 12 },
  supportButtonText: { ...theme.typography.caption, color: theme.colors.textSecondary, textDecorationLine: 'underline' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: theme.colors.surface, padding: theme.spacing.xl, borderRadius: 20, width: '85%', alignItems: 'center' },
  modalTitle: { ...theme.typography.header, fontSize: 20, marginBottom: theme.spacing.xl },
  contactItem: { flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.md, paddingVertical: 8, width: '100%' },
  contactLabel: { ...theme.typography.body, color: theme.colors.textSecondary },
  contactLink: { ...theme.typography.body, color: theme.colors.primary, fontWeight: 'bold' },
  modalCloseButton: { marginTop: theme.spacing.xl, paddingVertical: 12, width: '100%', alignItems: 'center', backgroundColor: theme.colors.border, borderRadius: 20 },
  modalCloseButtonText: { ...theme.typography.button, color: theme.colors.text }
});
