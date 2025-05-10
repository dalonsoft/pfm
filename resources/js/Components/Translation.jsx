import React from 'react';
import { usePage } from '@inertiajs/react';

export const Translation = ({ children }) => {
    const { translations } = usePage().props;
    
    if (!children) return null;
    
    // Dividir por puntos para obtener la sección y la clave
    const parts = children.split('.');
    if (parts.length !== 2) return children;
    
    const [section, key] = parts;
    
    // Comprobar si existe la traducción
    if (translations && translations[section] && translations[section][key]) {
        return translations[section][key];
    }
    
    // Retornar la clave si no hay traducción
    return children;
};

export default Translation;