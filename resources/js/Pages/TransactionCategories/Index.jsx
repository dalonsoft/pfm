import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import TransactionCategoryForm from '@/Components/TransactionCategoryForm';
import { PlusIcon } from '@heroicons/react/24/outline';

const TransactionCategoriesIndex = ({ transactionCategories }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    const defaultValues = {
        name: '',
        description: '',
        parent_id: ''
    };

    const columns = [
        { header: 'Nombre', accessor: 'name' },
        { header: 'Descripción', accessor: 'description' },
        { header: 'Categoría Padre', accessor: 'parent.name' }
    ];

    const handleCreate = () => {
        setEditData(null);
        setIsOpen(true);
    };

    const handleEdit = (category) => {
        setEditData({...category});
        setIsOpen(true);
    };

    const handleSubmit = (data) => {
        if (editData) {
            router.put(`/transaction-categories/${editData.id}`, data);
        } else {
            router.post('/transaction-categories', data);
        }
        setIsOpen(false);
    };

    const handleDelete = (id) => {
        setCategoryToDelete(id);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        router.delete(`/transaction-categories/${categoryToDelete}`);
        setIsDeleteDialogOpen(false);
    };

    const actions = {
        edit: handleEdit,
        delete: handleDelete
    };

    // Filtrar las categorías para no mostrar la que se está editando en la lista de categorías padre
    const getAvailableParentCategories = () => {
        if (!editData) return transactionCategories;
        return transactionCategories.filter(category => category.id !== editData.id);
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight">Categorías de Transacciones</h2>}
        >
            <Head title="Categorías de Transacciones" />

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
                                    Crear Categoría
                                </button>
                            </div>
                            <DataTable data={transactionCategories} columns={columns} actions={actions} />
                        </div>
                    </div>
                </div>
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editData ? 'Editar Categoría' : 'Crear Categoría'}</DialogTitle>
                        <DialogDescription>
                            {editData ? 'Modifica los detalles de la categoría.' : 'Completa el formulario para crear una categoría.'}
                        </DialogDescription>
                    </DialogHeader>
                    <TransactionCategoryForm
                        defaultValues={editData || defaultValues}
                        onSubmit={handleSubmit}
                        onCancel={() => setIsOpen(false)}
                        isEditMode={!!editData}
                        categories={getAvailableParentCategories()}
                    />
                </DialogContent>
            </Dialog>

            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Confirmar eliminación</DialogTitle>
                        <DialogDescription>
                            ¿Estás seguro de que deseas eliminar esta categoría? Esta acción no se puede deshacer.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end space-x-2 mt-4">
                        <button
                            type="button"
                            onClick={() => setIsDeleteDialogOpen(false)}
                            className="px-4 py-2 border border-gray-300 rounded-md"
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            onClick={confirmDelete}
                            className="px-4 py-2 bg-red-600 text-white rounded-md"
                        >
                            Eliminar
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
};

export default TransactionCategoriesIndex;