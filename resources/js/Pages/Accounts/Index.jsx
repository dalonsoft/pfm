import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import AccountForm from '@/Components/AccountForm';
import { PlusIcon } from '@heroicons/react/24/outline';

const AccountsIndex = ({ accounts }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentAccount, setCurrentAccount] = useState(null);

    const defaultValues = {
        name: '',
        category: ''
    };

    const columns = [
        { header: 'Name', accessor: 'name' },
        { header: 'Category', accessor: 'category.name' }
    ];

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this account?')) {
            // Lógica para borrar la cuenta
        }
    };

    const actions = {
        view: (account) => `/accounts/${account.id}`,
        edit: (account) => handleEdit(account),
        delete: (account) => handleDelete(account.id)
    };

    const handleCreate = () => {
        setIsEditMode(false);
        setCurrentAccount(null);
        setIsDialogOpen(true);
    };

    const handleEdit = (account) => {
        setIsEditMode(true);
        setCurrentAccount(account);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const handleSubmit = (data) => {
        if (isEditMode) {
            // Lógica para actualizar la cuenta
            console.log('Updating account:', currentAccount.id, data);
        } else {
            // Lógica para crear una nueva cuenta
            console.log('Creating account:', data);
        }
        handleCloseDialog();
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Accounts
                </h2>
            }
        >
            <Head title="Accounts" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex justify-end mb-4">
                                <button
                                    onClick={handleCreate}
                                    className="inline-flex items-center px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring ring-blue-300 disabled:opacity-25 transition ease-in-out duration-150"
                                >
                                    <PlusIcon className="w-5 h-5 mr-2" />
                                    Create Account
                                </button>
                            </div>
                            <DataTable data={accounts} columns={columns} actions={actions} />
                        </div>
                    </div>
                </div>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{isEditMode ? 'Edit Account' : 'Create Account'}</DialogTitle>
                        <DialogDescription>
                            {isEditMode ? 'Edit the details of the account.' : 'Fill in the details to create a new account.'}
                        </DialogDescription>
                    </DialogHeader>
                    <AccountForm
                        defaultValues={isEditMode ? currentAccount : defaultValues}
                        onSubmit={handleSubmit}
                        onCancel={handleCloseDialog}
                        isEditMode={isEditMode}
                    />
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
};

export default AccountsIndex;