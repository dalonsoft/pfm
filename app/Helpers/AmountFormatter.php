<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Auth;

class AmountFormatter
{
    /**
     * Format an amount according to user preferences
     *
     * @param float $amount The amount to format
     * @param int|null $decimals Number of decimal places (defaults to 2)
     * @param boolean $includeCurrency Whether to include the currency symbol
     * @return string Formatted amount
     */
    public static function format($amount, $decimals = 2, $includeCurrency = false)
    {
        if (!$amount && $amount !== 0) {
            return '';
        }

        $user = Auth::user();
        
        if (!$user) {
            // Default to European format if no user
            return self::formatWithSeparators($amount, $decimals, '.', ',');
        }

        $format = $user->getPreference('amount_format', 'dot_comma');
        $currencyId = $user->getPreference('preferred_currency');
        $currencySymbol = '';
        
        if ($includeCurrency && $currencyId) {
            $currency = \App\Models\Currency::find($currencyId);
            $currencySymbol = $currency ? $currency->symbol . ' ' : '';
        }

        switch ($format) {
            case 'comma_dot':
                return $currencySymbol . self::formatWithSeparators($amount, $decimals, ',', '.');
            case 'space_comma':
                return $currencySymbol . self::formatWithSeparators($amount, $decimals, ' ', ',');
            case 'none_dot':
                return $currencySymbol . self::formatWithSeparators($amount, $decimals, '', '.');
            case 'none_comma':
                return $currencySymbol . self::formatWithSeparators($amount, $decimals, '', ',');
            case 'dot_comma':
            default:
                return $currencySymbol . self::formatWithSeparators($amount, $decimals, '.', ',');
        }
    }

    /**
     * Format a number with custom decimal and thousands separators
     *
     * @param float $number The number to format
     * @param int $decimals Number of decimal places
     * @param string $thousandsSep Thousands separator
     * @param string $decimalSep Decimal separator
     * @return string
     */
    private static function formatWithSeparators($number, $decimals, $thousandsSep, $decimalSep)
    {
        return number_format($number, $decimals, $decimalSep, $thousandsSep);
    }
}