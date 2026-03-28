import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useAuthStore } from '../../store/useAuthStore';
import { apiClient } from '../../api/client';
import { theme } from '../../theme/Theme';
import { Wifi, Mail, Lock, User } from 'lucide-react-native';

export default function SignUpScreen({ navigation }: any) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSignUp = async () => {
    if (!email || !password || !firstName || !lastName) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.post('/api/auth/register', { 
        email, 
        password,
        firstName,
        lastName
      });
      const { user, token } = response.data;
      await setAuth(user, token);
    } catch (error: any) {
      const errorMsg = error.response?.data?.error || error.message || 'Could not create account';
      Alert.alert('Sign Up Failed', errorMsg);
      console.log('Sign Up Error details:', error.response?.data || error.message);
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
            <Wifi color={theme.colors.primary} size={32} />
            <Text style={styles.logoText}>TAPIFI</Text>
          </View>
          <Text style={styles.subtitle}>Create your TAPIFI account</Text>

          {/* Name Layout */}
          <View style={styles.row}>
            <View style={styles.halfInputContainer}>
              <View style={styles.labelRow}><Text style={styles.label}>First Name</Text></View>
              <View style={styles.inputWrapper}>
                <User color={theme.colors.textSecondary} size={20} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Dhruv"
                  placeholderTextColor={theme.colors.textSecondary}
                  value={firstName}
                  onChangeText={setFirstName}
                />
              </View>
            </View>

            <View style={styles.halfInputContainer}>
              <View style={styles.labelRow}><Text style={styles.label}>Last Name</Text></View>
              <View style={styles.inputWrapper}>
                <User color={theme.colors.textSecondary} size={20} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Naik"
                  placeholderTextColor={theme.colors.textSecondary}
                  value={lastName}
                  onChangeText={setLastName}
                />
              </View>
            </View>
          </View>

          {/* Email */}
          <View style={styles.labelRow}><Text style={styles.label}>Email</Text></View>
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

          {/* Password */}
          <View style={styles.labelRow}><Text style={styles.label}>Password</Text></View>
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
            onPress={handleSignUp}
            disabled={loading}
          >
            <Text style={styles.buttonText}>{loading ? 'Creating...' : 'Sign Up'}</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginText}> Login</Text>
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInputContainer: {
    width: '48%',
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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#161618', 
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
    marginTop: theme.spacing.sm,
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
  loginText: {
    ...theme.typography.button,
    color: theme.colors.primary,
  },
});
