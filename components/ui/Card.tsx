import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { useTheme } from '@/utils/ThemeContext';

interface CardProps extends ViewProps {
  variant?: 'elevated' | 'outlined' | 'filled';
  radius?: number;
}

export function Card({ 
  children, 
  style, 
  variant = 'elevated',
  radius = 12,
  ...props 
}: CardProps) {
  const { colors, isDark } = useTheme();
  
  const getCardStyle = () => {
    switch(variant) {
      case 'outlined':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: colors.border,
          elevation: 0,
          shadowOpacity: 0,
        };
      case 'filled':
        return {
          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
          borderWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        };
      case 'elevated':
      default:
        return {
          backgroundColor: colors.card,
          borderWidth: 0,
          elevation: isDark ? 4 : 2,
          shadowOpacity: 0.1,
        };
    }
  };

  return (
    <View 
      style={[
        styles.card, 
        getCardStyle(), 
        { borderRadius: radius },
        style
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
});