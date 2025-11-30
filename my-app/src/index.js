import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

import { StudentProvider } from "./context/StudentContext";     // <-- NEW
import { ProgramProvider } from "./context/ProgramContext";     // <-- NEW

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>

      <ProgramProvider>
        <StudentProvider>
          <App />
        </StudentProvider>
      </ProgramProvider>

    </BrowserRouter>
  </React.StrictMode>
);
