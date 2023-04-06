import React from 'react';
import route from 'ziggy-js';

import DashboardAdminLayout from '@/Layouts/DashboardAdminLayout';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';
import { Dialog, DialogContent } from '@mui/material';
import { PromoModel } from '@/Models/Promo';

interface Props {
    promo: PromoModel;
}

export default function Show({ promo }: Props) {


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <DashboardAdminLayout title={`${promo.promo_name}`}>
            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                    <div className="p-6 sm:px-20 bg-white border-b border-gray-200">
                        <div className="flex flex-col gap-3 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <div className='flex justify-between'>
                                <div className="text-lg md:text-3xl">
                                    Data Promo
                                </div>
                                <div className="flex flex-col md:flex-row gap-3">
                                    <button
                                        className="bg-blue-500 w-full text-white hover:bg-blue-600 py-3 px-5 rounded-lg text-md font-semibold focus:outline-none border-2"
                                    >
                                        <InertiaLink
                                            href={route('promo.index')}
                                        >
                                            Kembali
                                        </InertiaLink>
                                    </button>
                                    <button
                                        className="bg-yellow-500 w-full text-white hover:bg-yellow-600 py-3 px-5 rounded-lg text-md font-semibold focus:outline-none border-2"
                                    >
                                        <InertiaLink
                                            href={route('promo.edit', promo.id)}
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
                            <table className='w-full'>
                                <thead>
                                    <tr className='border-b py-3 border-black'>
                                        <th className=''>Properti</th>
                                        <th className=''>Keterangan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className='border-b py-3 border-black'>
                                        <td className='py-3 text-center'>Nama Promo</td>
                                        <td className='py-3 text-center'>{promo.promo_name}</td>
                                    </tr>
                                    <tr className='border-b py-3 border-black'>
                                        <td className='py-3 text-center'>Deskripsi Promo</td>
                                        <td className='py-3 text-center'>{promo.description}</td>
                                    </tr>
                                    <tr className='border-b py-3 border-black'>
                                        <td className='py-3 text-center'>Stok Promo</td>
                                        <td className='py-3 text-center'>{promo.stocks}</td>
                                    </tr>
                                    <tr className='border-b py-3 border-black'>
                                        <td className='py-3 text-center'>Harga Promo</td>
                                        <td className='py-3 text-center'>{promo.price}</td>
                                    </tr>
                                </tbody>
                            </table>
                            
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
                                        Inertia.post(route('promo.destroy', promo.id), {
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
