import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

// Importamos nuestro helper de traducciones
import { __ } from './Helpers/i18n';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'PFM';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        // Inicializamos las traducciones correctamente desde las props de Inertia
        window.translations = props.initialPage.props.translations || {};
        // Establecemos la función de traducción global
        window.__ = __;

        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});