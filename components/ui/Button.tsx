import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  TouchableOpacityProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { useTheme } from '@/utils/ThemeContext';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'filled' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  textStyle?: StyleProp<TextStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
}

export function Button({ 
  title, 
  variant = 'filled', 
  size = 'medium',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  textStyle,
  buttonStyle,
  ...props 
}: ButtonProps) {
  const { colors } = useTheme();
  
  const getVariantStyles = (): ViewStyle => {
    switch(variant) {
      case 'outlined':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: colors.primary,
        };
      case 'text':
        return {
          backgroundColor: 'transparent',
          borderWidth: 0,
          paddingHorizontal: 8,
        };
      case 'filled':
      default:
        return {
          backgroundColor: colors.primary,
          borderWidth: 0,
        };
    }
  };
  
  const getSizeStyles = (): ViewStyle => {
    switch(size) {
      case 'small':
        return {
          paddingVertical: 6,
          paddingHorizontal: 12,
          borderRadius: 6,
        };
      case 'large':
        return {
          paddingVertical: 14,
          paddingHorizontal: 24,
          borderRadius: 12,
        };
      case 'medium':
      default:
        return {
          paddingVertical: 10,
          paddingHorizontal: 16,
          borderRadius: 8,
        };
    }
  };
  
  const getTextStyles = (): TextStyle => {
    const baseTextStyle: TextStyle = {
      fontSize: size === 'small' ? 14 : size === 'large' ? 18 : 16,
      fontWeight: '600',
    };
    
    switch(variant) {
      case 'outlined':
      case 'text':
        return {
          ...baseTextStyle,
          color: colors.primary,
        };
      case 'filled':
      default:
        return {
          ...baseTextStyle,
          color: '#FFFFFF',
        };
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getVariantStyles(),
        getSizeStyles(),
        disabled && styles.disabled,
        buttonStyle,
      ]}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'filled' ? '#FFFFFF' : colors.primary} 
          size="small" 
        />
      ) : (
        <>
          {leftIcon && <Text style={styles.iconLeft}>{leftIcon}</Text>}
          <Text style={[getTextStyles(), textStyle]}>{title}</Text>
          {rightIcon && <Text style={styles.iconRight}>{rightIcon}</Text>}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.6,
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});