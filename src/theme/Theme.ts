export const colors = {
  background: '#0D0D0F', // Deepest infinite black
  surface: '#121214',    // Elevated black
  card: '#18181B',       // Glassy raised black
  cardHover: '#222226',  // Interactive
  primary: '#ff0000',    // Exact brand red
  primaryGlow: 'rgba(255, 0, 0, 0.4)', // Outer neon glare
  text: '#FFFFFF',
  textSecondary: '#8B8B93', // Cool metallic gray
  border: '#27272A',     // Subtle metallic stroke
  error: '#FF3B30',
  success: '#34C759',
};

export const typography = {
  header: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 24,
    color: colors.text,
  },
  subheader: {
    fontFamily: 'SpaceGrotesk_500Medium',
    fontSize: 18,
    color: colors.text,
  },
  body: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: colors.textSecondary,
  },
  button: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: colors.text,
  },
  caption: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: colors.textSecondary,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borders = {
  radius: 12,
  radiusLg: 24, // Pill structure
  radiusXl: 32, // Giant hero curves
  width: 1,
};

export const theme = {
  colors,
  typography,
  spacing,
  borders,
};
