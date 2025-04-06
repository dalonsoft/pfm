import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';

const transactionsIndex = ({ transactions }) => {
    const columns = [
        { header: 'Nombre', accessor: 'name' },
        { header: 'Categoría', accessor: 'category.name' }
    ];

    const actions = {
        view: (transaction) => `/transactions/${transaction.id}`,
        edit: (transaction) => `/transactions/${transaction.id}/edit`,
        delete: (transaction) => handleDelete(transaction.id)
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Transactions
                </h2>
            }
        >
            <Head title="transactions" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <DataTable data={transactions} columns={columns} actions={actions} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this transaction?')) {
        // Lógica para borrar la transacción
    }
};

export default transactionsIndex;