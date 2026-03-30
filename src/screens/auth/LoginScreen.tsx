import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useAuthStore } from '../../store/useAuthStore';
import { apiClient } from '../../api/client';
import { theme } from '../../theme/Theme';
import { Wifi, Mail, Lock } from 'lucide-react-native';
import { Logo } from '../../components/Logo';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      // Expected Vercel API response: { user, token }
      const response = await apiClient.post('/api/auth/login', { email, password });
      const { user, token } = response.data;
      await setAuth(user, token);
    } catch (error: any) {
      const errorMsg = error.response?.data?.error || error.message || 'Invalid credentials';
      Alert.alert('Login Failed', errorMsg);
      console.log('Login Error details:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <View style={styles.headerArea}>
            <Logo size={36} />
          </View>
          <Text style={styles.subtitle}>Welcome back to TAPIFI</Text>

          {/* Email Label */}
          <View style={styles.labelRow}>
            <Text style={styles.label}>Email</Text>
          </View>
          {/* Email Input with Icon */}
          <View style={styles.inputWrapper}>
            <Mail color={theme.colors.textSecondary} size={20} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="you@example.com"
              placeholderTextColor={theme.colors.textSecondary}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Password Label Row */}
          <View style={styles.labelRow}>
            <Text style={styles.label}>Password</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          {/* Password Input with Icon */}
          <View style={styles.inputWrapper}>
            <Lock color={theme.colors.textSecondary} size={20} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor={theme.colors.textSecondary}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity 
            style={styles.button} 
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Login'}</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signUpText}> Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  card: {
    backgroundColor: theme.colors.card,
    padding: theme.spacing.xl,
    borderRadius: theme.borders.radius,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  headerArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  logoText: {
    ...theme.typography.header,
    color: theme.colors.primary,
    marginLeft: theme.spacing.sm,
  },
  subtitle: {
    ...theme.typography.body,
    marginBottom: theme.spacing.xl,
    textAlign: 'center',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    ...theme.typography.button,
    fontSize: 14,
  },
  forgotText: {
    ...theme.typography.body,
    fontSize: 12,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#161618', // slightly darker than the card
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borders.radius,
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  inputIcon: {
    marginRight: theme.spacing.sm,
  },
  input: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    ...theme.typography.body,
    color: theme.colors.text,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borders.radius,
    alignItems: 'center',
    marginTop: theme.spacing.md,
  },
  buttonText: {
    ...theme.typography.button,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.spacing.xl,
  },
  footerText: {
    ...theme.typography.body,
  },
  signUpText: {
    ...theme.typography.button,
    color: theme.colors.primary,
  },
});
