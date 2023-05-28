import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import React, { useEffect } from 'react';
import route from 'ziggy-js';

import DashboardAdminLayout from '@/Layouts/DashboardAdminLayout';
import { InertiaLink } from '@inertiajs/inertia-react';
import { TicketTypeModel } from '@/Models/TicketType';
import { Inertia } from '@inertiajs/inertia';
import { EventModel } from '@/Models/Event';
import { Dialog, DialogContent } from '@mui/material';

interface Props {
    ticketTypes: Array<TicketTypeModel>,
    events: Array<EventModel>,
}

export default function Index(props: Props) {

    const { ticketTypes, events } = props;

    const [eventId, setEventId] = React.useState<number>(-1);

    const [deleteId, setDeleteId] = React.useState<number | null>(null);

    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        if (deleteId !== null) {
            setOpen(true);
        } else {
            setOpen(false);
            setDeleteId(null);
        }
    }, [deleteId]);

    const handleClose = () => {
        setOpen(false);
        setDeleteId(null);
    };

    useEffect(() => {
        const url = new URL(route(route().current()!).toString());

        if (eventId !== -1 && eventId !== 0) {
            url.searchParams.set('event', eventId.toString());
        } else {
            url.searchParams.delete('event');
            if (eventId === -1) return;
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
            header: 'Nama Promo',
        }, {
            accessorKey: 'stock',
            header: 'Stok',
        }, {
            accessorKey: 'maximum_buy',
            header: 'Maksimal Pembelian',
        }, {
            accessorFn: (originalRow) => {
                return `Rp. ${originalRow.price.toLocaleString('id-ID')}`
            },
            header: 'Harga',
        }, {
            accessorKey: 'event.name',
            header: 'Event',
        }

    ] as MRT_ColumnDef<TicketTypeModel>[];
    return (
        <DashboardAdminLayout title="Jenis Tiket">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-6">
                <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                    <div className="p-6 sm:px-20 bg-white border-b border-gray-200 flex flex-col gap-5">
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
                                    <option value="-1">Pilih Event</option>
                                    <option value="0">Semua Event</option>
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
                                Daftar Jenis Tiket {eventId !== -1 && eventId !== 0 ? `Event ${events.find((event) => event.id === eventId)?.name}` : ''}
                            </div>
                            <div className="">
                                <InertiaLink
                                    href={route('ticket-type.create')}
                                    className="bg-blue-500 text-white hover:bg-blue-600 py-3 px-5 rounded-lg text-md font-semibold">
                                    Tambah Jenis Tiket
                                </InertiaLink>
                            </div>
                        </div>
                        <div className="mt-6 text-gray-500">
                            <MaterialReactTable
                                columns={dataColumns}
                                data={ticketTypes}
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
                                    <div className='flex gap-2'>
                                        <div className="flex items-center justify-center gap-2">
                                            <InertiaLink href={route('ticket-type.edit', row.original.id)}
                                                className="bg-yellow-500 text-white hover:bg-yellow-600 py-3 px-5 rounded-lg text-md font-semibold">
                                                Edit
                                            </InertiaLink>
                                        </div>
                                        <div
                                            className="bg-red-500 text-white hover:bg-red-600 py-3 px-5 rounded-lg text-md font-semibold focus:outline-none border-2"
                                            onClick={() => {
                                                setDeleteId(row.original.id);
                                            }}
                                        >
                                            Delete
                                        </div>
                                    </div>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Dialog open={open} onClose={handleClose}
            >
                <DialogContent className="w-full">
                    <div>
                        <h3 className="font-bold text-lg">Konfirmasi Aksi</h3>
                        <p className="py-4">Anda Yakin Menghapus Diskon Tiket?</p>
                        <div className="flex justify-between gap-3">
                            <button
                                className="bg-green-500 text-white hover:bg-green-600 py-3 w-1/3 rounded-lg text-md font-semibold focus:outline-none border-2"
                                onClick={
                                    handleClose
                                }
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-500 text-white hover:bg-red-600 py-3 w-1/3 rounded-lg text-md font-semibold focus:outline-none border-2"
                                onClick={
                                    () => {
                                        Inertia.post(route('ticket-type.destroy', deleteId!), {
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
    );
}
