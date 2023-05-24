import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import React, { useEffect } from 'react';
import route from 'ziggy-js';

import DashboardAdminLayout from '@/Layouts/DashboardAdminLayout';
import { InertiaLink } from '@inertiajs/inertia-react';
import { TicketDiscountModel } from '@/Models/TicketDiscount';
import { Dialog, DialogContent } from '@mui/material';
import { Inertia } from '@inertiajs/inertia';

interface Props {
    ticketDiscounts: Array<TicketDiscountModel>,
}

export default function Index({ ticketDiscounts }: Props) {

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

    console.log(ticketDiscounts);

    const dataColumns = [
        {
            accessorKey: 'name',
            header: 'Nama Diskon',
        }, {
            accessorFn(originalRow) {
                return originalRow.amount + (originalRow.type === 'percentage' ? '%' : '');
            },
            header: 'Besaran',
        }, {
            accessorKey: 'minimum_buy',
            header: 'Minimal Pembelian',
        }, {
            accessorKey: 'stock',
            header: 'Stok',
        }, {
            accessorKey: 'type',
            header: 'Tipe',
        }, {
            accessorKey: 'ticket_type.name',
            header: 'Jenis Tiket',
        }, {
            accessorKey: 'ticket_type.event.name',
            header: 'Event',
        }

    ] as MRT_ColumnDef<TicketDiscountModel>[];
    return (
        <DashboardAdminLayout title="Diskon Tiket">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-6">
                <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                    <div className="p-6 sm:px-20 bg-white border-b border-gray-200 flex flex-col gap-5">
                        <div className="flex justify-between">
                            <div className="mt-8 text-2xl">
                                Daftar Diskon
                            </div>
                            <div className="">
                                <InertiaLink
                                    href={route('ticket-discount.create')}
                                    className="bg-blue-500 text-white hover:bg-blue-600 py-3 px-5 rounded-lg text-md font-semibold">
                                    Tambah Diskon
                                </InertiaLink>
                            </div>
                        </div>
                        <div className="mt-6 text-gray-500">
                            <MaterialReactTable
                                columns={dataColumns}
                                data={ticketDiscounts}
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
                                            <InertiaLink href={route('ticket-discount.edit', row.original.id)}
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
                        <h3 className="font-bold text-lg">Confirm to Delete</h3>
                        <p className="py-4">Are you sure to Delete Ticket Type.</p>
                        <div className="flex justify-end gap-3">
                            <button
                                className="bg-green-500 text-white hover:bg-green-600 py-3 px-5 rounded-lg text-md font-semibold focus:outline-none border-2"
                                onClick={
                                    handleClose
                                }
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-500 text-white hover:bg-red-600 py-3 px-5 rounded-lg text-md font-semibold focus:outline-none border-2"
                                onClick={
                                    () => {
                                        Inertia.post(route('ticket-discount.destroy', deleteId!), {
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
