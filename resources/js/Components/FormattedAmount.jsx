import React from 'react';
import { usePage } from '@inertiajs/react';

const FormattedAmount = ({ amount, includeCurrency = false }) => {
    const { auth, userPreferences } = usePage().props;
    
    const formatAmount = (value) => {
        if (value === null || value === undefined) return '';
        
        // Default to European format (dot as thousands separator, comma as decimal)
        let thousandsSeparator = '.';
        let decimalSeparator = ',';
        const decimals = 2;
        
        // Get format from user preferences
        const format = userPreferences?.amount_format || 'dot_comma';
        
        // Set separators based on format
        switch (format) {
            case 'comma_dot': // US/UK format
                thousandsSeparator = ',';
                decimalSeparator = '.';
                break;
            case 'space_comma': // French format
                thousandsSeparator = ' ';
                decimalSeparator = ',';
                break;
            case 'none_dot': // No thousands separator, dot for decimal
                thousandsSeparator = '';
                decimalSeparator = '.';
                break;
            case 'none_comma': // No thousands separator, comma for decimal
                thousandsSeparator = '';
                decimalSeparator = ',';
                break;
            case 'dot_comma': // European format (default)
            default:
                break;
        }

        // Format the number
        const parts = parseFloat(value).toFixed(decimals).toString().split('.');
        const integerPart = parts[0];
        const decimalPart = parts.length > 1 ? parts[1] : '';
        
        // Add thousands separators
        let formattedIntegerPart = '';
        if (thousandsSeparator) {
            for (let i = 0; i < integerPart.length; i++) {
                if (i > 0 && (integerPart.length - i) % 3 === 0) {
                    formattedIntegerPart += thousandsSeparator;
                }
                formattedIntegerPart += integerPart.charAt(i);
            }
        } else {
            formattedIntegerPart = integerPart;
        }
        
        // Add currency symbol if requested
        let currencySymbol = '';
        if (includeCurrency && userPreferences?.preferred_currency && userPreferences.currencies) {
            const currency = userPreferences.currencies.find(
                c => c.id.toString() === userPreferences.preferred_currency.toString()
            );
            if (currency) {
                currencySymbol = currency.symbol + ' ';
            }
        }
        
        return currencySymbol + formattedIntegerPart + (decimalPart ? decimalSeparator + decimalPart : '');
    };

    return <span>{formatAmount(amount)}</span>;
};

export default FormattedAmount;