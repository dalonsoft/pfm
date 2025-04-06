import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Form, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

const AccountForm = ({ defaultValues, onSubmit, onCancel, isEditMode }) => {
    const form = useForm({
        defaultValues
    });

    const { handleSubmit, control, formState: { errors } } = form;

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Controller
                            name="name"
                            control={control}
                            rules={{ required: 'Name is required' }}
                            render={({ field }) => (
                                <input
                                    type="text"
                                    {...field}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            )}
                        />
                    </FormControl>
                    {errors.name && <FormMessage>{errors.name.message}</FormMessage>}
                </FormItem>

                <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                        <Controller
                            name="category"
                            control={control}
                            rules={{ required: 'Category is required' }}
                            render={({ field }) => (
                                <input
                                    type="text"
                                    {...field}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            )}
                        />
                    </FormControl>
                    {errors.category && <FormMessage>{errors.category.message}</FormMessage>}
                </FormItem>

                <div className="mt-4 flex justify-end space-x-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="ml-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {isEditMode ? 'Update' : 'Create'}
                    </button>
                </div>
            </form>
        </Form>
    );
};

export default AccountForm;
