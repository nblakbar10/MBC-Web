import DashboardAdminLayout from "@/Layouts/DashboardAdminLayout";
import { Inertia } from "@inertiajs/inertia";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { ColumnFiltersState, PaginationState } from '@tanstack/react-table';
import React, { useEffect, useState } from "react";
import route from "ziggy-js";
import { Pagination } from "@/Models/Helper";
import { InertiaLink } from "@inertiajs/inertia-react";
import { TransactionModel } from "@/Models/Transaction";

interface Props {
    transactions: Pagination<TransactionModel>,
}

export default function Index(props: Props) {

    const { transactions } = props;

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    useEffect(() => {
        const url = new URL(route(route().current()!).toString());

        url.searchParams.set('page', (pagination.pageIndex + 1).toString());
        url.searchParams.set('perPage', pagination.pageSize.toString());
        url.searchParams.set('columnFilters', JSON.stringify(columnFilters ?? []));

        Inertia.visit(url.toString(), {
            preserveState: true,
            preserveScroll: true,
            data: {
                page: pagination.pageIndex + 1,
                perPage: pagination.pageSize,
                columnFilters: JSON.stringify(columnFilters),
            },
            only: ["transactions"],
            replace: true,
        })

    }, [pagination, columnFilters]);

    const dataColumns = [
        {
            accessorKey: 'name',
            header: 'Nama Pembeli',
        }, {
            accessorKey: 'ticketType.name',
            header: 'Jenis Tiket',
        }, {
            accessorKey: 'payment_method',
            header: 'Metode Pembayaran',
        }, {
            accessorKey: 'payment_status',
            header: 'Status Pembayaran',
        }, {
            accessorKey: 'ticket_id',
            header: 'Tiket Id',
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
        }
    ] as MRT_ColumnDef<TransactionModel>[];

    return (
        <DashboardAdminLayout title="Riwayat Transaksi">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-6">
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
                                data={transactions.data}
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
                                rowCount={transactions.total}
                                onPaginationChange={setPagination}
                                state={{ pagination, columnFilters }}
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
