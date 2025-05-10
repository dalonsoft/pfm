import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import Translation from '@/Components/Translation';

const UserPreferencesIndex = ({ preferences, currencies, availableLanguages }) => {
    const { data, setData, post, processing, errors } = useForm({
        language: preferences.language || 'es',
        preferred_currency: preferences.preferred_currency || ''
    });
    
    const { translations } = usePage().props;
    const title = translations?.preferences?.preferences || 'Preferences';

    // Obtenemos las traducciones para los idiomas disponibles
    const getLanguageLabel = (code) => {
        const key = `preferences.language_${code}`;
        return translations?.preferences?.[`language_${code}`] || code.toUpperCase();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('user-preferences.update'));
    };

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