import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import React from 'react';
import route from 'ziggy-js';

import DashboardAdminLayout from '@/Layouts/DashboardAdminLayout';
import { InertiaLink } from '@inertiajs/inertia-react';
import { PromoModel } from '@/Models/Promo';

interface Props {
    promos: Array<PromoModel>,
}

export default function Index({ promos }: Props) {


    const dataColumns = [
        {
            accessorKey: 'name',
            header: 'Nama Promo',
        },
        {
            accessorKey: 'stocks',
            header: 'Stok',
        },
        {
            accessorKey: 'price',
            header: 'Harga',
        },

    ] as MRT_ColumnDef<PromoModel>[];
    return (
        <DashboardAdminLayout title="Promo Event">
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                        <div className="p-6 sm:px-20 bg-white border-b border-gray-200">
                            <div className="flex justify-between">
                                <div className="mt-8 text-2xl">
                                    Daftar Promo
                                </div>
                                <div className="">
                                    <InertiaLink
                                        href={route('promo.create')}
                                        className="bg-blue-500 text-white hover:bg-blue-600 py-3 px-5 rounded-lg text-md font-semibold">
                                        Tambah Promo
                                    </InertiaLink>
                                </div>
                            </div>
                            <div className="mt-6 text-gray-500">
                                <MaterialReactTable
                                    columns={dataColumns}
                                    data={promos}
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
                                            <InertiaLink href={route('promo.show', row.original.id)}
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
