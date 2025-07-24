/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',    // blue-500 hex
        secondary: '#8B5CF6',  // violet-500 hex
        accent: '#10B981',     // emerald-500 hex
        background: '#F3F4F6', // gray-100 hex
        text: '#1F2937'        // gray-800 hex
      }
    },
  },
  safelist: [
    // Text colors
    'text-blue-600', 'text-gray-400', 'text-blue-500', 'text-gray-800', 'text-gray-300',
    'text-indigo-700', 'text-slate-500', 'text-indigo-600', 'text-slate-800', 'text-slate-300',
    'text-purple-600', 'text-amber-500', 'text-purple-500',
    'text-teal-600', 'text-cyan-400', 'text-teal-500',
    'text-stone-700', 'text-stone-400', 'text-stone-600',
    'text-fuchsia-600', 'text-pink-400', 'text-fuchsia-500',
    'text-emerald-600', 'text-gray-500', 'text-emerald-500',
    'text-red-600', 'text-orange-500', 'text-red-500',
    'text-sky-600', 'text-blue-400', 'text-sky-500',
    'text-violet-700', 'text-purple-500', 'text-violet-600',

    // Background colors
    'bg-white', 'bg-slate-50', 'bg-zinc-50',

    // Border colors
    'border-gray-300', 'border-slate-300', 'border-zinc-300', 'border-pink-300', 'border-neutral-300',
  ],
  plugins: [],
};
