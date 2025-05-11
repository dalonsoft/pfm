import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import Translation from '@/Components/Translation';

const UserPreferencesIndex = ({ preferences, currencies, availableLanguages }) => {
    const { data, setData, post, processing, errors } = useForm({
        language: preferences.language || 'es',
        preferred_currency: preferences.preferred_currency || '',
        amount_format: preferences.amount_format || 'dot_comma', // European default: 1.234,56
        date_format: preferences.date_format || 'dd/mm/yyyy' // European default: 31/12/2025
    });
    
    const { translations } = usePage().props;
    const title = translations?.preferences?.preferences || 'Preferences';

    // Get translations for available languages
    const getLanguageLabel = (code) => {
        const key = `preferences.language_${code}`;
        return translations?.preferences?.[`language_${code}`] || code.toUpperCase();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('user-preferences.update'));
    };

    // Amount format options
    const amountFormats = [
        { value: 'dot_comma', label: '1.234,56 (European)' },
        { value: 'comma_dot', label: '1,234.56 (US/UK)' },
        { value: 'space_comma', label: '1 234,56 (French)' },
        { value: 'none_dot', label: '1234.56' },
        { value: 'none_comma', label: '1234,56' }
    ];

    // Date format options
    const dateFormats = [
        { value: 'dd/mm/yyyy', label: '31/12/2025 (European)' },
        { value: 'mm/dd/yyyy', label: '12/31/2025 (US)' },
        { value: 'yyyy-mm-dd', label: '2025-12-31 (ISO)' },
        { value: 'dd-mm-yyyy', label: '31-12-2025' },
        { value: 'dd.mm.yyyy', label: '31.12.2025 (German)' }
    ];

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight"><Translation>preferences.user_preferences</Translation></h2>}
        >
            <Head title={title} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-6">
                                    <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                                        <Translation>preferences.language</Translation>
                                    </label>
                                    <select
                                        id="language"
                                        name="language"
                                        value={data.language}
                                        onChange={(e) => setData('language', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    >
                                        {availableLanguages.map((language) => (
                                            <option key={language.code} value={language.code}>
                                                {getLanguageLabel(language.code)}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="preferred_currency" className="block text-sm font-medium text-gray-700 mb-1">
                                        <Translation>preferences.preferred_currency</Translation>
                                    </label>
                                    <select
                                        id="preferred_currency"
                                        name="preferred_currency"
                                        value={data.preferred_currency}
                                        onChange={(e) => setData('preferred_currency', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    >
                                        <option value="">{translations?.preferences?.select_currency || 'Select currency'}</option>
                                        {currencies.map((currency) => (
                                            <option key={currency.id} value={currency.id}>
                                                {currency.name} ({currency.code})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="amount_format" className="block text-sm font-medium text-gray-700 mb-1">
                                        <Translation>preferences.amount_format</Translation>
                                    </label>
                                    <select
                                        id="amount_format"
                                        name="amount_format"
                                        value={data.amount_format}
                                        onChange={(e) => setData('amount_format', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    >
                                        {amountFormats.map((format) => (
                                            <option key={format.value} value={format.value}>
                                                {format.label}
                                            </option>
                                        ))}
                                    </select>
                                    <p className="mt-1 text-sm text-gray-500">
                                        <Translation>preferences.amount_format_help</Translation>
                                    </p>
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="date_format" className="block text-sm font-medium text-gray-700 mb-1">
                                        <Translation>preferences.date_format</Translation>
                                    </label>
                                    <select
                                        id="date_format"
                                        name="date_format"
                                        value={data.date_format}
                                        onChange={(e) => setData('date_format', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    >
                                        {dateFormats.map((format) => (
                                            <option key={format.value} value={format.value}>
                                                {format.label}
                                            </option>
                                        ))}
                                    </select>
                                    <p className="mt-1 text-sm text-gray-500">
                                        <Translation>preferences.date_format_help</Translation>
                                    </p>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        <Translation>preferences.save_preferences</Translation>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default UserPreferencesIndex;