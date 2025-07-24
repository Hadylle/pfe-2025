export const validationRules = {
  required: (message = 'This field is required') => (value) => {
    return !value || value.trim() === '' ? message : null;
  },
  
  minLength: (min, message) => (value) => {
    return value && value.length < min 
      ? message || `Must be at least ${min} characters`
      : null;
  },
  
  maxLength: (max, message) => (value) => {
    return value && value.length > max
      ? message || `Must be no more than ${max} characters`
      : null;
  },
  
  email: (message = 'Please enter a valid email') => (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return value && !emailRegex.test(value) ? message : null;
  },
  
  fileRequired: (message = 'Please select a file') => (file) => {
    return !file ? message : null;
  },
  
  fileType: (allowedTypes, message) => (file) => {
    if (!file) return null;
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    return allowedTypes.includes(fileExtension) 
      ? null 
      : message || `File type must be one of: ${allowedTypes.join(', ')}`;
  }
};