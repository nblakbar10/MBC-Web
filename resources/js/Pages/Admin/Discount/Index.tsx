import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import React from 'react';
import route from 'ziggy-js';

import DashboardAdminLayout from '@/Layouts/DashboardAdminLayout';
import { InertiaLink } from '@inertiajs/inertia-react';
import { DiscountModel } from '@/Models/Discount';

interface Props {
    discounts: Array<DiscountModel>,
}

export default function Index({ discounts }: Props) {


    const dataColumns = [
        {
            accessorKey: 'name',
            header: 'Promo Name',
        },
        {
            accessorKey: 'quota',
            header: 'quota',
        },
        {
            accessorKey: 'minimum_order',
            header: 'minimum order',
        },
        {
            accessorKey: 'type',
            header: 'type',
        },
        {
            accessorKey: 'deduction',
            header: 'deduction',
        },
        {
            accessorKey: 'promo_id',
            header: 'promo  id',
        }

    ] as MRT_ColumnDef<DiscountModel>[];
    return (
        <DashboardAdminLayout title="Diskon Tiket">
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                        <div className="p-6 sm:px-20 bg-white border-b border-gray-200">
                            <div className="flex justify-between">
                                <div className="mt-8 text-2xl">
                                    Daftar Diskon
                                </div>
                                <div className="">
                                    <InertiaLink
                                        href={route('discount.create')}
                                        className="bg-blue-500 text-white hover:bg-blue-600 py-3 px-5 rounded-lg text-md font-semibold">
                                        Tambah Diskon
                                    </InertiaLink>
                                </div>
                            </div>
                            <div className="mt-6 text-gray-500">
                                <MaterialReactTable
                                    columns={dataColumns}
                                    data={discounts}
                                    enableColumnActions
                                    enableColumnFilters
                                    enablePagination
                                    enableSorting
                                    enableBottomToolbar
                                    enableTopToolbar
                                    enableRowActions
                                    enableRowNumbers
                                    muiTableBodyRowProps={{ hover: false }}
                                    renderRowActions={({ row }) => (
                                        <div className="flex items-center justify-center gap-2">
                                            <InertiaLink href={route('discount.show', row.original.id)}
                                                className="bg-blue-500 text-white hover:bg-blue-600 py-3 px-5 rounded-lg text-md font-semibold">
                                                Show
                                            </InertiaLink>
                                        </div>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardAdminLayout>
    );
}
