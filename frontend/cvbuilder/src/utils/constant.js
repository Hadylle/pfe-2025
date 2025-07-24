export const APP_CONSTANTS = {
  colors: {
    primary: '#3b82f6',
    secondary: '#00ddb3', 
    success: '#22c55e',
    danger: '#ef4444',
    warning: '#f59e0b',
    accent: {
      blue: '#0091e3',
      blueHover: '#0c549f',
      red: '#ce0227',
      redHover: '#a01c20',
    }
  },
  
  fileTypes: {
    cv: '.pdf,.doc,.docx',
    images: '.jpg,.jpeg,.png,.gif',
    documents: '.pdf,.doc,.docx,.txt'
  },
  
  messages: {
    uploadError: 'Please upload a CV file.',
    processingError: 'Something went wrong. Please try again.',
    success: 'Operation completed successfully!',
    retry: '🔁 Retry'
  },
  
  animation: {
    duration: {
      fast: 200,
      normal: 300,
      slow: 500
    },
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
  }
};