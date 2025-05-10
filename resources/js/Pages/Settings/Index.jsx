import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { 
    CurrencyDollarIcon, 
    TagIcon, 
    WalletIcon,
    DocumentTextIcon,
    DocumentDuplicateIcon,
    UserIcon 
} from '@heroicons/react/24/outline';
import Translation from '@/Components/Translation';

const SettingsIndex = () => {
    const { translations } = usePage().props;
    const title = translations?.settings?.settings || 'Settings';

    // Usamos traducciones para todos los textos
    const settingsOptions = [
        {
            title: <Translation>settings.user_preferences</Translation>,
            description: <Translation>settings.user_preferences_desc</Translation>,
            icon: <UserIcon className="w-8 h-8 text-indigo-500" />,
            route: route('user-preferences.index')
        },
        {
            title: <Translation>settings.account_categories</Translation>,
            description: <Translation>settings.account_categories_desc</Translation>,
            icon: <WalletIcon className="w-8 h-8 text-blue-500" />,
            route: route('account-categories.index')
        },
        {
            title: <Translation>settings.currencies</Translation>,
            description: <Translation>settings.currencies_desc</Translation>,
            icon: <CurrencyDollarIcon className="w-8 h-8 text-green-500" />,
            route: route('currencies.index')
        },
        {
            title: <Translation>settings.transaction_categories</Translation>,
            description: <Translation>settings.transaction_categories_desc</Translation>,
            icon: <TagIcon className="w-8 h-8 text-purple-500" />,
            route: route('transaction-categories.index')
        },
        {
            title: <Translation>settings.transaction_category_aliases</Translation>,
            description: <Translation>settings.transaction_category_aliases_desc</Translation>,
            icon: <DocumentDuplicateIcon className="w-8 h-8 text-yellow-500" />,
            route: route('transaction-category-aliases.index')
        },
        {
            title: <Translation>settings.transaction_types</Translation>,
            description: <Translation>settings.transaction_types_desc</Translation>,
            icon: <DocumentTextIcon className="w-8 h-8 text-red-500" />,
            route: route('transaction-types.index')
        }
    ];

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight"><Translation>settings.settings</Translation></h2>}
        >
            <Head title={title} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                {settingsOptions.map((option, index) => (
                                    <Link key={index} href={option.route} className="block">
                                        <div className="border rounded-lg p-6 hover:bg-gray-50 transition-colors cursor-pointer h-full shadow-sm">
                                            <div className="flex items-center justify-between pb-2">
                                                <h3 className="text-lg font-medium">
                                                    {option.title}
                                                </h3>
                                                <div>{option.icon}</div>
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                {option.description}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default SettingsIndex;