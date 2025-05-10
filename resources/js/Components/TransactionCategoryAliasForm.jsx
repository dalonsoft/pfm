import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Form, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

const TransactionCategoryAliasForm = ({ defaultValues, onSubmit, onCancel, isEditMode, categories }) => {
    const form = useForm({
        defaultValues
    });

    const { handleSubmit, control, formState: { errors } } = form;

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <FormItem>
                    <FormLabel>Alias</FormLabel>
                    <FormControl>
                        <Controller
                            name="alias"
                            control={control}
                            rules={{ required: 'El alias es requerido' }}
                            render={({ field }) => (
                                <input
                                    type="text"
                                    {...field}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            )}
                        />
                    </FormControl>
                    {errors.alias && <FormMessage>{errors.alias.message}</FormMessage>}
                </FormItem>

                <FormItem>
                    <FormLabel>Categoría</FormLabel>
                    <FormControl>
                        <Controller
                            name="transaction_category_id"
                            control={control}
                            rules={{ required: 'La categoría es requerida' }}
                            render={({ field }) => (
                                <select
                                    {...field}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                >
                                    <option value="">Seleccione una categoría</option>
                                    {categories && categories.map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            )}
                        />
                    </FormControl>
                    {errors.transaction_category_id && <FormMessage>{errors.transaction_category_id.message}</FormMessage>}
                </FormItem>

                <div className="mt-4 flex justify-end space-x-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="ml-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {isEditMode ? 'Actualizar' : 'Crear'}
                    </button>
                </div>
            </form>
        </Form>
    );
};

export default TransactionCategoryAliasForm;