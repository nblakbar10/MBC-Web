import DashboardAdminLayout from "@/Layouts/DashboardAdminLayout";
import { UserActivityModel } from "@/Models/UserActivity";
import { Inertia } from "@inertiajs/inertia";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { ColumnFiltersState, PaginationState } from '@tanstack/react-table';
import React, { useEffect, useState } from "react";
import route from "ziggy-js";
import { Pagination } from "@/Models/Helper";
import { InertiaLink } from "@inertiajs/inertia-react";

interface Props {
    //
    userActivities: Pagination<UserActivityModel>,
}

export default function Index(props: Props) {

    const { userActivities } = props;

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
            only: ["userActivities"],
            replace: true,
        })

    }, [pagination, columnFilters, globalFilter]);

    const dataColumns = [
        {
            accessorKey: 'user.name',
            header: 'Nama Pengguna',
        },{
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
                                data={userActivities.data}
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
                                rowCount={userActivities.total}
                                onPaginationChange={setPagination}
                                state={{ pagination, columnFilters, globalFilter }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </DashboardAdminLayout>
    );
}
