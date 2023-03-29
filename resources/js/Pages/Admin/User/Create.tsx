import React from 'react';
import route from 'ziggy-js';

import AppLayout from '@/Layouts/AppLayout';
import { NewUser, Role } from '@/types';
import { useForm } from '@inertiajs/inertia-react';

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
            NIM: '',
            NIDN: '',
            NIP_NIPH: '',
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
                    <div className="flex justify-between">
                        <div className="text-2xl">
                            Tambah Kategori Dokumen Baru
                        </div>
                        <button className="btn btn-primary">
                            <a href={route('research-document-category.index')}>
                                Kembali
                            </a>
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
                                className="btn btn-primary py-2 px-4 m-5 rounded mt-10 w-1/2"
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
