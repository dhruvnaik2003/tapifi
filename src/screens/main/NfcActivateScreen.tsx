import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ToastAndroid, Platform } from 'react-native';
import { theme } from '../../theme/Theme';
import NfcManager, { NfcEvents, Ndef, NfcTech } from 'react-native-nfc-manager';
import { apiClient } from '../../api/client';
import { useAuthStore } from '../../store/useAuthStore';
import { CheckCircle } from 'lucide-react-native';

export default function NfcActivateScreen({ route, navigation }: any) {
  const { uid } = route.params || {};
  const [isWriting, setIsWriting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasNfc, setHasNfc] = useState<boolean | null>(null);
  const { user, updateUser } = useAuthStore();

  useEffect(() => {
    async function checkNfc() {
      try {
        const supported = await NfcManager.isSupported();
        setHasNfc(supported);
      } catch (e) {
        setHasNfc(false);
      }
    }
    checkNfc();

    return () => {
      if (hasNfc) {
        NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
        if (isWriting) {
          NfcManager.unregisterTagEvent().catch(() => {});
        }
      }
    };
  }, [hasNfc, isWriting]);

  const writeChip = async () => {
    if (hasNfc === false) {
      // Emulator Mock Mode
      setIsWriting(true);
      setTimeout(() => {
        performActivation();
      }, 2000);
      return;
    }

    try {
      setIsWriting(true);
      await NfcManager.requestTechnology(NfcTech.Ndef);
      
      const url = `https://tapifi.in/p/${user?.id}`;
      const bytes = Ndef.encodeMessage([
        Ndef.uriRecord(url),
      ]);
      
      await NfcManager.ndefHandler.writeNdefMessage(bytes);
      await NfcManager.cancelTechnologyRequest();

      performActivation();
    } catch (ex) {
      setIsWriting(false);
      NfcManager.cancelTechnologyRequest().catch(() => {});
      Alert.alert('Error', 'NFC write failed. Make sure to hold your phone near the chip.');
    }
  };

  const cancelWrite = async () => {
    if (hasNfc !== false) {
      NfcManager.cancelTechnologyRequest().catch(() => {});
    }
    setIsWriting(false);
  };

  const performActivation = async () => {
    setIsWriting(false);
    setLoading(true);
    try {
      await apiClient.post('/api/nfc/activate', { uid });
      updateUser({ chipStatus: 'activated' });

      if (Platform.OS === 'android') {
        ToastAndroid.show('Chip activated successfully!', ToastAndroid.LONG);
      }
      navigation.navigate('Dashboard');
    } catch (error: any) {
      const msg = error.response?.data?.error || 'Activation failed';
      Alert.alert('Error', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <CheckCircle color={theme.colors.success} size={64} />
        </View>
        <Text style={styles.title}>Activate Your Chip</Text>
        <Text style={styles.subtitle}>
          Tap the verified chip once more to write your profile link to it.
        </Text>

        {isWriting ? (
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={cancelWrite}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={writeChip} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'Activating...' : 'Tap to Write'}</Text>
          </TouchableOpacity>
        )}


      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: theme.spacing.xl },
  iconCircle: {
    width: 120, height: 120, borderRadius: 60,
    backgroundColor: 'rgba(0, 200, 81, 0.1)',
    justifyContent: 'center', alignItems: 'center',
    marginBottom: theme.spacing.xl
  },
  title: { ...theme.typography.header, textAlign: 'center', marginBottom: theme.spacing.md },
  subtitle: { ...theme.typography.body, textAlign: 'center', color: theme.colors.textSecondary, marginBottom: theme.spacing.xxl, lineHeight: 24 },
  button: { backgroundColor: theme.colors.primary, paddingVertical: 16, paddingHorizontal: 32, borderRadius: 30, width: '100%', alignItems: 'center' },
  cancelButton: { backgroundColor: theme.colors.border },
  buttonText: { ...theme.typography.button },
  simulateButton: { marginTop: theme.spacing.xl, paddingVertical: 12, backgroundColor: '#333', borderRadius: 20, paddingHorizontal: 20 },
  simulateButtonText: { ...theme.typography.caption, color: '#fff', fontSize: 12 }
});
