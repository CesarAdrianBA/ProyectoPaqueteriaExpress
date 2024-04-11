import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { EmployeeProvider } from './context/EmployeeContext'
import'bootstrap/dist/css/bootstrap.css';
import './index.css';
import 'react-responsive-modal/styles.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <EmployeeProvider>
    <App />
  </EmployeeProvider>
);