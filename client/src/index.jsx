import React from 'react';
import App from "./app.jsx";
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

const container = document.getElementById('root');
const root = createRoot(container);
container.style.backgroundColor="#212121"
root.render(<App/>);