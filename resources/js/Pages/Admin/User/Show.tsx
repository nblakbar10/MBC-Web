import React from 'react';
import route from 'ziggy-js';

import DashboardAdminLayout from '@/Layouts/DashboardAdminLayout';
import { User } from '@/types';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';

interface Props {
    user: User;
}

export default function Show(props: Props) {
    let user = props.user;

    return (
        <DashboardAdminLayout title={`Pengguna ${user.name}`}>
            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                    <div className="p-6 sm:px-20 bg-white border-b border-gray-200">
                        <div className="flex flex-col gap-3 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <div className='flex justify-between'>
                                <div className="text-lg md:text-3xl">
                                    Data Profil
                                </div>
                                <div className="flex flex-col md:flex-row gap-3">
                                    <InertiaLink
                                        className="btn btn-square btn-primary rounded py-2 px-10  focus:outline-none border-2"
                                        href={route('user.index')}
                                    >
                                        Kembali
                                    </InertiaLink>
                                    <InertiaLink
                                        className="btn btn-square btn-warning rounded py-2 px-10  focus:outline-none border-2"
                                        href={route('user.edit', user.id)}
                                    >
                                        Edit
                                    </InertiaLink>
                                    <button
                                        type="submit"
                                        className="btn btn-square btn-error rounded  py-2 px-10 focus:outline-none border-2 "
                                    >
                                        <label htmlFor="my-modal">Delete</label>
                                    </button>
                                    <input type="checkbox" id="my-modal" className="modal-toggle" />
                                    <div className="modal">
                                        <div className="modal-box">
                                            <h3 className="font-bold text-lg">Confirm to Delete</h3>
                                            <p className="py-4">Are you sure to do this.</p>
                                            <div className="modal-action">
                                                <label htmlFor="my-modal" className="btn btn-error"
                                                    onClick={
                                                        () => {
                                                            Inertia.post(route('user.destroy', user.id), {
                                                                _method: 'DELETE',
                                                            });
                                                        }
                                                    }
                                                >Yes</label>
                                                <label htmlFor="my-modal" className="btn">No!</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <table className='table table-zebra w-full'>
                                <thead>
                                    <tr>
                                        <th className=''>Properti</th>
                                        <th className=''>Keterangan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className=''>Nama</td>
                                        <td className=''>{user.name}</td>
                                    </tr>
                                    <tr>
                                        <td className=''>Email</td>
                                        <td className=''>{user.email}</td>
                                    </tr>
                                    <tr>
                                        <td className=''>No Telepon</td>
                                        <td className=''>{user.phone_number}</td>
                                    </tr>
                                    <tr>
                                        <td className=''>Status</td>
                                        <td className=''>{user.roles.map((role) => role.name).join(', ')}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardAdminLayout>
    )
}
