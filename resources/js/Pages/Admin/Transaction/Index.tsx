import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import React, { useEffect, useState } from 'react';
import route from 'ziggy-js';

import DashboardAdminLayout from '@/Layouts/DashboardAdminLayout';
import { InertiaLink } from '@inertiajs/inertia-react';
import { TransactionModel } from '@/Models/Transaction';
import { Pagination } from '@/Models/Helper';
import { Inertia } from '@inertiajs/inertia';

interface Props {
    transactions: Array<TransactionModel>,
}



export default function Index({ transactions }: Props) {

    // const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    // const [globalFilter, setGlobalFilter] = useState('');
    // const [pagination, setPagination] = useState<PaginationState>({
    //     pageIndex: 0,
    //     pageSize: 10,
    // });

    // useEffect(() => {
    //     const url = new URL(route(route().current()!).toString());

    //     url.searchParams.set('page', (pagination.pageIndex + 1).toString());
    //     url.searchParams.set('perPage', pagination.pageSize.toString());
    //     url.searchParams.set('columnFilters', JSON.stringify(columnFilters ?? []));
    //     url.searchParams.set('globalFilter', globalFilter ?? '');

    //     Inertia.visit(url.toString(), {
    //         preserveState: true,
    //         preserveScroll: true,
    //         data: {
    //             page: pagination.pageIndex + 1,
    //             perPage: pagination.pageSize,
    //             columnFilters: JSON.stringify(columnFilters),
    //             globalFilter: globalFilter,
    //         },
    //         only: ["transactions"],
    //         replace: true,
    //     })

    // }, [pagination]);

    const dataColumns = [
        {
            accessorKey: 'name',
            header: 'Nama Pembeli',
        },
        {
            accessorKey: 'payment_method',
            header: 'Metode Pembayaran',
        },
        {
            accessorKey: 'total_tickets',
            header: 'Jumlah Tiket',
        },
        {
            accessorKey: 'payment_status',
            header: 'Status',
        },
        {
            accessorKey: 'tickets_category',
            header: 'Jenis Tiket',
        },
    ] as MRT_ColumnDef<TransactionModel>[];

    return (
        <DashboardAdminLayout title="Transaksi">
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
                                    data={transactions}
                                    enableColumnActions
                                    enableColumnFilters
                                    enableGlobalFilter={false}
                                    // onColumnFiltersChange={
                                    //     (value) => {
                                    //         setColumnFilters(value);
                                    //         setPagination({ ...pagination, pageIndex: 0 });
                                    //     }
                                    // }
                                    enablePagination
                                    // manualPagination
                                    enableSorting
                                    enableBottomToolbar
                                    enableTopToolbar
                                    enableRowNumbers
                                    enableExpanding
                                    enableExpandAll
                                    muiTableBodyRowProps={{ hover: false }}
                                    // rowCount={transactions.total}
                                    // onPaginationChange={setPagination}
                                    // state={{ pagination, columnFilters, globalFilter }}
                                    renderDetailPanel={({ row }) => (
                                        <>
                                            <div className='flex'>
                                                <InertiaLink
                                                    href={route('transaction.edit', row.original.id)}
                                                >
                                                    <button className='bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-10 rounded-lg text-lg font-semibold '>
                                                        Edit
                                                    </button>
                                                </InertiaLink>
                                            </div>
                                            <table className='w-full'>
                                                <thead>
                                                    <tr className='border-b py-3 border-black'>
                                                        <th className='text-center'>Properti</th>
                                                        <th className='text-center'>Keterangan</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className='border-b py-3 border-black'>
                                                        <td className='py-3 text-center'>Email</td>
                                                        <td className='py-3 text-center'>{row.original.email}</td>
                                                    </tr>
                                                    <tr className='border-b py-3 border-black'>
                                                        <td className='py-3 text-center'>No Handphone</td>
                                                        <td className='py-3 text-center'>{row.original.phone_number}</td>
                                                    </tr>
                                                    <tr className='border-b py-3 border-black'>
                                                        <td className='py-3 text-center'>Total Pembayaran</td>
                                                        <td className='py-3 text-center'>Rp. {row.original.total_amount.toLocaleString()}</td>
                                                    </tr>
                                                    <tr className='border-b py-3 border-black'>
                                                        <td className='py-3 text-center'>Tautan Pembayaran</td>
                                                        <td className='py-3 text-center'>
                                                            <InertiaLink href={row.original.payment_link}>
                                                                {row.original.payment_link}
                                                            </InertiaLink>
                                                        </td>
                                                    </tr>
                                                    <tr className='border-b py-3 border-black'>
                                                        <td className='py-3 text-center'>Tanggal Pembelian</td>
                                                        <td className='py-3 text-center'>{row.original.created_at}</td>
                                                    </tr>
                                                    {row.original.payment_status === 'PAID' && (
                                                        <>
                                                            <tr className='border-b py-3 border-black'>
                                                                <td className='py-3 text-center'>Tanggal Pembayaran</td>
                                                                <td className='py-3 text-center'>{row.original.updated_at}</td>
                                                            </tr>
                                                            <tr className='border-b py-3 border-black'>
                                                                <td className='py-3 text-center'>Tiket Id</td>
                                                                <td className='py-3 text-center'>{row.original.ticket_id}</td>
                                                            </tr>
                                                            <tr className='border-b py-3 border-black'>
                                                                <td className='py-3 text-center'>Tiket Status</td>
                                                                <td className='py-3 text-center'>{row.original.ticket_status}</td>
                                                            </tr>
                                                            <tr className='border-b py-3 border-black'>
                                                                <td className='py-3 text-center'>Tiket Barcode</td>
                                                                <td className='py-3 text-center'>
                                                                    <InertiaLink href={row.original.ticket_barcode || route("transaction.index")}>
                                                                        {row.original.ticket_barcode}
                                                                    </InertiaLink>
                                                                </td>
                                                            </tr>
                                                        </>

                                                    )}
                                                </tbody>
                                            </table>
                                        </>
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
