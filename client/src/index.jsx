import React from 'react';
import App from "./app.jsx";
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

// hEiRaRcHy of CoL0rs
// darkest "#212121"
// second darkest "#313131"
// third darkest "#424242"

const container = document.getElementById('root');
const root = createRoot(container);
container.style.backgroundColor="#424242"
root.render(<App/>);