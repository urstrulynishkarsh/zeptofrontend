import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import { Loader } from './Components/Loader';

const RootComponent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isReload = sessionStorage.getItem("isReloaded");

    if (isReload) {
      setIsLoading(false);
    } else {
      sessionStorage.setItem("isReloaded", "true");

      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, []);

  return isLoading ? (
    <div>
      <Loader />
    </div>
  ) : (
  
      <BrowserRouter>
        <App />
        <Toaster/>
        <ToastContainer />
      </BrowserRouter>

  );
};

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<RootComponent />);
}