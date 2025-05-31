import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Form, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import Translation from '@/Components/Translation';
import { usePage } from '@inertiajs/react';

const TransactionForm = ({ 
    defaultValues, 
    onSubmit, 
    onCancel, 
    isEditMode, 
    accounts,
    transactionCategories,
    transactionTypes
}) => {
    const processedDefaultValues = {
        ...defaultValues,
        account_id: defaultValues.account_id ? Number(defaultValues.account_id) : '',
        transaction_category_id: defaultValues.transaction_category_id ? Number(defaultValues.transaction_category_id) : '',
        transaction_type_id: defaultValues.transaction_type_id ? Number(defaultValues.transaction_type_id) : ''
    };
    
    const form = useForm({
        defaultValues: processedDefaultValues
    });
    
    const { translations } = usePage().props;
    const requiredMsg = translations?.validation?.required || 'is required';
    
    const { handleSubmit, control, formState: { errors } } = form;
    
    const handleFormSubmit = (data) => {
        const processedData = {
            ...data,
            account_id: data.account_id ? Number(data.account_id) : '',
            transaction_category_id: data.transaction_category_id ? Number(data.transaction_category_id) : '',
            transaction_type_id: data.transaction_type_id ? Number(data.transaction_type_id) : '',
        };
        
        onSubmit(processedData);
    };

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                <FormItem>
                    <FormLabel htmlFor="date"><Translation>transactions.date</Translation></FormLabel>
                    <FormControl>
                        <Controller
                            name="date"
                            control={control}
                            rules={{ required: `Date ${requiredMsg}` }}
                            render={({ field }) => (
                                <input
                                    id="date"
                                    type="date"
                                    {...field}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            )}
                        />
                    </FormControl>
                    {errors.date && <FormMessage>{errors.date.message}</FormMessage>}
                </FormItem>
                
                <FormItem>
                    <FormLabel htmlFor="concept"><Translation>transactions.concept</Translation></FormLabel>
                    <FormControl>
                        <Controller
                            name="concept"
                            control={control}
                            rules={{ required: `Concept ${requiredMsg}` }}
                            render={({ field }) => (
                                <input
                                    id="concept"
                                    type="text"
                                    {...field}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            )}
                        />
                    </FormControl>
                    {errors.concept && <FormMessage>{errors.concept.message}</FormMessage>}
                </FormItem>
                
                <FormItem>
                    <FormLabel htmlFor="amount"><Translation>transactions.amount</Translation></FormLabel>
                    <FormControl>
                        <Controller
                            name="amount"
                            control={control}
                            rules={{ 
                                required: `Amount ${requiredMsg}`,
                                pattern: {
                                    value: /^-?\d*\.?\d*$/,
                                    message: "Please enter a valid number"
                                }
                            }}
                            render={({ field }) => (
                                <input
                                    id="amount"
                                    type="number"
                                    step="0.01"
                                    {...field}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            )}
                        />
                    </FormControl>
                    {errors.amount && <FormMessage>{errors.amount.message}</FormMessage>}
                </FormItem>
                
                <FormItem>
                    <FormLabel htmlFor="account_id"><Translation>transactions.account</Translation></FormLabel>
                    <FormControl>
                        <Controller
                            name="account_id"
                            control={control}
                            rules={{ required: `Account ${requiredMsg}` }}
                            render={({ field: { onChange, value, ...field } }) => (
                                <select
                                    id="account_id"
                                    {...field}
                                    value={value}
                                    onChange={(e) => {
                                        const val = e.target.value ? Number(e.target.value) : '';
                                        onChange(val);
                                    }}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                >
                                    <option value="">{translations?.transactions?.select_account || 'Select an account'}</option>
                                    {accounts && accounts.map(account => (
                                        <option key={account.id} value={account.id}>
                                            {account.name}
                                        </option>
                                    ))}
                                </select>
                            )}
                        />
                    </FormControl>
                    {errors.account_id && <FormMessage>{errors.account_id.message}</FormMessage>}
                </FormItem>
                
                <FormItem>
                    <FormLabel htmlFor="transaction_category_id"><Translation>transactions.category</Translation></FormLabel>
                    <FormControl>
                        <Controller
                            name="transaction_category_id"
                            control={control}
                            rules={{ required: `Category ${requiredMsg}` }}
                            render={({ field: { onChange, value, ...field } }) => (
                                <select
                                    id="transaction_category_id"
                                    {...field}
                                    value={value}
                                    onChange={(e) => {
                                        const val = e.target.value ? Number(e.target.value) : '';
                                        onChange(val);
                                    }}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                >
                                    <option value="">{translations?.transactions?.select_category || 'Select a category'}</option>
                                    {transactionCategories && transactionCategories.map(category => (
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
                
                <FormItem>
                    <FormLabel htmlFor="transaction_type_id"><Translation>transactions.type</Translation></FormLabel>
                    <FormControl>
                        <Controller
                            name="transaction_type_id"
                            control={control}
                            rules={{ required: `Type ${requiredMsg}` }}
                            render={({ field: { onChange, value, ...field } }) => (
                                <select
                                    id="transaction_type_id"
                                    {...field}
                                    value={value}
                                    onChange={(e) => {
                                        const val = e.target.value ? Number(e.target.value) : '';
                                        onChange(val);
                                    }}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                >
                                    <option value="">{translations?.transactions?.select_type || 'Select a type'}</option>
                                    {transactionTypes && transactionTypes.map(type => (
                                        <option key={type.id} value={type.id}>
                                            {type.name}
                                        </option>
                                    ))}
                                </select>
                            )}
                        />
                    </FormControl>
                    {errors.transaction_type_id && <FormMessage>{errors.transaction_type_id.message}</FormMessage>}
                </FormItem>
                
                <FormItem>
                    <FormLabel htmlFor="note"><Translation>transactions.note</Translation></FormLabel>
                    <FormControl>
                        <Controller
                            name="note"
                            control={control}
                            render={({ field }) => (
                                <textarea
                                    id="note"
                                    {...field}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    rows={3}
                                />
                            )}
                        />
                    </FormControl>
                    {errors.note && <FormMessage>{errors.note.message}</FormMessage>}
                </FormItem>

                <div className="mt-4 flex justify-end space-x-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <Translation>transactions.cancel</Translation>
                    </button>
                    <button
                        type="submit"
                        className="ml-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {isEditMode ? <Translation>transactions.update</Translation> : <Translation>transactions.create</Translation>}
                    </button>
                </div>
            </form>
        </Form>
    );
};

export default TransactionForm;