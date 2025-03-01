import { createInertiaApp } from '@inertiajs/react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import '../css/app.css';

createInertiaApp({
    resolve: name => require(`./Pages/${name}`).default,
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});

