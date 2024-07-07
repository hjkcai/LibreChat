import 'regenerator-runtime/runtime';
import { createRoot } from 'react-dom/client';
import App from './App';
import './style.css';
import './mobile.css';
import 'highlight.js/styles/nord.css'
import { ApiErrorBoundaryProvider } from './hooks/ApiErrorBoundaryContext';

const container = document.getElementById('root');
const root = createRoot(container);
navigator.virtualKeyboard.overlaysContent = true;

root.render(
  <ApiErrorBoundaryProvider>
    <App />
  </ApiErrorBoundaryProvider>,
);
