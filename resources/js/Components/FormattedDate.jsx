import React from 'react';
import { usePage } from '@inertiajs/react';

const FormattedDate = ({ date, includeTime = false }) => {
    const { auth, userPreferences } = usePage().props;
    
    const formatDate = (value) => {
        if (!value) return '';
        
        try {
            const dateObj = new Date(value);
            if (isNaN(dateObj.getTime())) return '';
            
            // Default to European format (dd/mm/yyyy)
            const format = userPreferences?.date_format || 'dd/mm/yyyy';
            
            const day = String(dateObj.getDate()).padStart(2, '0');
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            const year = dateObj.getFullYear();
            
            let formattedDate = '';
            
            switch (format) {
                case 'mm/dd/yyyy': // US format
                    formattedDate = `${month}/${day}/${year}`;
                    break;
                case 'yyyy-mm-dd': // ISO format
                    formattedDate = `${year}-${month}-${day}`;
                    break;
                case 'dd-mm-yyyy': // Dash separated
                    formattedDate = `${day}-${month}-${year}`;
                    break;
                case 'dd.mm.yyyy': // German format
                    formattedDate = `${day}.${month}.${year}`;
                    break;
                case 'dd/mm/yyyy': // European format (default)
                default:
                    formattedDate = `${day}/${month}/${year}`;
                    break;
            }
            
            if (includeTime) {
                const hours = String(dateObj.getHours()).padStart(2, '0');
                const minutes = String(dateObj.getMinutes()).padStart(2, '0');
                formattedDate += ` ${hours}:${minutes}`;
            }
            
            return formattedDate;
        } catch (e) {
            console.error('Error formatting date:', e);
            return '';
        }
    };

    return <span>{formatDate(date)}</span>;
};

export default FormattedDate;