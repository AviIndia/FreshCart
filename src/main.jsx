import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/libs/slick-carousel/slick/slick.css';
import './assets/libs/slick-carousel/slick/slick-theme.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './assets/libs/bootstrap-icons/font/bootstrap-icons.min.css';
import './assets/libs/feather-webfont/dist/feather-icons.css';
import './assets/libs/simplebar/dist/simplebar.min.css';
import './assets/css/theme.min.css';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CategoryProvider from './context/CategoryContext.jsx';

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <CategoryProvider>
    <App />
    </CategoryProvider>
  </StrictMode>
)
