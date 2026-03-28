import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import VerifyEmailScreen from '../screens/auth/VerifyEmailScreen';
import NfcVerifyScreen from '../screens/main/NfcVerifyScreen';
import NfcActivateScreen from '../screens/main/NfcActivateScreen';
import { useAuthStore } from '../store/useAuthStore';
import { View, ActivityIndicator } from 'react-native';
import { theme } from '../theme/Theme';

const Stack = createNativeStackNavigator();

function VerificationStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: theme.colors.background } }}>
      <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
    </Stack.Navigator>
  );
}

function NfcSetupStack() {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: theme.colors.background }, headerTintColor: theme.colors.text, contentStyle: { backgroundColor: theme.colors.background }, headerShadowVisible: false }}>
      <Stack.Screen name="NfcVerify" component={NfcVerifyScreen} options={{ title: 'Verify NFC' }} />
      <Stack.Screen name="NfcActivate" component={NfcActivateScreen} options={{ title: 'Activate NFC' }} />
    </Stack.Navigator>
  );
}

export default function RootNavigator() {
  const { user, isAuthenticated, initializeAuth } = useAuthStore();
  const [isReady, setIsReady] = React.useState(false);

  useEffect(() => {
    const init = async () => {
      await initializeAuth();
      setIsReady(true);
    };
    init();
  }, [initializeAuth]);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {!isAuthenticated ? (
         <AuthNavigator />
      ) : !user?.emailVerified ? (
         <VerificationStack />
      ) : user?.chipStatus !== 'activated' ? (
         <NfcSetupStack />
      ) : (
         <MainNavigator />
      )}
    </NavigationContainer>
  );
}
