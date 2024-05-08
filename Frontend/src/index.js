import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'tailwindcss/tailwind.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './Components/store/store';
import { Provider } from 'react-redux';
import {ToastContainer} from "react-toastify"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    <ToastContainer/>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
