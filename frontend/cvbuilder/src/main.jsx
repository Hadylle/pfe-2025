import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProgressProvider } from './components/ProgressContext';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   
      <QueryClientProvider client={queryClient}>
        
       <ProgressProvider>
        <App />
      </ProgressProvider>
    </QueryClientProvider>
   
  </React.StrictMode>
)