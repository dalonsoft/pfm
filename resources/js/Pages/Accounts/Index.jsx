import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import AccountForm from '@/Components/AccountForm';
import { PlusIcon } from '@heroicons/react/24/outline';
import Translation from '@/Components/Translation';

const AccountsIndex = ({ accounts, categories, currencies }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [accountToDelete, setAccountToDelete] = useState(null);
    const { translations } = usePage().props;
    const title = translations?.accounts?.accounts || 'Accounts';

    const defaultValues = {
        name: '',
        description: '',
        number: '',
        account_category_id: '',
        currency_id: ''
    };

    // Utilizamos traducciones para las cabeceras de columnas
    const columns = [
        { header: <Translation>accounts.name</Translation>, accessor: 'name' },
        { header: <Translation>accounts.category</Translation>, accessor: 'category.name' }
    ];

    const handleCreate = () => {
        setEditData(null);
        setIsOpen(true);
    };

    const handleEdit = (account) => {
        const accountForEdit = {
            ...account,
            account_category_id: account.account_category_id ? Number(account.account_category_id) : '',
            currency_id: account.currency_id ? Number(account.currency_id) : ''
        };
        
        setEditData(accountForEdit);
        setIsOpen(true);
    };

    const handleSubmit = (data) => {
        const formData = {
            ...data,
            account_category_id: data.account_category_id ? Number(data.account_category_id) : '',
            currency_id: data.currency_id ? Number(data.currency_id) : ''
        };
        
        if (editData) {
            router.put(`/accounts/${editData.id}`, {
                ...formData,
                id: editData.id
            });
        } else {
            router.post('/accounts', formData);
        }
        setIsOpen(false);
    };

    const handleDelete = (id) => {
        setAccountToDelete(id);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        router.delete(`/accounts/${accountToDelete}`);
        setIsDeleteDialogOpen(false);
    };

    const actions = {
        edit: handleEdit,
        delete: handleDelete
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight"><Translation>accounts.accounts</Translation></h2>}
        >
            <Head title={title} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-end mb-4">
                                <button
                                    type="button"
                                    onClick={handleCreate}
                                    className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md"
                                >
                                    <PlusIcon className="w-5 h-5 mr-2" />
                                    <Translation>accounts.create_account</Translation>
                                </button>
                            </div>
                            <DataTable data={accounts} columns={columns} actions={actions} />
                        </div>
                    </div>
                </div>
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {editData ? <Translation>accounts.edit_account</Translation> : <Translation>accounts.create_account</Translation>}
                        </DialogTitle>
                        <DialogDescription>
                            {editData ? <Translation>accounts.edit_form_description</Translation> : <Translation>accounts.create_form_description</Translation>}
                        </DialogDescription>
                    </DialogHeader>
                    <AccountForm
                        defaultValues={editData || defaultValues}
                        onSubmit={handleSubmit}
                        onCancel={() => setIsOpen(false)}
                        isEditMode={!!editData}
                        categories={categories}
                        currencies={currencies}
                    />
                </DialogContent>
            </Dialog>

            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle><Translation>accounts.delete_confirmation_title</Translation></DialogTitle>
                        <DialogDescription>
                            <Translation>accounts.delete_confirmation</Translation>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end space-x-2 mt-4">
                        <button
                            type="button"
                            onClick={() => setIsDeleteDialogOpen(false)}
                            className="px-4 py-2 border border-gray-300 rounded-md"
                        >
                            <Translation>accounts.cancel</Translation>
                        </button>
                        <button
                            type="button"
                            onClick={confirmDelete}
                            className="px-4 py-2 bg-red-600 text-white rounded-md"
                        >
                            <Translation>accounts.delete</Translation>
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
};

export default AccountsIndex;