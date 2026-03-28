import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Image, ScrollView, Modal, Alert, Linking, Animated, Dimensions, ToastAndroid, Platform } from 'react-native';
import { useAuthStore } from '../../store/useAuthStore';
import { theme } from '../../theme/Theme';
import { QrCode, LogOut, X, Edit2, ChevronRight, Share, Globe } from 'lucide-react-native';
import QRCode from 'react-native-qrcode-svg';
import { apiClient } from '../../api/client';
import * as ClipboardExpo from 'expo-clipboard';
import * as ImagePicker from 'expo-image-picker';

// Premium bouncy button component
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
const PremiumButton = ({ onPress, style, children, activeOpacity = 0.85 }: any) => {
  const scale = useRef(new Animated.Value(1)).current;
  const onPressIn = () => Animated.spring(scale, { toValue: 0.96, useNativeDriver: true, friction: 5 }).start();
  const onPressOut = () => Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 5 }).start();
  
  return (
    <AnimatedTouchable 
      activeOpacity={activeOpacity} 
      onPressIn={onPressIn} 
      onPressOut={onPressOut} 
      onPress={onPress}
      style={[style, { transform: [{ scale }] }]}
    >
      {children}
    </AnimatedTouchable>
  );
};

// Premium custom bouncy switch
const CustomSwitch = ({ value, onValueChange }: any) => {
  const animValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(animValue, {
      toValue: value ? 1 : 0,
      useNativeDriver: false,
      friction: 6,
      tension: 60,
    }).start();
  }, [value]);

  const backgroundColor = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.border, theme.colors.primary]
  });

  const translateX = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22] // Full width (50) - thumb width (26) - padding right
  });

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={() => onValueChange(!value)}>
      <Animated.View style={[styles.customSwitchTrack, { backgroundColor }]}>
        <Animated.View style={[styles.customSwitchThumb, { transform: [{ translateX }] }]} />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default function DashboardScreen({ navigation }: any) {
  const { user, logout, updateUser } = useAuthStore();
  const [qrVisible, setQrVisible] = useState(false);

  const toggleProfileActive = async (value: boolean) => {
    updateUser({ isProfileActive: value });
    try {
      await apiClient.put('/api/users/profile', { isProfileActive: value });
    } catch (error) {
      updateUser({ isProfileActive: !value });
      Alert.alert('Error', 'Failed to update profile visibility');
    }
  };

  const switchActiveProfile = async (type: 'personal' | 'professional') => {
    updateUser({ activeProfile: type });
    try {
      await apiClient.put('/api/users/profile', { activeProfile: type });
    } catch (error) {
      updateUser({ activeProfile: user?.activeProfile });
      Alert.alert('Error', 'Failed to change active profile');
    }
  };

  const profileUrl = `https://tapifi.in/p/${user?.id || 'demo'}`;

  const copyLink = async () => {
    await ClipboardExpo.setStringAsync(profileUrl);
    if (Platform.OS === 'android') {
      ToastAndroid.show('Profile link copied to clipboard.', ToastAndroid.LONG);
    } else {
      Alert.alert('Copied!', 'Profile link copied to clipboard.');
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) { uploadImage(result.assets[0].uri); }
  };

  const uploadImage = async (uri: string) => {
    try {
      const formData = new FormData();
      formData.append('file', { uri, name: 'profile.jpg', type: 'image/jpeg' } as any);
      const response = await apiClient.post('/api/users/profile/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      updateUser({ pfpUrl: response.data.pfpUrl });
    } catch (error) {
      Alert.alert('Error', 'Failed to upload image');
    }
  };

  return (
    <View style={styles.container}>
      {/* Absolute Ambient Background Glares */}
      <View style={styles.ambientGlowTop} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>DASHBOARD</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* HERO SECTION */}
        <View style={styles.heroContainer}>
          <TouchableOpacity onPress={pickImage} activeOpacity={0.8} style={styles.heroAvatarWrapper}>
            <View style={styles.heroAvatarRing}>
              {user?.pfpUrl ? (
                <Image source={{ uri: user.pfpUrl }} style={styles.heroAvatar} />
              ) : (
                <View style={styles.heroAvatarPlaceholder}>
                  <Text style={styles.heroAvatarText}>{user?.firstName?.[0] || 'T'}</Text>
                </View>
              )}
            </View>
            <View style={styles.editBadge}>
              <Edit2 color="#FFF" size={12} />
            </View>
          </TouchableOpacity>
          <Text style={styles.heroName}>{user?.firstName} {user?.lastName}</Text>
          <Text style={styles.heroEmail}>{user?.email}</Text>
        </View>

        {/* QUICK ACTIONS ROW */}
        <View style={styles.quickActionsRow}>
          <PremiumButton onPress={() => Linking.openURL(profileUrl)} style={styles.quickActionBox}>
            <View style={styles.quickActionIconBg}>
              <Globe color="#FFF" size={24} />
            </View>
            <Text style={styles.quickActionText}>Live Profile</Text>
          </PremiumButton>

          <PremiumButton onPress={() => setQrVisible(true)} style={styles.quickActionBox}>
            <View style={[styles.quickActionIconBg, { backgroundColor: theme.colors.primary }]}><QrCode color="#FFF" size={24} /></View>
            <Text style={styles.quickActionText}>Show QR</Text>
          </PremiumButton>

          <PremiumButton onPress={copyLink} style={styles.quickActionBox}>
            <View style={styles.quickActionIconBg}><Share color="#FFF" size={24} /></View>
            <Text style={styles.quickActionText}>Share</Text>
          </PremiumButton>
        </View>

        {/* PREMIUM SETTINGS GLASS CARDS */}
        <View style={[styles.glassCard, !user?.isProfileActive && { borderColor: theme.colors.error, backgroundColor: 'rgba(255,59,48,0.08)' }]}>
          <View style={styles.settingRow}>
            <View style={{flex: 1}}>
              <Text style={styles.settingTitle}>
                {user?.isProfileActive ? 'Public Profile Enabled' : 'Public Profile Disabled'}
              </Text>
              <Text style={styles.settingDesc}>Make your web profile visible to others.</Text>
            </View>
            <CustomSwitch
              onValueChange={toggleProfileActive}
              value={!!user?.isProfileActive}
            />
          </View>
        </View>

        <View style={styles.glassCard}>
          <Text style={styles.settingTitle}>Active Smart-Chip Profile</Text>
          <Text style={[styles.settingDesc, {marginBottom: 16}]}>Choose which set of links your chip transmits when tapped.</Text>
          
          <View style={styles.segmentedControl}>
            <PremiumButton 
              onPress={() => switchActiveProfile('personal')}
              style={[styles.segment, user?.activeProfile === 'personal' && styles.activeSegment]}
            >
              <Text style={[styles.segmentText, user?.activeProfile === 'personal' && styles.activeSegmentText]}>Personal</Text>
            </PremiumButton>
            <PremiumButton 
              onPress={() => switchActiveProfile('professional')}
              style={[styles.segment, user?.activeProfile === 'professional' && styles.activeSegment]}
            >
              <Text style={[styles.segmentText, user?.activeProfile === 'professional' && styles.activeSegmentText]}>Professional</Text>
            </PremiumButton>
          </View>
        </View>

        {/* LINK MANAGEMENT ACCOMODATIONS */}
        <Text style={styles.sectionHeader}>Manage Connectivity</Text>
        <View style={styles.glassCard}>
          <PremiumButton onPress={() => navigation.navigate('Manage Links')} style={styles.redCTAButton}>
            <Text style={styles.redCTAButtonText} numberOfLines={1} adjustsFontSizeToFit>Add, Edit or Delete Links</Text>
            <ChevronRight color="#FFF" size={20} />
          </PremiumButton>
          <Text style={[styles.settingDesc, {textAlign: 'center', marginTop: 12}]}>Customize platforms like Instagram, Custom URLs, and Phone Numbers.</Text>
        </View>
        
        {/* LOGOUT */}
        <PremiumButton onPress={logout} style={styles.logoutButton}>
          <LogOut color={theme.colors.error} size={20} />
          <Text style={styles.logoutText}>LOGOUT</Text>
        </PremiumButton>
      </ScrollView>

      {/* Modern QR Modal */}
      <Modal visible={qrVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <Animated.View style={styles.qrGlassCard}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setQrVisible(false)}>
              <X color={theme.colors.textSecondary} size={28} />
            </TouchableOpacity>
            <Text style={styles.qrTitle}>QR CODE</Text>
            <View style={styles.qrContainer}>
              <QRCode value={profileUrl} size={220} color="#000" backgroundColor="transparent" />
            </View>
            <Text style={styles.qrHint}>Any smartphone can read this using camera/QR code scanner</Text>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, position: 'relative' },
  ambientGlowTop: {
    position: 'absolute', top: -100, left: -50, width: Dimensions.get('window').width + 100, height: 350,
    backgroundColor: theme.colors.primary, opacity: 0.12, borderRadius: 300, shadowColor: theme.colors.primary, 
    shadowRadius: 100, shadowOpacity: 1, zIndex: 0
  },
  
  header: { alignItems: 'center', paddingTop: 60, paddingBottom: 10, zIndex: 10 },
  headerTitle: { ...theme.typography.header, fontSize: 26, letterSpacing: 3, color: theme.colors.primary, opacity: 0.9, textAlign: 'center' },
  
  scrollContent: { paddingHorizontal: theme.spacing.lg, paddingBottom: 120, zIndex: 10 },
  
  /* Hero Overhaul */
  heroContainer: { alignItems: 'center', marginTop: 10, marginBottom: 32 },
  heroAvatarWrapper: { position: 'relative', marginBottom: 16 },
  heroAvatarRing: {
    padding: 4, borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)'
  },
  heroAvatar: { width: 110, height: 110, borderRadius: 55 },
  heroAvatarPlaceholder: { width: 110, height: 110, borderRadius: 55, backgroundColor: theme.colors.cardHover, justifyContent: 'center', alignItems: 'center' },
  heroAvatarText: { ...theme.typography.header, fontSize: 40, color: theme.colors.text },
  editBadge: { position: 'absolute', bottom: 4, right: 4, backgroundColor: theme.colors.primary, borderRadius: 16, padding: 8, borderWidth: 3, borderColor: theme.colors.background },
  heroName: { ...theme.typography.header, fontSize: 28, letterSpacing: -0.5, marginBottom: 4 },
  heroEmail: { ...theme.typography.body, color: theme.colors.textSecondary, fontSize: 15 },

  /* Quick Actions */
  quickActionsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 32, paddingHorizontal: 10 },
  quickActionBox: { alignItems: 'center', flex: 1 },
  quickActionIconBg: { width: 64, height: 64, borderRadius: 32, backgroundColor: theme.colors.card, justifyContent: 'center', alignItems: 'center', marginBottom: 10, borderWidth: 1, borderColor: theme.colors.border },
  quickActionText: { ...theme.typography.button, fontSize: 13, color: theme.colors.textSecondary },

  /* Glass Cards */
  glassCard: { backgroundColor: theme.colors.card, borderRadius: theme.borders.radiusLg, padding: theme.spacing.xl, marginBottom: theme.spacing.lg, borderWidth: 1, borderColor: theme.colors.border },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  settingTitle: { ...theme.typography.header, fontSize: 18, marginBottom: 4 },
  settingDesc: { ...theme.typography.body, fontSize: 14, color: theme.colors.textSecondary, lineHeight: 20 },
  
  /* Custom Switch */
  customSwitchTrack: { width: 50, height: 28, borderRadius: 16, justifyContent: 'center' },
  customSwitchThumb: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#FFF', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 3, elevation: 4 },
  
  sectionHeader: { ...theme.typography.subheader, fontSize: 16, color: theme.colors.textSecondary, marginLeft: 8, marginBottom: 12, marginTop: 10 },

  /* Interactive Segmented Control */
  segmentedControl: { flexDirection: 'row', backgroundColor: '#0D0D0F', borderRadius: 20, overflow: 'hidden', padding: 4, borderWidth: 1, borderColor: theme.colors.border },
  segment: { flex: 1, paddingVertical: 14, alignItems: 'center', borderRadius: 16 },
  activeSegment: { backgroundColor: theme.colors.primary, shadowColor: theme.colors.primary, shadowOffset: {width:0, height:4}, shadowOpacity: 0.3, shadowRadius: 8 },
  segmentText: { ...theme.typography.button, color: theme.colors.textSecondary, fontSize: 15 },
  activeSegmentText: { color: '#FFF' },

  /* Red Premium Button */
  redCTAButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.primary, paddingVertical: 18, borderRadius: 20, shadowColor: theme.colors.primary, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 12, paddingHorizontal: 16 },
  redCTAButtonText: { ...theme.typography.button, color: '#FFF', fontSize: 15, marginRight: 8, flexShrink: 1 },

  logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10, paddingVertical: 20 },
  logoutText: { ...theme.typography.button, color: theme.colors.error, fontSize: 16, marginLeft: 8 },

  /* Elite Modal */
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center' },
  qrGlassCard: { backgroundColor: '#161618', borderRadius: 40, padding: 40, alignItems: 'center', width: '90%', borderWidth: 1, borderColor: '#2C2C2E' },
  closeButton: { position: 'absolute', top: 24, right: 24, padding: 8, zIndex: 10 },
  qrTitle: { ...theme.typography.header, fontSize: 24, marginBottom: 30 },
  qrContainer: { padding: 16, backgroundColor: '#FFF', borderRadius: 24, marginBottom: 30 },
  qrHint: { ...theme.typography.caption, color: theme.colors.textSecondary, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1, textAlign: 'center' }
});
