import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import 'modern-normalize';
import { BrowserRouter } from 'react-router-dom';
import { persistor, store } from './redux/store.ts';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
          <Toaster position='top-right' reverseOrder={false} />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>,
);
