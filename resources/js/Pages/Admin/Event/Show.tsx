import React from 'react';
import route from 'ziggy-js';

import DashboardAdminLayout from '@/Layouts/DashboardAdminLayout';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';
import { Dialog, DialogContent } from '@mui/material';
import { EventModel } from '@/Models/Event';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';

interface Props {
    event: EventModel;
}

export default function Show({ event }: Props) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const dataColumns = [
        {
            accessorKey: 'name',
            header: 'Nama Event',
        },
    ] as MRT_ColumnDef<typeof event.eventPromos[0]>[];

    return (
        <DashboardAdminLayout title={`${event.name}`}>
            <div className="py-10 max-w-5xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-md sm:rounded-lg">
                    <div className="p-6 sm:px-20 bg-white border-b border-gray-200">
                            <div className='flex justify-between mb-2'>
                                <div className="text-lg md:text-3xl">
                                    Data Event
                                </div>
                                <div className="flex flex-col md:flex-row gap-3">
                                    <button
                                        className="bg-blue-500 w-full text-white hover:bg-blue-600 py-3 px-5 rounded-lg text-md font-semibold focus:outline-none border-2"
                                    >
                                        <InertiaLink
                                            href={route('event.index')}
                                        >
                                            Kembali
                                        </InertiaLink>
                                    </button>
                                    <button
                                        className="bg-yellow-500 w-full text-white hover:bg-yellow-600 py-3 px-5 rounded-lg text-md font-semibold focus:outline-none border-2"
                                    >
                                        <InertiaLink
                                            href={route('event.edit', event.id)}
                                        >
                                            Edit
                                        </InertiaLink>
                                    </button>
                                    <div className="flex flex-col justify-center" >
                                        <button
                                            className="bg-red-500 w-full text-white hover:bg-red-600 py-3 px-5 rounded-lg text-md font-semibold focus:outline-none border-2"
                                            onClick={handleClickOpen}
                                        >
                                            <label htmlFor="my-modal">Delete</label>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        <div className="flex flex-col gap-3 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className='w-full'>
                                <thead>
                                    <tr className='border-b py-3 border-black'>
                                        <th className=''>Properti</th>
                                        <th className=''>Keterangan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className='py-3'>
                                        <td className='py-3 text-center'>Nama</td>
                                        <td className='py-3 text-center'>{event.name}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-2 max-w-5xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-md sm:rounded-lg">
                    <div className="p-6 sm:px-20 bg-white border-b border-gray-200">
                            <div className='flex flex-col mt-1 p-3 '>
                                <div className='flex justify-between mb-2'>
                                    <div className="text-lg md:text-3xl">
                                        Promo Event
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-3">
                                        <button
                                            className="bg-yellow-500 w-full text-white hover:bg-yellow-600 py-3 px-5 rounded-lg text-md font-semibold focus:outline-none border-2"
                                        >
                                            <InertiaLink
                                                href={route('event.edit', event.id)}
                                            >
                                                Edit
                                            </InertiaLink>
                                        </button>
                                        <div className="flex flex-col justify-center" >
                                            <button
                                                className="bg-red-500 w-full text-white hover:bg-red-600 py-3 px-5 rounded-lg text-md font-semibold focus:outline-none border-2"
                                                onClick={handleClickOpen}
                                            >
                                                <label htmlFor="my-modal">Delete</label>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <MaterialReactTable
                                    columns={dataColumns}
                                    data={event.eventPromos}
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
                                    )}/>
                            </div>
                        </div>
                    </div>
                </div>
            <Dialog open={open} onClose={handleClose}
            >
                <DialogContent className="w-full">
                    <div>
                        <h3 className="font-bold text-lg">Confirm to Delete</h3>
                        <p className="py-4">Are you sure to do this.</p>
                        <div className="flex justify-end">
                            <button
                                className="bg-red-500 text-white hover:bg-red-600 py-3 px-5 rounded-lg text-md font-semibold focus:outline-none border-2"
                                onClick={
                                    () => {
                                        Inertia.post(route('event.destroy', event.id), {
                                            _method: 'DELETE',
                                        });
                                    }
                                }
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </DashboardAdminLayout>
    )
}
