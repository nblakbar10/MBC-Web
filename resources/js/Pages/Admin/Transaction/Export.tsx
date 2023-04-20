import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import React, { useEffect, useState } from 'react';
import route from 'ziggy-js';

import DashboardAdminLayout from '@/Layouts/DashboardAdminLayout';
import { InertiaLink } from '@inertiajs/inertia-react';
import { TransactionModel } from '@/Models/Transaction';
import * as XLSX from 'xlsx';

interface Props {
    transactions: Array<TransactionModel>,
}



export default function Index({ transactions }: Props) {
    const marketTable = React.useRef(null);


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
        {
            accessorKey: 'total_amount',
            header: 'Total Pembelian',
        },
        {
            accessorKey: 'email',
            header: 'Email',
        },
        {
            accessorKey: 'phone_number',
            header: 'Nomor Telepon',
        },
        {
            accessorFn(originalRow : TransactionModel) {
                return (
                    <InertiaLink
                        href={originalRow.payment_link}
                        className="bg-blue-500 text-white hover:bg-blue-600 py-3 px-5 rounded-lg text-md font-semibold">
                        {originalRow.payment_link}
                    </InertiaLink>
                );
            },
            header: 'Link Pembayaran',
            id: 'payment_link',
        },
        {
            accessorFn(originalRow) {
                return originalRow.payment_status === 'PAID' ? (
                    <>
                        {originalRow.ticket_id}
                    </>
                ) : (
                    <>Belum Bayar</>
                )
            },
            header: 'ID Tiket',
            id: 'ticket_id',
        },
        {
            accessorFn(originalRow) {
                return originalRow.payment_status === 'PAID' ? (
                    <>
                        {originalRow.ticket_status}
                    </>
                ) : (
                    <>Belum Bayar</>
                )
            },
            header: 'Status Tiket',
            id: 'ticket_status',
        },
        {
            accessorFn(originalRow: TransactionModel) {
                return (
                    <InertiaLink
                        href={originalRow.ticket_barcode ? originalRow.ticket_barcode : '#'}
                        className="bg-blue-500 text-white hover:bg-blue-600 py-3 px-5 rounded-lg text-md font-semibold">
                        {originalRow.ticket_barcode ? originalRow.ticket_barcode : 'Belum Bayar'}
                    </InertiaLink>
                );
            },
            header: 'Barcode Tiket',
            id: 'ticket_barcode',
        },
        
    ] as MRT_ColumnDef<TransactionModel>[];

    function handleExportAll() {
        const table = marketTable.current;
        const wb = XLSX.utils.table_to_book(table);
        XLSX.writeFile(wb, `Transaksi-${new Date().getTime()}.xlsx`);
    }

    return (
        <DashboardAdminLayout title="Export Transaksi">
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                        <div className="p-6 sm:px-20 bg-white border-b border-gray-200">
                            <div className="flex justify-between">
                                <div className="mt-8 text-2xl">
                                    Transaksi Tiket
                                </div>
                                <div className="">
                                    <button
                                        onClick={handleExportAll}
                                        className="bg-blue-500 text-white hover:bg-blue-600 py-3 px-5 rounded-lg text-md font-semibold">
                                        Export Transaksi
                                    </button>
                                </div>
                            </div>
                            <div className="mt-6 text-gray-500">
                                <MaterialReactTable
                                    columns={dataColumns}
                                    data={transactions}
                                    enableColumnActions
                                    enableColumnFilters
                                    enableGlobalFilter={false}
                                    enablePagination
                                    manualPagination
                                    enableSorting
                                    enableBottomToolbar
                                    enableTopToolbar
                                    enableRowNumbers
                                    rowNumberMode='static'
                                    muiTableProps={{
                                        ref: marketTable,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardAdminLayout>
    );
}
