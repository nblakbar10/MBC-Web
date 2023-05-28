import React from 'react';
import route from 'ziggy-js';

import DashboardAdminLayout from '@/Layouts/DashboardAdminLayout';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';
import { Dialog, DialogContent } from '@mui/material';
import { EventModel } from '@/Models/Event';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { TicketTypeModel } from '@/Models/TicketType';
import ZoomableImage from '@/Components/ZoomableImage';
import parse from 'html-react-parser';


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

    return (
        <DashboardAdminLayout title={`${event.name}`}>
            <div className="py-10 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-md sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
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
                        <div className="flex flex-col gap-3 mt-3">
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
                                    <tr className='py-3'>
                                        <td className='py-3 text-center'>Lokasi</td>
                                        <td className='py-3 text-center'>{event.location}</td>
                                    </tr>
                                    <tr className='py-3'>
                                        <td className='py-3 text-center'>Tanggal Dimulai</td>
                                        <td className='py-3 text-center'>{event.start_date}</td>
                                    </tr>
                                    <tr className='py-3'>
                                        <td className='py-3 text-center'>Tanggal Berakhir</td>
                                        <td className='py-3 text-center'>{event.end_date}</td>
                                    </tr>
                                    <tr className='py-3'>
                                        <td className='py-3 text-center'>Maksimum Pembelian</td>
                                        <td className='py-3 text-center'>{event.maximum_buy}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className='grid grid-cols-1 lg:grid-cols-3 mt-3 gap-3'>
                                <div>
                                    <label className='flex justify-center font-bold'>Poster</label>
                                    <ZoomableImage
                                        img={event.poster_url}
                                        title={"Peta"}
                                        onChange={_ => { }}
                                    />
                                </div>
                                <div>
                                    <label className='flex justify-center font-bold '>Peta</label>
                                    <ZoomableImage
                                        img={event.event_map_url}
                                        title={"Peta"}
                                        onChange={_ => { }}
                                    />
                                </div>
                                <div>
                                    <label className='flex justify-center font-bold'>Preview</label>
                                    <ZoomableImage
                                        img={event.preview_url}
                                        title={"Preview"}
                                        onChange={_ => { }}
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <div className='text-2xl font-semibold my-4'>
                                    Deskripsi Event
                                </div>
                                <div
                                    className='prose border-2 border-gray-200 p-3'
                                >
                                    {parse(event.description)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-2 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-md sm:rounded-lg">
                    <div className="p-6 sm:px-20 bg-white border-b border-gray-200">
                        <div className='flex flex-col mt-1 p-3 '>
                            <div className='flex justify-between mb-2'>
                                <div className="text-lg md:text-3xl">
                                    Promo Event
                                </div>
                            </div>
                            {/* <MaterialReactTable
                                    columns={dataColumns}
                                    data={event}
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
                                    )}/> */}
                        </div>
                    </div>
                </div>
            </div>
            <Dialog open={open} onClose={handleClose}
            >
                <DialogContent className="w-full">
                    <div>
                        <h3 className="font-bold text-lg">Konfirmasi Aksi</h3>
                        <p className="py-4">Anda Yakin Menghapus Event?</p>
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
