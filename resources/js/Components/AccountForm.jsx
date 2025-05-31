import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Form, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import Translation from '@/Components/Translation';
import { usePage } from '@inertiajs/react';

const AccountForm = ({ defaultValues, onSubmit, onCancel, isEditMode, categories, currencies }) => {
    const processedDefaultValues = {
        ...defaultValues,
        account_category_id: defaultValues.account_category_id ? Number(defaultValues.account_category_id) : '',
        currency_id: defaultValues.currency_id ? Number(defaultValues.currency_id) : ''
    };

    const form = useForm({
        defaultValues: processedDefaultValues
    });
    
    const { translations } = usePage().props;
    const nameRequired = translations?.validation?.required || 'is required';
    const descriptionRequired = translations?.validation?.required || 'is required';
    const numberRequired = translations?.validation?.required || 'is required';
    const categoryRequired = translations?.validation?.required || 'is required';
    const currencyRequired = translations?.validation?.required || 'is required';
    const nameLabel = translations?.accounts?.name || 'Name';
    const descriptionLabel = translations?.accounts?.description || 'Description';
    const numberLabel = translations?.accounts?.number || 'Number';
    const categoryLabel = translations?.accounts?.category || 'Category';
    const currencyLabel = translations?.accounts?.currency || 'Currency';

    const { handleSubmit, control, formState: { errors } } = form;

    const handleFormSubmit = (data) => {
        const processedData = {
            ...data,
            account_category_id: data.account_category_id ? Number(data.account_category_id) : '',
            currency_id: data.currency_id ? Number(data.currency_id) : ''
        };
        
        onSubmit(processedData);
    };

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                <FormItem>
                    <FormLabel htmlFor="name"><Translation>accounts.name</Translation></FormLabel>
                    <FormControl>
                        <Controller
                            name="name"
                            control={control}
                            rules={{ required: `${nameLabel} ${nameRequired}` }}
                            render={({ field }) => (
                                <input
                                    id="name"
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
                    <FormLabel htmlFor="description"><Translation>accounts.description</Translation></FormLabel>
                    <FormControl>
                        <Controller
                            name="description"
                            control={control}
                            rules={{ required: `${descriptionLabel} ${descriptionRequired}` }}
                            render={({ field }) => (
                                <textarea
                                    id="description"
                                    {...field}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    rows={3}
                                />
                            )}
                        />
                    </FormControl>
                    {errors.description && <FormMessage>{errors.description.message}</FormMessage>}
                </FormItem>

                <FormItem>
                    <FormLabel htmlFor="number"><Translation>accounts.number</Translation></FormLabel>
                    <FormControl>
                        <Controller
                            name="number"
                            control={control}
                            rules={{ required: `${numberLabel} ${numberRequired}` }}
                            render={({ field }) => (
                                <input
                                    id="number"
                                    type="text"
                                    {...field}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            )}
                        />
                    </FormControl>
                    {errors.number && <FormMessage>{errors.number.message}</FormMessage>}
                </FormItem>

                <FormItem>
                    <FormLabel htmlFor="account_category_id"><Translation>accounts.category</Translation></FormLabel>
                    <FormControl>
                        <Controller
                            name="account_category_id"
                            control={control}
                            rules={{ required: `${categoryLabel} ${categoryRequired}` }}
                            render={({ field: { onChange, value, ...field } }) => (
                                <select
                                    id="account_category_id"
                                    {...field}
                                    value={value}
                                    onChange={(e) => {
                                        const val = e.target.value ? Number(e.target.value) : '';
                                        onChange(val);
                                    }}
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
                    <FormLabel htmlFor="currency_id"><Translation>accounts.currency</Translation></FormLabel>
                    <FormControl>
                        <Controller
                            name="currency_id"
                            control={control}
                            rules={{ required: `${currencyLabel} ${currencyRequired}` }}
                            render={({ field: { onChange, value, ...field } }) => (
                                <select
                                    id="currency_id"
                                    {...field}
                                    value={value}
                                    onChange={(e) => {
                                        const val = e.target.value ? Number(e.target.value) : '';
                                        onChange(val);
                                    }}
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
