import React from 'react';
import ReactDOM from 'react-dom/client';  
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { useStore } from './store/useStore';
import usersData from './data/users.json';

useStore.getState().setUsers(usersData);

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
