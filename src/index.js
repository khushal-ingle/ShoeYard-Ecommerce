import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from 'react-router-dom';
import { DataProvider } from "./Contexts/DataContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <DataProvider>
        <App />
        <ToastContainer className="toast-container" />
      </DataProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
