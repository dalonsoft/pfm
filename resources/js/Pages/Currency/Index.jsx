import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import CurrencyForm from '@/Components/CurrencyForm';
import { PlusIcon } from '@heroicons/react/24/outline';

const CurrencyIndex = ({ currencies }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [currencyToDelete, setCurrencyToDelete] = useState(null);

    const defaultValues = {
        name: '',
        code: '',
        symbol: ''
    };

    const columns = [
        { header: 'Nombre', accessor: 'name' },
        { header: 'Código', accessor: 'code' },
        { header: 'Símbolo', accessor: 'symbol' }
    ];

    const handleCreate = () => {
        setEditData(null);
        setIsOpen(true);
    };

    const handleEdit = (currency) => {
        setEditData({...currency});
        setIsOpen(true);
    };

    const handleSubmit = (data) => {
        if (editData) {
            router.put(`/currencies/${editData.id}`, data);
        } else {
            router.post('/currencies', data);
        }
        setIsOpen(false);
    };

    const handleDelete = (id) => {
        setCurrencyToDelete(id);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        router.delete(`/currencies/${currencyToDelete}`);
        setIsDeleteDialogOpen(false);
    };

    const actions = {
        edit: handleEdit,
        delete: handleDelete
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight">Monedas</h2>}
        >
            <Head title="Monedas" />

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
                                    Crear Moneda
                                </button>
                            </div>
                            <DataTable data={currencies} columns={columns} actions={actions} />
                        </div>
                    </div>
                </div>
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editData ? 'Editar Moneda' : 'Crear Moneda'}</DialogTitle>
                        <DialogDescription>
                            {editData ? 'Modifica los detalles de la moneda.' : 'Completa el formulario para crear una moneda.'}
                        </DialogDescription>
                    </DialogHeader>
                    <CurrencyForm
                        defaultValues={editData || defaultValues}
                        onSubmit={handleSubmit}
                        onCancel={() => setIsOpen(false)}
                        isEditMode={!!editData}
                    />
                </DialogContent>
            </Dialog>

            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Confirmar eliminación</DialogTitle>
                        <DialogDescription>
                            ¿Estás seguro de que deseas eliminar esta moneda? Esta acción no se puede deshacer.
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

export default CurrencyIndex;