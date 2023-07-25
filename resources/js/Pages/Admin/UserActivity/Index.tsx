import DashboardAdminLayout from "@/Layouts/DashboardAdminLayout";
import { UserActivityModel } from "@/Models/UserActivity";
import { Inertia } from "@inertiajs/inertia";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { ColumnFiltersState, PaginationState } from '@tanstack/react-table';
import React, { useEffect, useState } from "react";
import route from "ziggy-js";
import { Pagination } from "@/Models/Helper";
import { InertiaLink } from "@inertiajs/inertia-react";
import useFilterPagination from "@/Hooks/useFilterPagination";

interface Props {
    //
    userActivities: Pagination<UserActivityModel>,
}

export default function Index(props: Props) {

    const [dataState, setDataState] = useState(props.userActivities);

    const {
        pagination,
        setPagination,
        columnFilters,
        setColumnFilters,
    } = useFilterPagination<UserActivityModel>(
        setDataState,
        'userActivities'
    );

    const dataColumns = [
        {
            accessorKey: 'user.name',
            header: 'Nama Pengguna',
        }, {
            accessorKey: 'activity',
            header: 'Aktivitas',
        }, {
            accessorFn(originalRow) {
                return new Date(originalRow.created_at).toLocaleDateString("id") + '-' + new Date(originalRow.created_at).toLocaleTimeString("id");
            },
            header: 'Waktu',
        }, {
            accessorKey: 'latitude',
            header: 'Latitude',
        }, {
            accessorKey: 'longitude',
            header: 'Longitude',
        },

    ] as MRT_ColumnDef<UserActivityModel>[];

    return (
        <DashboardAdminLayout title="Aktivitas Pengguna">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-6">
                <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                    <div className="p-6 sm:px-20 bg-white border-b border-gray-200 flex flex-col gap-5">
                        <div className="flex justify-between">
                            <div className="flex justify-between">
                                <h1 className="text-2xl font-semibold">Aktivitas Pengguna</h1>
                            </div>
                            <div className="">
                                <InertiaLink
                                    href={route('redeem.index')}
                                    className="bg-blue-500 text-white hover:bg-blue-600 py-3 px-5 rounded-lg text-md font-semibold">
                                    Riwayat Redeem
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
                                    }}
                                rowCount={dataState.total}
                                onPaginationChange={(value) => {
                                    setPagination(value);
                                }}
                                state={{ pagination, columnFilters }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </DashboardAdminLayout>
    );
}
