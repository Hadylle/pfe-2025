export const componentStyles = {
  // Button variants
  button: {
    base: 'inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
    
    variants: {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm',
      secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500 border border-gray-300',
      success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 shadow-sm',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm',
      warning: 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500 shadow-sm',
      accent: 'bg-teal-500 text-white hover:bg-teal-600 focus:ring-teal-500 shadow-sm',
      outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
      ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-500',
    },
    
    sizes: {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
      xl: 'px-8 py-4 text-lg',
    }
  },

  // Input styles
  input: {
    base: 'block w-full border border-gray-300 rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors duration-200',
    error: 'border-red-300 focus:ring-red-500',
    success: 'border-green-300 focus:ring-green-500',
  },

  // Card styles
  card: {
    base: 'bg-white rounded-lg shadow-md border border-gray-200',
    elevated: 'bg-white rounded-lg shadow-lg border border-gray-200',
    flat: 'bg-white rounded-lg border border-gray-200',
  },

  // Layout containers
  layout: {
    pageContainer: 'min-h-screen flex flex-col bg-gray-50',
    contentContainer: 'flex-1 max-w-6xl mx-auto py-12 px-6 lg:px-12',
    sectionContainer: 'flex flex-col lg:flex-row gap-12 items-center justify-between',
    fullWidthContainer: 'flex-1 w-full max-w-full py-12 px-4 sm:px-6 lg:px-8 overflow-x-hidden',
  },

  // Form styles
  form: {
    group: 'space-y-4',
    label: 'block text-sm font-medium text-gray-700 mb-2',
    textarea: 'block w-full border border-gray-300 rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-vertical',
    error: 'text-red-600 text-sm mt-1',
    helper: 'text-gray-500 text-sm mt-1',
  },

  // Loading and states
  loading: {
    spinner: 'animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600',
    overlay: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50',
  },

  // Responsive utilities
  responsive: {
    twoColumn: 'flex flex-col lg:flex-row gap-8',
    threeColumn: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
    stack: 'flex flex-col space-y-4',
    stackLg: 'flex flex-col space-y-6',
  }
};