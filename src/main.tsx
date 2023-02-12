import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux/es/exports';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import MovieCase from './components/MovieCase';
import MovieInfo from './components/MovieInfo';
import './index.css';
import { store } from './store';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: '/moviecase',
    element: <MovieCase />
  },
  {
    path: "/movieinfo/:movieId",
    element: <MovieInfo />
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={ store }>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
