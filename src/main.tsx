import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import App from './App'
import './index.css'

const qc = new QueryClient({ defaultOptions: { queries: { retry: 1, staleTime: 5*60*1000 } } })

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={qc}>
        <App />
        <Toaster position="top-right" toastOptions={{
          style: { background:'#0F1A2E', color:'#F1F5F9', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'12px', fontFamily:'Inter,sans-serif', fontSize:'14px' },
          success: { iconTheme: { primary:'#10B981', secondary:'#0F1A2E' } },
          error:   { iconTheme: { primary:'#EF4444', secondary:'#0F1A2E' } },
        }}/>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
)
