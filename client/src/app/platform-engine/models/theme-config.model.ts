export type CardStyle = 'elevated' | 'flat' | 'outlined' | 'glass';

export interface ThemeConfig {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  surfaceColor: string;
  textColor: string;
  mutedTextColor: string;
  cardStyle: CardStyle;
  borderRadius: string;
  fontFamily: string;
}
