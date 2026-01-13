import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import { store } from './Store/index';
import { ToastContainer } from 'react-toastify';




createRoot(document.getElementById('root')).render(
    <Provider store={store}>
         <ToastContainer position="top-center" autoClose={3000} limit={2} newestOnTop={true}  />
        <App />
    </Provider>
)
