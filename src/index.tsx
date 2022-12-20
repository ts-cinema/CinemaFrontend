import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const container = document.getElementById('root')!;
const root = createRoot(container);

const Login = React.lazy(() => import('./components/Login'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
                <React.Suspense>
                    <ToastContainer />
                    <Routes>
                        <Route path={'/login'} element={ <Login />} />
                    </Routes>
                </React.Suspense>
            </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
