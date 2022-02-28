import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import { ToastContainer } from 'react-toastify';
import { App } from './components';
import { AuthProvider, PostsProvider } from './providers';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <PostsProvider>
        <App />
      </PostsProvider>
    </AuthProvider>
    <ToastContainer
      draggable
      pauseOnHover
      closeOnClick
      newestOnTop={false}
      autoClose={3000}
      position="top-left"
    />
  </React.StrictMode>,
  document.getElementById('root')
);
