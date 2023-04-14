import React from 'react';
import route from 'ziggy-js';

import DashboardAdminLayout from '@/Layouts/DashboardAdminLayout';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';
import { Dialog, DialogContent } from '@mui/material';
import { DiscountModel } from '@/Models/Discount';

interface Props {
    discount: DiscountModel;
}

export default function Show({ discount }: Props) {


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <DashboardAdminLayout title={`${discount.name}`}>
            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                    <div className="p-6 sm:px-20 bg-white border-b border-gray-200">
                        <div className="flex flex-col gap-3 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <div className='flex justify-between'>
                                <div className="text-lg md:text-3xl">
                                    Data Diskon
                                </div>
                                <div className="flex flex-col md:flex-row gap-3">
                                    <button
                                        className="bg-blue-500 w-full text-white hover:bg-blue-600 py-3 px-5 rounded-lg text-md font-semibold focus:outline-none border-2"
                                    >
                                        <InertiaLink
                                            href={route('discount.index')}
                                        >
                                            Kembali
                                        </InertiaLink>
                                    </button>
                                    <button
                                        className="bg-yellow-500 w-full text-white hover:bg-yellow-600 py-3 px-5 rounded-lg text-md font-semibold focus:outline-none border-2"
                                    >
                                        <InertiaLink
                                            href={route('discount.edit', discount.id)}
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
                                        <td className='py-3 text-center'>Nama discount</td>
                                        <td className='py-3 text-center'>{discount.name}</td>
                                    </tr>
                                    <tr className='border-b py-3 border-black'>
                                        <td className='py-3 text-center'>Promo Id discount</td>
                                        <td className='py-3 text-center'>{discount.promo_id}</td>
                                    </tr>
                                    <tr className='border-b py-3 border-black'>
                                        <td className='py-3 text-center'>Minimum Order discount</td>
                                        <td className='py-3 text-center'>{discount.minimum_order}</td>
                                    </tr>
                                    <tr className='border-b py-3 border-black'>
                                        <td className='py-3 text-center'>Type discount</td>
                                        <td className='py-3 text-center'>{discount.type}</td>
                                    </tr>
                                    <tr className='border-b py-3 border-black'>
                                        <td className='py-3 text-center'>Deduction discount</td>
                                        <td className='py-3 text-center'>{discount.deduction}</td>
                                    </tr>
                                    <tr className='border-b py-3 border-black'>
                                        <td className='py-3 text-center'>Quota discount</td>
                                        <td className='py-3 text-center'>{discount.quota}</td>
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
                                        Inertia.post(route('discount.destroy', discount.id), {
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
