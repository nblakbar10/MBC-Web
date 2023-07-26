import React from 'react';
import route from 'ziggy-js';

import DashboardAdminLayout from '@/Layouts/DashboardAdminLayout';
import { User } from '@/types';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';
import { Dialog, DialogContent } from '@mui/material';

interface Props {
    user: User;
}

export default function Show(props: Props) {
    let user = props.user;
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <DashboardAdminLayout title={`Pengguna ${user.name}`}>
            <div className="py-10 mx-auto sm:px-6 md:px-6 lg:px-6 xl:px-6">
                <div className="bg-white sm:rounded-lg">
                    <div className="p-6 bg-[#ffffff] border-b border-gray-200 flex flex-col gap-3 sm:rounded-lg">
                        <div className='border-b-cyan-200  '>
                            <div className='flex justify-between'>
                                <div className="text-lg md:text-3xl">
                                    Data Profil
                                </div>
                                <div className="flex flex-col md:flex-row gap-3">
                                    <button
                                        className="bg-blue-500 text-white hover:bg-blue-600 py-3 px-5 rounded-lg text-md font-semibold focus:outline-none border-2"
                                    >
                                        <InertiaLink
                                            href={route('user.index')}
                                        >
                                            Kembali
                                        </InertiaLink>
                                    </button>
                                    <button
                                        className="bg-yellow-500 text-white hover:bg-yellow-600 py-3 px-5 rounded-lg text-md font-semibold focus:outline-none border-2"
                                    >
                                        <InertiaLink
                                            href={route('user.edit', user.id)}
                                        >
                                            Edit
                                        </InertiaLink>
                                    </button>
                                    <div className="flex flex-col justify-center" >
                                        <button
                                            className="bg-red-500 text-white hover:bg-red-600 py-3 px-5 rounded-lg text-md font-semibold focus:outline-none border-2"
                                            onClick={handleClickOpen}
                                        >
                                            <label htmlFor="my-modal">Delete</label>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white shadow-sm shadow-neutral-700 sm:rounded-lg mt-4">
                            <div className='overflow-x-auto'>
                                <table className='min-w-full text-left text-sm font-light'>
                                    <thead className='border-b font-medium dark:border-neutral-500'>
                                        <tr>
                                            <th scope="col" className="px-6 py-4">No</th>
                                            <th scope="col" className="px-6 py-4">Properti</th>
                                            <th scope="col" className="px-6 py-4">Keterangan</th>
                                        </tr>
                                    </thead>
                                    <tbody className='justify-center'>
                                        <tr className='border-b dark:border-neutral-500'>
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">1</td>
                                            <td className='whitespace-nowrap px-6 py-4'>Nama</td>
                                            <td className='whitespace-nowrap px-6 py-4'>{user.name}</td>
                                        </tr>
                                        <tr className='border-b dark:border-neutral-500'>
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">2</td>
                                            <td className='whitespace-nowrap px-6 py-4'>Email</td>
                                            <td className='whitespace-nowrap px-6 py-4'>{user.email}</td>
                                        </tr>
                                        <tr className='border-b dark:border-neutral-500'>
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">3</td>
                                            <td className='whitespace-nowrap px-6 py-4'>No Telepon</td>
                                            <td className='whitespace-nowrap px-6 py-4'>{user.phone_number}</td>
                                        </tr>
                                        <tr className='border-b dark:border-neutral-500'>
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">4</td>
                                            <td className='whitespace-nowrap px-6 py-4'>Status</td>
                                            <td className='whitespace-nowrap px-6 py-4'>{user.roles.map((role) => role.name).join(', ')}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
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
                                        Inertia.post(route('user.destroy', user.id), {
                                            _method: 'DELETE',
                                        });
                                    }
                                }
                            >Yes</button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </DashboardAdminLayout>
    )
}
