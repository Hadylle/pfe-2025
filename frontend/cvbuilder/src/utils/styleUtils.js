import { componentStyles } from "../styles/components";
import { cn } from "./className";

export const styleUtils = {
  // Get button classes
  getButtonClasses: (variant = 'primary', size = 'md', disabled = false) => {
    return cn(
      componentStyles.button.base,
      componentStyles.button.variants[variant],
      componentStyles.button.sizes[size],
      disabled && 'opacity-50 cursor-not-allowed'
    );
  },

  // Get input classes
  getInputClasses: (state = 'default') => {
    return cn(
      componentStyles.input.base,
      state === 'error' && componentStyles.input.error,
      state === 'success' && componentStyles.input.success
    );
  },

  // Get card classes
  getCardClasses: (variant = 'base') => {
    return componentStyles.card[variant];
  },

  // Responsive breakpoint utilities
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  }
};