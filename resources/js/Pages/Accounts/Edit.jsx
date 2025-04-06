import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import AccountForm from '@/Components/AccountForm';
import { usePage } from '@inertiajs/react';

const Edit = () => {
    const { account } = usePage().props;
    const [isModalOpen, setIsModalOpen] = useState(true);
    const form = useForm({
        defaultValues: {
            name: account.name,
            category: account.category
        }
    });

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = (data) => {
        // Lógica para enviar el formulario
        console.log(data);
        handleCloseModal();
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Edit Account
                </h2>
            }
        >
            <Head title="Edit Account" />

            <Modal show={isModalOpen} onClose={handleCloseModal}>
                <h2 className="text-lg font-medium text-gray-900">Edit Account</h2>
                <AccountForm form={form} onSubmit={handleSubmit} />
            </Modal>
        </AuthenticatedLayout>
    );
};

export default Edit;