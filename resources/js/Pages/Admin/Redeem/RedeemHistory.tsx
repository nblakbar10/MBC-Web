import DashboardAdminLayout from "@/Layouts/DashboardAdminLayout";
import { Inertia } from "@inertiajs/inertia";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { ColumnFiltersState, PaginationState } from '@tanstack/react-table';
import React, { useEffect, useState } from "react";
import route from "ziggy-js";
import { Pagination } from "@/Models/Helper";
import { InertiaLink } from "@inertiajs/inertia-react";
import { RedeemHistoryModel } from "@/Models/RedeemHistory";
import useFilterPagination from "@/Hooks/useFilterPagination";

interface Props {
    //
    redeemHistories: RedeemHistoryModel[],
}

export default function Index({ redeemHistories }: Props) {

    const dataColumns = [
        {
            accessorKey: 'transaction.name',
            header: 'Nama Pembeli',
        }, {
            accessorKey: 'transaction.ticketType.name',
            header: 'Jenis Tiket',
        }, {
            accessorKey: 'amount',
            header: 'Jumlah',
        }, {
            accessorKey: 'transaction.ticket_id',
            header: 'ID Tiket',
        }, {
            accessorFn(originalRow) {
                return new Date(originalRow.created_at).toLocaleDateString("id") + '-' + new Date(originalRow.created_at).toLocaleTimeString("id");
            },
            header: 'Waktu',
        }, {
            accessorKey: 'user.name',
            header: 'Nama Penukar',
        }, {
            accessorKey: 'latitude',
            header: 'Latitude',
        }, {
            accessorKey: 'longitude',
            header: 'Longitude',
        },

    ] as MRT_ColumnDef<RedeemHistoryModel>[];

    return (
        <DashboardAdminLayout title="Riwayat Redeem">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-6">
                <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                    <div className="p-6 sm:px-20 bg-white border-b border-gray-200 flex flex-col ">
                        <div className="flex justify-between">
                            <div className="flex justify-between">
                                <h1 className="mt-4 text-2xl font-semibold">Riwayat Redeem</h1>
                            </div>
                            <div className="mt-4">
                                <InertiaLink
                                    href={route('redeem.create')}
                                    className="bg-blue-500 text-white hover:bg-blue-600 py-3 px-5 rounded-lg text-md font-semibold">
                                    Redeem Tiket
                                </InertiaLink>
                            </div>
                        </div>
                        <div className="mt-6 text-gray-500">
                            <MaterialReactTable
                                columns={dataColumns}
                                data={redeemHistories}
                                enableColumnActions
                                enableColumnFilters
                                enablePagination
                                enableSorting
                                enableGlobalFilter={false}
                                enableBottomToolbar
                                enableTopToolbar
                                enableRowNumbers
                                muiTableBodyRowProps={{ hover: false }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </DashboardAdminLayout>
    );
}
