import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import React, { useEffect, useState } from 'react';
import route from 'ziggy-js';

import DashboardAdminLayout from '@/Layouts/DashboardAdminLayout';
import { InertiaLink } from '@inertiajs/inertia-react';
import { TransactionModel } from '@/Models/Transaction';
import * as XLSX from 'xlsx';
import { EventModel } from '@/Models/Event';
import { Inertia } from '@inertiajs/inertia';

interface Props {
    transactions: Array<TransactionModel>,
    events: Array<EventModel>,
}



export default function Index({ transactions, events }: Props) {
    const transactionTable = React.useRef(null);

    const [eventId, setEventId] = React.useState<number>(-1);

    useEffect(() => {
        const url = new URL(route(route().current()!).toString());

        if (eventId !== -1) {
            url.searchParams.set('event_id', eventId.toString());
        } else {
            url.searchParams.delete('event_id');
        }

        Inertia.visit(url.toString(), {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        })

    }, [eventId]);

    const dataColumns = [
        {
            accessorKey: 'name',
            header: 'Nama Pembeli',
        }, {
            accessorKey: 'email',
            header: 'Email Pembeli',
        }, {
            accessorKey: 'phone_number',
            header: 'Nomor Telepon',
        }, {
            accessorKey: 'ticketType.name',
            header: 'Jenis Tiket',
        }, {
            accessorKey: 'ticketType.event.name',
            header: 'Event',
        }, {
            accessorKey: 'ticket_amount',
            header: 'Jumlah Tiket',
        }, {
            accessorKey: 'total_price',
            header: 'Total Harga',
        }, {
            accessorFn(originalRow) {
                return new Date(originalRow.buy_date).toLocaleDateString("id") + '-' + new Date(originalRow.buy_date).toLocaleTimeString("id");
            },
            header: 'Waktu Pembelian',
        }, {
            accessorFn(originalRow) {
                return new Date(originalRow.buy_date).toLocaleDateString("id") + '-' + new Date(originalRow.buy_date).toLocaleTimeString("id");
            },
            header: 'Waktu Pembayaran',
        }, {
            accessorKey: 'payment_method',
            header: 'Metode Pembayaran',
        }, {
            accessorKey: 'payment_status',
            header: 'Status Pembayaran',
        }, {
            accessorKey: 'payment_link',
            header: 'Tautan Pembayaran',
        }, {
            accessorKey: 'external_id',
            header: 'ID Pembayaran',
        }, {
            accessorKey: 'ticket_id',
            header: 'ID Tiket',
        }, {
            accessorKey: 'ticket_status',
            header: 'Status Tiket',
        }, {
            accessorKey: 'ticket_barcode_url',
            header: 'Tautan Barcode',
        }, {
            accessorKey: 'redeemed_amount',
            header: 'Jumlah Tiket Diredeem',
        },
        {
            accessorFn(originalRow) {
                return originalRow.transaction_discounts?.map((discount) => discount.name).join(', ');
            },
            header: 'Diskon Tiket',
        }

    ] as MRT_ColumnDef<TransactionModel>[];

    function handleExportAll() {
        const table = transactionTable.current;
        const wb = XLSX.utils.table_to_book(table);
        XLSX.writeFile(wb, `Transaksi-${new Date().getTime()}.xlsx`);
    }

    return (
        <DashboardAdminLayout title="Export Transaksi">
            <div className="py-12 max-w-7xl mx-auto">
                <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg p-3">
                    <div className="p-6 sm:px-20 bg-white border-b border-gray-200">
                        <div className='flex gap-3'>
                            <div className="text-lg md:text-3xl">
                                Pilih Event
                            </div>
                            <div>
                                <select
                                    className="w-full border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                                    name="event"
                                    id="event"
                                    onChange={(e) => {
                                        setEventId(parseInt(e.target.value));
                                    }}
                                >
                                    <option value="-1">Semua Event</option>
                                    {events.map((event) => (
                                        <option key={event.id} value={event.id}>
                                            {event.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div className="mt-8 text-2xl">
                                Export Transaksi Tiket
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
                                    ref: transactionTable,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </DashboardAdminLayout>
    );
}
