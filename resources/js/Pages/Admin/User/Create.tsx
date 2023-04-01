import React from 'react';
import route from 'ziggy-js';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

import AppLayout from '@/Layouts/DashboardAdminLayout';
import { NewUser, Role } from '@/types';
import { InertiaLink, useForm } from '@inertiajs/inertia-react';

import Form from './Form';

interface Props{
    roles : Array<Role>,
}

export default function Create(props: Props) {
    let form = useForm <NewUser>(
        {
            name: '',
            email: '',
            phone_number: '',
            password: '',
            roles: [],
        }
    );

    function onSubmit(e: React.FormEvent) {
        console.log(form.data);
        e.preventDefault();
        form.clearErrors();
        form.post(route('user.store'), {
            onError: (errors) => {
                console.log(errors);
            },
            onSuccess: () => {
                console.log('success');
            }
        });
    }

    return (
        <AppLayout title={'Tambah User'}>
            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                    <div className="flex justify-between md:mx-10">
                        <div className="text-2xl">
                            {/* <svg className='fill-dark-200'></svg> */}
                            Tambah User
                        </div>
                        <button className="bg-[#2EA1DA] text-white hover:bg-blue-600 py-3 px-5 rounded-lg text-md font-semibold">
                            <InertiaLink href={route('user.index')}>
                                Kembali
                            </InertiaLink>
                        </button>
                    </div>
                    <form className="flex-col gap-5 py-5" onSubmit={onSubmit}>
                        <Form
                            form={form}
                            roles = {props.roles}
                            className="my-5 mx-2"
                        />
                        <div className="flex justify-end">
                            <button
                                className="bg-[#2EA1DA] text-white hover:bg-blue-600 py-3 px-5 rounded-lg text-md font-semibold m-5 mt-10 w-1/4 md:mx-10"
                                type="submit"
                                disabled={form.processing}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    )
}
