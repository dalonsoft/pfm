import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Form, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import Translation from '@/Components/Translation';
import { usePage } from '@inertiajs/react';

const AccountForm = ({ defaultValues, onSubmit, onCancel, isEditMode, categories, currencies }) => {
    const form = useForm({
        defaultValues
    });
    
    const { translations } = usePage().props;
    const nameRequired = translations?.validation?.required || 'is required';
    const categoryRequired = translations?.validation?.required || 'is required';
    const currencyRequired = translations?.validation?.required || 'is required';
    const nameLabel = translations?.accounts?.name || 'Name';
    const categoryLabel = translations?.accounts?.category || 'Category';
    const currencyLabel = translations?.accounts?.currency || 'Currency';

    const { handleSubmit, control, formState: { errors } } = form;

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <FormItem>
                    <FormLabel><Translation>accounts.name</Translation></FormLabel>
                    <FormControl>
                        <Controller
                            name="name"
                            control={control}
                            rules={{ required: `${nameLabel} ${nameRequired}` }}
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
                    <FormLabel><Translation>accounts.category</Translation></FormLabel>
                    <FormControl>
                        <Controller
                            name="account_category_id"
                            control={control}
                            rules={{ required: `${categoryLabel} ${categoryRequired}` }}
                            render={({ field }) => (
                                <select
                                    {...field}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                >
                                    <option value="">{translations?.accounts?.select_category || 'Select a category'}</option>
                                    {categories && categories.map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            )}
                        />
                    </FormControl>
                    {errors.account_category_id && <FormMessage>{errors.account_category_id.message}</FormMessage>}
                </FormItem>

                <FormItem>
                    <FormLabel><Translation>accounts.currency</Translation></FormLabel>
                    <FormControl>
                        <Controller
                            name="currency_id"
                            control={control}
                            rules={{ required: `${currencyLabel} ${currencyRequired}` }}
                            render={({ field }) => (
                                <select
                                    {...field}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                >
                                    <option value="">{translations?.accounts?.select_currency || 'Select a currency'}</option>
                                    {currencies && currencies.map(currency => (
                                        <option key={currency.id} value={currency.id}>
                                            {currency.code} - {currency.name}
                                        </option>
                                    ))}
                                </select>
                            )}
                        />
                    </FormControl>
                    {errors.currency_id && <FormMessage>{errors.currency_id.message}</FormMessage>}
                </FormItem>

                <div className="mt-4 flex justify-end space-x-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <Translation>accounts.cancel</Translation>
                    </button>
                    <button
                        type="submit"
                        className="ml-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {isEditMode ? <Translation>accounts.update</Translation> : <Translation>accounts.create</Translation>}
                    </button>
                </div>
            </form>
        </Form>
    );
};

export default AccountForm;
