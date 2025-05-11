import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { PlusIcon } from '@heroicons/react/24/outline';
import Translation from '@/Components/Translation';
import TransactionForm from '@/Components/TransactionForm';
import FormattedDate from '@/Components/FormattedDate';
import FormattedAmount from '@/Components/FormattedAmount';

const TransactionsIndex = ({ transactions, accounts, transactionCategories, transactionTypes }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [transactionToDelete, setTransactionToDelete] = useState(null);
    const { translations } = usePage().props;
    const title = translations?.transactions?.title || 'Transactions';

    const defaultValues = {
        amount: '',
        transaction_category_id: '',
        account_id: '',
        date: new Date().toISOString().split('T')[0],
        transaction_type_id: '',
        concept: '',
        note: ''
    };

    const columns = [
        { 
            header: <Translation>transactions.date</Translation>, 
            accessor: 'date',
            render: (value) => <FormattedDate date={value} />
        },
        { 
            header: <Translation>transactions.concept</Translation>, 
            accessor: 'concept' 
        },
        { 
            header: <Translation>transactions.amount</Translation>, 
            accessor: 'amount',
            render: (value) => <FormattedAmount amount={value} includeCurrency={true} />
        },
        { 
            header: <Translation>transactions.account</Translation>, 
            accessor: 'account.name' 
        },
        { 
            header: <Translation>transactions.category</Translation>, 
            accessor: 'transactionCategory.name' 
        }
    ];

    const handleCreate = () => {
        setEditData(null);
        setIsOpen(true);
    };

    const handleEdit = (transaction) => {
        setEditData({...transaction});
        setIsOpen(true);
    };

    const handleSubmit = (data) => {
        if (editData) {
            router.put(`/transactions/${editData.id}`, data);
        } else {
            router.post('/transactions', data);
        }
        setIsOpen(false);
    };

    const handleDelete = (id) => {
        setTransactionToDelete(id);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        router.delete(`/transactions/${transactionToDelete}`);
        setIsDeleteDialogOpen(false);
    };

    const actions = {
        edit: handleEdit,
        delete: handleDelete
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    <Translation>transactions.title</Translation>
                </h2>
            }
        >
            <Head title={title} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex justify-end mb-4">
                                <button
                                    type="button"
                                    onClick={handleCreate}
                                    className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md"
                                >
                                    <PlusIcon className="w-5 h-5 mr-2" />
                                    <Translation>transactions.create_transaction</Translation>
                                </button>
                            </div>
                            <DataTable data={transactions} columns={columns} actions={actions} />
                        </div>
                    </div>
                </div>
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {editData ? <Translation>transactions.edit_transaction</Translation> : <Translation>transactions.create_transaction</Translation>}
                        </DialogTitle>
                        <DialogDescription>
                            {editData ? <Translation>transactions.edit_form_description</Translation> : <Translation>transactions.create_form_description</Translation>}
                        </DialogDescription>
                    </DialogHeader>
                    <TransactionForm
                        defaultValues={editData || defaultValues}
                        onSubmit={handleSubmit}
                        onCancel={() => setIsOpen(false)}
                        isEditMode={!!editData}
                        accounts={accounts}
                        transactionCategories={transactionCategories}
                        transactionTypes={transactionTypes}
                    />
                </DialogContent>
            </Dialog>

            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle><Translation>transactions.delete_confirmation_title</Translation></DialogTitle>
                        <DialogDescription>
                            <Translation>transactions.delete_confirmation</Translation>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end space-x-2 mt-4">
                        <button
                            type="button"
                            onClick={() => setIsDeleteDialogOpen(false)}
                            className="px-4 py-2 border border-gray-300 rounded-md"
                        >
                            <Translation>transactions.cancel</Translation>
                        </button>
                        <button
                            type="button"
                            onClick={confirmDelete}
                            className="px-4 py-2 bg-red-600 text-white rounded-md"
                        >
                            <Translation>transactions.delete</Translation>
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
};

export default TransactionsIndex;