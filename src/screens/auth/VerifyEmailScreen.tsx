import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput, ToastAndroid, Platform } from 'react-native';
import { useAuthStore } from '../../store/useAuthStore';
import { apiClient } from '../../api/client';
import { theme } from '../../theme/Theme';

export default function VerifyEmailScreen() {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const { user, logout, updateUser } = useAuthStore();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(c => c - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  const verifyOtp = async () => {
    if (!otp || otp.length < 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit code');
      return;
    }
    
    setLoading(true);
    try {
      const response = await apiClient.post('/api/auth/verify-otp', {
        email: user?.email,
        otp
      });
      // Verification successful, update local user to unlock app!
      // Verification successful, update local user to unlock app!
      if (Platform.OS === 'android') {
        ToastAndroid.show('Email verified successfully!', ToastAndroid.LONG);
      }
      updateUser({ emailVerified: true });
    } catch (error: any) {
      const msg = error.response?.data?.error || 'Invalid or expired verification code';
      Alert.alert('Verification Failed', msg);
    } finally {
      setLoading(false);
    }
  };

  const resendLink = async () => {
    if (cooldown > 0) return;
    setLoading(true);
    try {
      await apiClient.post('/api/auth/resend-verification', { email: user?.email });
      setCooldown(60);
      if (Platform.OS === 'android') {
         ToastAndroid.show('A new verification code has been sent to your email.', ToastAndroid.LONG);
      } else {
         Alert.alert('Sent', 'A new verification code has been sent to your email.');
      }
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.error || 'Could not send code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Verify Your Email</Text>
        <Text style={styles.subtitle}>
          We sent a 6-digit verification code to <Text style={styles.bold}>{user?.email}</Text>.
          Please check your backend logs and enter it below.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter 6-digit code"
          placeholderTextColor={theme.colors.textSecondary}
          keyboardType="number-pad"
          maxLength={6}
          value={otp}
          onChangeText={setOtp}
          textAlign="center"
        />

        <TouchableOpacity 
          style={styles.button} 
          onPress={verifyOtp}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Verifying...' : 'Verify Code'}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.outlineButton, cooldown > 0 && styles.disabledButton]} 
          onPress={resendLink}
          disabled={cooldown > 0 || loading}
        >
          <Text style={styles.outlineButtonText}>
            {cooldown > 0 ? `Resend Code in ${cooldown}s` : 'Resend Code'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.linkButton} 
          onPress={async () => {
             console.log('[Logout] Triggered from VerifyEmailScreen');
             try {
                await logout();
             } catch (e) {
                console.error('Logout error:', e);
             }
          }}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  card: {
    backgroundColor: theme.colors.card,
    padding: theme.spacing.xl,
    borderRadius: theme.borders.radius,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    ...theme.typography.header,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    ...theme.typography.body,
    marginBottom: theme.spacing.xl,
    textAlign: 'center',
    lineHeight: 22,
  },
  bold: {
    ...theme.typography.button,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borders.radius,
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  buttonText: {
    ...theme.typography.button,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borders.radius,
    alignItems: 'center',
  },
  disabledButton: {
    borderColor: theme.colors.border,
  },
  outlineButtonText: {
    ...theme.typography.button,
    color: theme.colors.primary,
  },
  linkButton: {
    marginTop: theme.spacing.xl,
    alignItems: 'center',
  },
  logoutText: {
    ...theme.typography.body,
    color: theme.colors.error,
  },
  input: {
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borders.radius,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    ...theme.typography.header,
    color: theme.colors.text,
    letterSpacing: 4,
  },
});
