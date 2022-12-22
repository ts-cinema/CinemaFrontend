import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './components/home/Homepage';
import Layout from './components/layout/Layout';
import Register from './components/register/Register';
<<<<<<< HEAD
import CreateMovie from './components/movie/CreateMovie';
import Movies from './components/movie/Movies';
import EditMovie from './components/movie/EditMovie';
import Profile from './components/profile/Profile';
import EditProfile from './components/profile/EditProfile';
=======
import Reservation from './components/reservation/Reservation';
>>>>>>> 48570423701c2c7a8f6ad48cc433e84b66466a8b

const container = document.getElementById('root')!;
const root = createRoot(container);

const Login = React.lazy(() => import('./components/login/Login'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
          <React.Suspense>
                    <ToastContainer />
                    <Routes>
                      <Route path="/" element={<Layout />}>
                        <Route path={'/login'} element={ <Login />} />
                        <Route path={'/home'} element={ <Homepage />} />
                        <Route path={'/register'} element={ <Register />} />
<<<<<<< HEAD
                        <Route path={'/movie/create'} element={ <CreateMovie />} />
                        <Route path={'/movie/edit'} element={ <EditMovie />} />
                        <Route path={'/movies'} element={ <Movies />} />
                        <Route path={'/profile'} element={ <Profile />} />
                        <Route path={'/profile/edit'} element={ <EditProfile />} />
=======
                        <Route path={'/reservation'} element={ <Reservation />} />
>>>>>>> 48570423701c2c7a8f6ad48cc433e84b66466a8b
                      </Route>
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
