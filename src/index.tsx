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
import CreateMovie from './components/movie/CreateMovie';
import Movies from './components/movie/Movies';
import EditMovie from './components/movie/EditMovie';
import Profile from './components/profile/Profile';
import EditProfile from './components/profile/EditProfile';
import Reservation from './components/reservation/Reservation';
import MovieItem from './components/movie/MovieItem';
import MovieList from './components/movie/MovieList';
import MoviesData from './components/movie/MoviesData';
import MoviesTable from './components/admin/movies/MoviesTable';
import AddMovieTable from './components/admin/movies/AddMovieTable';
import UsersTable from './components/admin/users/UsersTable';
import ProjectionsTable from './components/admin/projections/ProjectionsTable';
import AddMovieProjection from './components/admin/projections/AddMovieProjection';
import EditMovieProjection from './components/admin/projections/EditMovieProjection';
import EditMovieTable from './components/admin/movies/EditMovieTable';

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
                        <Route path={'/register'} element={ <Register />} />
                        <Route path={'/reservation'} element={ <Reservation />} />
                        <Route path={'/movie/add'} element={ <AddMovieTable />} />
                        <Route path={'/projection/add'} element={ <AddMovieProjection />} />
                        <Route path={'/movies'} element={ <MoviesData />} />
                        <Route path={'/movies/table'} element={ <MoviesTable />} />
                        <Route path={'/movie/edit'} element={ <EditMovieTable />} />
                        <Route path={'/users/table'} element={ <UsersTable />} />
                        <Route path={'/projections/table'} element={ <ProjectionsTable />} />
                        <Route path={'/projection/edit'} element={ <EditMovieProjection />} />
                        <Route path={'/profile'} element={ <Profile />} />
                        <Route path={'/profile/edit'} element={ <EditProfile />} />
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
