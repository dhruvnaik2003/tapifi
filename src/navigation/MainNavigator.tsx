import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/main/DashboardScreen';
import ManageLinksScreen from '../screens/main/ManageLinksScreen';
import HelpSupportScreen from '../screens/main/HelpSupportScreen';
import { theme } from '../theme/Theme';
import { Home, Link as LinkIcon, HelpCircle } from 'lucide-react-native';

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.background },
        headerTintColor: theme.colors.text,
        headerTitleStyle: { fontFamily: theme.typography.header.fontFamily },
        tabBarStyle: { 
          backgroundColor: theme.colors.card, 
          borderTopColor: theme.colors.border,
          paddingBottom: 5,
          height: 60,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarLabelStyle: { fontFamily: theme.typography.caption.fontFamily },
      }}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tab.Screen 
        name="Manage Links" 
        component={ManageLinksScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <LinkIcon color={color} size={size} />,
        }}
      />
      <Tab.Screen 
        name="Help & Support" 
        component={HelpSupportScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <HelpCircle color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}
