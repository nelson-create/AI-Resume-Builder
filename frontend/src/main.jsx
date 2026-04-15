import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ResumeProvider } from './context/ResumeContext.jsx'

console.log('main.jsx loading...');

try {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <ResumeProvider>
        <App />
      </ResumeProvider>
    </StrictMode>,
  );
  console.log('App rendered successfully');
} catch (error) {
  console.error('Failed to render app:', error);
  document.getElementById('root').innerHTML = `<div style="padding: 20px; color: red;">Error loading app: ${error.message}</div>`;
}