import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import React, { useEffect, useState } from 'react';
import route from 'ziggy-js';

import DashboardAdminLayout from '@/Layouts/DashboardAdminLayout';
import { InertiaLink } from '@inertiajs/inertia-react';
import { Pagination } from '@/Models/Helper';
import { Inertia } from '@inertiajs/inertia';
import { TicketModel } from '@/Models/Ticket';

interface Props {
    tickets: Array<TicketModel>,
}

export default function Index({ tickets }: Props) {

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
    //         only: ["tickets"],
    //         replace: true,
    //     })

    // }, [pagination]);

    const dataColumns = [
        {
            accessorKey: 'ticket_name',
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
            accessorKey: 'ticket_category',
            header: 'Jenis Promo',
        },
        {
            accessorKey: 'ticket_status',
            header: 'Status',
        }
    ] as MRT_ColumnDef<TicketModel>[];

    return (
        <DashboardAdminLayout title="Tiket">
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                        <div className="p-6 sm:px-20 bg-white border-b border-gray-200">
                            <div className="flex justify-between">
                                <div className="mt-8 text-2xl">
                                    Daftar Tiket
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
                                    data={tickets}
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
                                    manualPagination
                                    enableSorting
                                    enableBottomToolbar
                                    enableTopToolbar
                                    enableRowNumbers
                                    enableExpanding
                                    enableExpandAll
                                    muiTableBodyRowProps={{ hover: false }}
                                    // rowCount={tickets.total}
                                    // onPaginationChange={setPagination}
                                    // state={{ pagination, columnFilters, globalFilter }}
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
                                                    <td className='py-3 text-center'>Id Eksternal</td>
                                                    <td className='py-3 text-center'>{row.original.external_id}</td>
                                                </tr>
                                                <tr className='border-b py-3 border-black'>
                                                    <td className='py-3 text-center'>Id Tiket</td>
                                                    <td className='py-3 text-center'>{row.original.ticket_id}</td>
                                                </tr>
                                                <tr className='border-b py-3 border-black'>
                                                    <td className='py-3 text-center'>Jumlah Tiket</td>
                                                    <td className='py-3 text-center'>{row.original.ticket_qty}</td>
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
