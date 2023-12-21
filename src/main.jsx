import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './routes/routes.jsx';  // Asegúrate de que esta importación es necesaria
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <AppRoutes />
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);


