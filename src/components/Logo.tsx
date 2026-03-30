import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export const Logo = ({ size = 32, style }: { size?: number, textStyle?: any, style?: any }) => {
  return (
    <View style={[styles.container, style]}>
      <Image 
        source={require('../../assets/logo.png')} 
        style={{ 
          width: size * 5, 
          height: size * 1.5, 
          resizeMode: 'contain' 
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
