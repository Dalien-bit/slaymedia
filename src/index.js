import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';


ReactDOM.createRoot(
    document.getElementById('root')).render(
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
            <Router>
                <App />
            </Router>
        </GoogleOAuthProvider>
    );
