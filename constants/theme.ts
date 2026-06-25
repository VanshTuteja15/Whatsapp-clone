/**
 * App-wide color tokens for light and dark themes.
 * Modelled after the WhatsApp colour palette.
 */

export const Colors = {
  light: {
    // Backgrounds
    background: '#F5F5F5',
    surface: '#FFFFFF',
    chatBg: '#ECE5DD',
    inputBg: '#F0F0F0',

    // Text
    text: '#000000',
    textSecondary: '#666666',
    textMuted: '#999999',

    // Brand
    primary: '#075E54',
    accent: '#25D366',
    accentLight: '#E0F2F1',
    bubble: '#DCF8C6',

    // UI chrome
    border: '#DDDDDD',
    icon: '#333333',
    iconMuted: '#9AA3A9',
    badge: '#25D366',
    badgeText: '#FFFFFF',
    missed: '#FF4D4D',

    // Tab bar
    tabBar: '#FFFFFF',
    tabBarBorder: '#E0E0E0',
    tabIconActive: '#075E54',
    tabIconInactive: '#9AA3A9',
  },
  dark: {
    // Backgrounds
    background: '#111B21',
    surface: '#1F2C34',
    chatBg: '#0D1418',
    inputBg: '#2A3942',

    // Text
    text: '#E9EDEF',
    textSecondary: '#8696A0',
    textMuted: '#667781',

    // Brand
    primary: '#00A884',
    accent: '#00A884',
    accentLight: '#1A2B32',
    bubble: '#005C4B',

    // UI chrome
    border: '#2A3942',
    icon: '#AEBAC1',
    iconMuted: '#667781',
    badge: '#00A884',
    badgeText: '#111B21',
    missed: '#FF4D4D',

    // Tab bar
    tabBar: '#1F2C34',
    tabBarBorder: '#2A3942',
    tabIconActive: '#00A884',
    tabIconInactive: '#8696A0',
  },
} as const;

export type ThemeColors = typeof Colors.light;
export type ColorSchemeName = 'light' | 'dark';
