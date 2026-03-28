import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { theme } from '../../theme/Theme';
import { useAuthStore } from '../../store/useAuthStore';
import { apiClient } from '../../api/client';

export default function HelpSupportScreen() {
  const { user } = useAuthStore();
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);

  const submitQuestion = async () => {
    if (!question.trim()) {
      Alert.alert('Error', 'Please enter a question');
      return;
    }

    setLoading(true);
    try {
      await apiClient.post('/api/help', { question });
      Alert.alert('Success', 'Your question has been submitted. We will get back to you soon.');
      setQuestion('');
    } catch (error) {
      Alert.alert('Error', 'Failed to submit question');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Text style={styles.title}>Help & Support</Text>
          <Text style={styles.subtitle}>How can we help you today?</Text>

          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={[styles.input, styles.disabledInput]}
            value={user?.email}
            editable={false}
          />

          <Text style={styles.label}>Your Question</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={question}
            onChangeText={setQuestion}
            multiline
            numberOfLines={6}
            placeholder="Type your question here or report an issue..."
            placeholderTextColor={theme.colors.textSecondary}
            textAlignVertical="top"
          />

          <TouchableOpacity style={styles.button} onPress={submitQuestion} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'Submitting...' : 'Submit Question'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  scrollContent: { padding: theme.spacing.lg, flexGrow: 1, justifyContent: 'center' },
  card: {
    backgroundColor: theme.colors.card, borderRadius: theme.borders.radius,
    padding: theme.spacing.xl, elevation: 4,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84,
  },
  title: { ...theme.typography.header, marginBottom: theme.spacing.sm, textAlign: 'center' },
  subtitle: { ...theme.typography.body, marginBottom: theme.spacing.xl, textAlign: 'center', color: theme.colors.textSecondary },
  label: { ...theme.typography.caption, color: theme.colors.textSecondary, marginBottom: 8 },
  input: {
    backgroundColor: theme.colors.background, 
    borderWidth: 1, borderColor: theme.colors.border, borderRadius: 8,
    padding: 12, marginBottom: 20, ...theme.typography.body
  },
  disabledInput: { color: theme.colors.textSecondary, opacity: 0.7 },
  textArea: { minHeight: 120 },
  button: { backgroundColor: theme.colors.primary, padding: 16, borderRadius: 8, alignItems: 'center' },
  buttonText: { ...theme.typography.button }
});
