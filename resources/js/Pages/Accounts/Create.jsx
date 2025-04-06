import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import AccountForm from '@/Components/AccountForm';

const Create = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const form = useForm({
        defaultValues: {
            name: '',
            category: ''
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
                    Create Account
                </h2>
            }
        >
            <Head title="Create Account" />

            <Modal show={isModalOpen} onClose={handleCloseModal}>
                <h2 className="text-lg font-medium text-gray-900">Create Account</h2>
                <AccountForm form={form} onSubmit={handleSubmit} />
            </Modal>
        </AuthenticatedLayout>
    );
};

export default Create;