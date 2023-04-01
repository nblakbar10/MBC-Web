import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import React from 'react';
import route from 'ziggy-js';

import AppLayout from '@/Layouts/DashboardAdminLayout';
import { InertiaLink } from '@inertiajs/inertia-react';
import { EventPromoModel } from '@/Models/EventPromo';

interface Props {
    eventPromos?: Array<EventPromoModel>,
}

export default function Index({ eventPromos }: Props) {
    
    if (!eventPromos) {
        eventPromos = [
            {
                id: 1,
                name: 'Event Promo 1',
                event: {
                    id: 1,
                    name: 'Event 1',
                }
            },
            {
                id: 2,
                name: 'Event Promo 2',
                event: {
                    id: 1,
                    name: 'Event 1',
                }
            },
            {
                id: 3,
                name: 'Event Promo 3',
                event: {
                    id: 1,
                    name: 'Event 2',
                }
            },
        ];
    }

    const dataColumns = [
        {
            accessorKey: 'name',
            header: 'Nama Promo',
        },
        {
            accessorKey: 'event.name',
            header: 'Nama Event',
        }
    ] as MRT_ColumnDef<EventPromoModel>[];
    return (
        <AppLayout title="Events">
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                        <div className="p-6 sm:px-20 bg-white border-b border-gray-200">
                            <div className="flex justify-between">
                                <div className="mt-8 text-2xl">
                                    Events
                                </div>
                                <div className="">
                                    <InertiaLink
                                        href={route('event.create')}
                                        className="bg-blue-500 text-white hover:bg-blue-600 py-3 px-5 rounded-lg text-md font-semibold">
                                        Tambah Event
                                    </InertiaLink>
                                </div>
                            </div>
                            <div className="mt-6 text-gray-500">
                                <MaterialReactTable
                                    columns={dataColumns}
                                    data={eventPromos}
                                    enableColumnActions
                                    enableColumnFilters
                                    enablePagination
                                    enableSorting
                                    enableBottomToolbar
                                    enableTopToolbar
                                    enableRowActions
                                    enableRowNumbers
                                    muiTableBodyRowProps={{ hover: false }}
                                    renderRowActions={({ row }) => (
                                        <div className="flex items-center justify-center gap-2">
                                            <InertiaLink href={route('event-promo.show', row.original.id)} 
                                                className="bg-blue-500 text-white hover:bg-blue-600 py-3 px-5 rounded-lg text-md font-semibold">
                                                Show
                                            </InertiaLink>
                                        </div>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
