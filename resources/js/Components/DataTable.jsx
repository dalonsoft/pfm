import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '@/components/ui/table';
import { Link } from '@inertiajs/react';
import { PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';

const DataTable = ({ data, columns, actions }) => {
    return (
        <Table className="min-w-full bg-white dark:bg-gray-800">
            <TableHeader>
                <TableRow>
                    {columns.map((column, index) => (
                        <TableCell key={index} className="py-2 px-4 border-b">{column.header}</TableCell>
                    ))}
                    {actions && <TableCell className="py-2 px-4 border-b">Actions</TableCell>}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((item, rowIndex) => (
                    <TableRow key={rowIndex}>
                        {columns.map((column, colIndex) => (
                            <TableCell key={colIndex} className="py-2 px-4 border-b">{item[column.accessor]}</TableCell>
                        ))}
                        {actions && (
                            <TableCell className="py-2 px-4 border-b">
                                <div className="flex space-x-2">
                                    {actions.view && (
                                        <Link href={actions.view(item)} className="text-blue-500 hover:text-blue-700">
                                            <EyeIcon className="w-5 h-5" />
                                        </Link>
                                    )}
                                    {actions.edit && (
                                        <Link href={actions.edit(item)} className="text-yellow-500 hover:text-yellow-700">
                                            <PencilIcon className="w-5 h-5" />
                                        </Link>
                                    )}
                                    {actions.delete && (
                                        <button onClick={() => actions.delete(item)} className="text-red-500 hover:text-red-700">
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            </TableCell>
                        )}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default DataTable;