import { ThemeConfig } from '../models';

export const LIGHT_THEME: ThemeConfig = {
  id: 'universe-light',
  name: 'Digital Universe Light',
  primaryColor: '#6d28d9',
  secondaryColor: '#0ea5e9',
  backgroundColor: '#f8f8fc',
  surfaceColor: '#ffffff',
  textColor: '#14141f',
  mutedTextColor: '#666a80',
  cardStyle: 'elevated',
  borderRadius: '14px',
  fontFamily: "'Inter', sans-serif"
};

export const DARK_THEME: ThemeConfig = {
  id: 'universe-dark',
  name: 'Digital Universe Dark',
  primaryColor: '#a78bfa',
  secondaryColor: '#38bdf8',
  backgroundColor: '#08080f',
  surfaceColor: '#131320',
  textColor: '#f2f2f7',
  mutedTextColor: '#9a9db3',
  cardStyle: 'glass',
  borderRadius: '14px',
  fontFamily: "'Inter', sans-serif"
};
