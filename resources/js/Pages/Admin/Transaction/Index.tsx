import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { ColumnFiltersState, PaginationState } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';
import route from 'ziggy-js';

import DashboardAdminLayout from '@/Layouts/DashboardAdminLayout';
import { InertiaLink } from '@inertiajs/inertia-react';
import { TransactionModel } from '@/Models/Transaction';
import { Pagination } from '@/Models/Helper';
import { Inertia } from '@inertiajs/inertia';

interface Props {
    transactions: Pagination<TransactionModel>,
}



export default function Index({ transactions }: Props) {

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    useEffect(() => {
        const url = new URL(route(route().current()!).toString());

        url.searchParams.set('page', (pagination.pageIndex + 1).toString());
        url.searchParams.set('perPage', pagination.pageSize.toString());
        url.searchParams.set('columnFilters', JSON.stringify(columnFilters ?? []));
        url.searchParams.set('globalFilter', globalFilter ?? '');

        Inertia.visit(url.toString(), {
            preserveState: true,
            preserveScroll: true,
            data: {
                page: pagination.pageIndex + 1,
                perPage: pagination.pageSize,
                columnFilters: JSON.stringify(columnFilters),
                globalFilter: globalFilter,
            },
            only: ["transactions"],
            replace: true,
        })

    }, [pagination, columnFilters, globalFilter]);

    const dataColumns = [
        {
            accessorKey: 'name',
            header: 'Nama Pembeli',
        },
        {
            accessorKey: 'email',
            header: 'Email',
        },
        {
            accessorKey: 'phone_number',
            header: 'No Hp',
        },
        {
            accessorKey: 'total_tickets',
            header: 'Jumlah Tiket',
        },
        {
            accessorKey: 'payment_status',
            header: 'Status',
        }
    ] as MRT_ColumnDef<TransactionModel>[];

    return (
        <DashboardAdminLayout title="Events">
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                        <div className="p-6 sm:px-20 bg-white border-b border-gray-200">
                            <div className="flex justify-between">
                                <div className="mt-8 text-2xl">
                                    Transaksi Tiket
                                </div>
                                <div className="">
                                    <InertiaLink
                                        href={route('transaction.redeemForm')}
                                        className="bg-blue-500 text-white hover:bg-blue-600 py-3 px-5 rounded-lg text-md font-semibold">
                                        Redeem Tiket
                                    </InertiaLink>
                                </div>
                            </div>
                            <div className="mt-6 text-gray-500">
                                <MaterialReactTable
                                    columns={dataColumns}
                                    data={transactions.data}
                                    enableColumnActions
                                    enableColumnFilters
                                    enableGlobalFilter={false}
                                    onColumnFiltersChange={
                                        (value) => {
                                            setColumnFilters(value);
                                            setPagination({ ...pagination, pageIndex: 0 });
                                        }
                                    }
                                    enablePagination
                                    manualPagination
                                    enableSorting
                                    enableBottomToolbar
                                    enableTopToolbar
                                    enableRowNumbers
                                    enableExpanding
                                    enableExpandAll
                                    muiTableBodyRowProps={{ hover: false }}
                                    rowCount={transactions.total}
                                    onPaginationChange={setPagination}
                                    state={{ pagination, columnFilters, globalFilter }}
                                    renderDetailPanel={({ row }) => (
                                        <table className='w-full'>
                                            <thead>
                                                <tr className='border-b py-3 border-black'>
                                                    <th className='text-center'>Properti</th>
                                                    <th className='text-center'>Keterangan</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className='border-b py-3 border-black'>
                                                    <td className='py-3 text-center'>Jumlah Tiket</td>
                                                    <td className='py-3 text-center'>{row.original.payment_method}</td>
                                                </tr>
                                                <tr className='border-b py-3 border-black'>
                                                    <td className='py-3 text-center'>Total Pembayaran</td>
                                                    <td className='py-3 text-center'>{row.original.total_amount}</td>
                                                </tr>
                                                <tr className='border-b py-3 border-black'>
                                                    <td className='py-3 text-center'>Jenis Promo</td>
                                                    <td className='py-3 text-center'>{row.original.tickets_category}</td>
                                                </tr>
                                                <tr className='border-b py-3 border-black'>
                                                    <td className='py-3 text-center'>Tautan Pembayaran</td>
                                                    <td className='py-3 text-center'>{row.original.payment_link}</td>
                                                </tr>
                                                <tr className='border-b py-3 border-black'>
                                                    <td className='py-3 text-center'>Tanggal Pembelian</td>
                                                    <td className='py-3 text-center'>{row.original.created_at}</td>
                                                </tr>
                                            </tbody>
                                        </table>
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
