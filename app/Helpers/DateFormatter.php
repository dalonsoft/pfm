<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class DateFormatter
{
    /**
     * Format a date according to user preferences
     *
     * @param string|Carbon $date The date to format
     * @return string Formatted date
     */
    public static function format($date)
    {
        if (!$date) {
            return '';
        }

        if (!$date instanceof Carbon) {
            try {
                $date = Carbon::parse($date);
            } catch (\Exception $e) {
                return '';
            }
        }

        $user = Auth::user();
        
        if (!$user) {
            // Default to European format if no user
            return $date->format('d/m/Y');
        }

        $format = $user->getPreference('date_format', 'dd/mm/yyyy');
        
        switch ($format) {
            case 'mm/dd/yyyy':
                return $date->format('m/d/Y');
            case 'yyyy-mm-dd':
                return $date->format('Y-m-d');
            case 'dd-mm-yyyy':
                return $date->format('d-m-Y');
            case 'dd.mm.yyyy':
                return $date->format('d.m.Y');
            case 'dd/mm/yyyy':
            default:
                return $date->format('d/m/Y');
        }
    }
    
    /**
     * Format a datetime according to user preferences
     *
     * @param string|Carbon $date The datetime to format
     * @param boolean $includeSeconds Whether to include seconds
     * @return string Formatted datetime
     */
    public static function formatDateTime($date, $includeSeconds = false)
    {
        if (!$date) {
            return '';
        }

        if (!$date instanceof Carbon) {
            try {
                $date = Carbon::parse($date);
            } catch (\Exception $e) {
                return '';
            }
        }

        $timeFormat = $includeSeconds ? 'H:i:s' : 'H:i';
        return self::format($date) . ' ' . $date->format($timeFormat);
    }
}