import DashboardAdminLayout from "@/Layouts/DashboardAdminLayout";
import { Inertia } from "@inertiajs/inertia";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { ColumnFiltersState, PaginationState } from '@tanstack/react-table';
import React, { useEffect, useMemo, useState } from "react";
import route from "ziggy-js";
import { Pagination } from "@/Models/Helper";
import { InertiaLink } from "@inertiajs/inertia-react";
import { TransactionModel } from "@/Models/Transaction";
import useFilterPagination from "@/Hooks/useFilterPagination";

interface Props {
    transactions: Pagination<TransactionModel>,
}

export default function Index(props: Props) {

    const [dataState, setDataState] = useState(props.transactions);

    const {
        pagination,
        setPagination,
        columnFilters,
        setColumnFilters,
    } = useFilterPagination<TransactionModel>(
        setDataState,
        'transactions'
        );

    const dataColumns = [
        {
            accessorKey: 'name',
            header: 'Nama Pembeli',
        }, {
            accessorKey: 'ticket_type.name',
            header: 'Jenis Tiket',
        },
        {
            accessorKey: 'ticket_type.event.name',
            header: 'Event',
        },
        {
            accessorKey: 'payment_method',
            header: 'Metode Pembayaran',
        }, {
            accessorKey: 'payment_status',
            header: 'Status Pembayaran',
        }, {
            accessorKey: 'ticket_id',
            header: 'Tiket Id',
        },
        {
            header: 'Diskon Tiket',
            accessorFn(originalRow) {
                return originalRow.transaction_discounts && originalRow.transaction_discounts?.length > 0 ? originalRow.transaction_discounts[0].name : 'Tidak Ada Diskon';
            }
        },
        {
            accessorFn(originalRow) {
                return new Date(originalRow.buy_date).toLocaleDateString("id") + '-' + new Date(originalRow.buy_date).toLocaleTimeString("id");
            },
            header: 'Waktu Pembelian',
        }, {
            accessorFn(originalRow) {
                return new Date(originalRow.buy_date).toLocaleDateString("id") + '-' + new Date(originalRow.buy_date).toLocaleTimeString("id");
            },
            header: 'Waktu Pembayaran',
        }
    ] as MRT_ColumnDef<TransactionModel>[];

    return (
        <DashboardAdminLayout title="Riwayat Transaksi">
            <div className=" max-w-7xl mx-auto sm:px-6 lg:px-8 mt-6">
                <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                    <div className="p-6 sm:px-20 bg-white border-b border-gray-200 flex flex-col gap-5">
                        <div className="flex justify-between">
                            <div className="flex justify-between">
                                <h1 className="text-2xl font-semibold">Riwayat Transaksi Keseluruhan</h1>
                            </div>
                            <div className="">
                                <InertiaLink
                                    href={route('transaction.export-view')}
                                    className="bg-blue-500 text-white hover:bg-blue-600 py-3 px-5 rounded-lg text-md font-semibold">
                                    Export Transaksi
                                </InertiaLink>
                            </div>
                        </div>
                        <div className="mt-6 text-gray-500">
                            <MaterialReactTable
                                columns={dataColumns}
                                data={dataState.data}
                                enableColumnActions
                                enableColumnFilters
                                enablePagination
                                enableSorting
                                enableGlobalFilter={false}
                                enableBottomToolbar
                                enableTopToolbar
                                enableRowNumbers
                                muiTableBodyRowProps={{ hover: false }}
                                onColumnFiltersChange={
                                    (value) => {
                                        setColumnFilters(value);
                                        setPagination({ ...pagination, pageIndex: 0 });
                                    }}
                                rowCount={dataState.total}
                                onPaginationChange={setPagination}
                                state={{ pagination, columnFilters }}
                                renderDetailPanel={({ row }) => (
                                    <>
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
                                                    <td className='py-3 text-center'>Rp. {row.original.total_price.toLocaleString()}</td>
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
                                                    <td className='py-3 text-center'>Jumlah Redeem</td>
                                                    <td className='py-3 text-center'>{row.original.redeemed_amount}</td>
                                                </tr>
                                                {row.original.ticket_id && (
                                                    <>
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
                                                                <InertiaLink href={row.original.ticket_barcode_url || route("transaction.index")}>
                                                                    {row.original.ticket_barcode_url}
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
        </DashboardAdminLayout>
    );
}

