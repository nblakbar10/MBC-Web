import React from 'react';
import route from 'ziggy-js';

import AppLayout from '@/Layouts/DashboardAdminLayout';
import { InertiaLink, useForm } from '@inertiajs/inertia-react';

import Form from './Form';
import { PromoCreateModel } from '@/Models/Promo';


export default function Create() {
    let form = useForm<PromoCreateModel>(
        {
            promo_name: '',
            description: '',
            stocks: 0,
            price: 0,
        }
    );

    function onSubmit(e: React.FormEvent) {
        console.log(form.data);
        e.preventDefault();
        form.clearErrors();
        form.post(route('promo.store'), {
            onError: (errors) => {
                console.log(errors);
            },
            onSuccess: () => {
                console.log('success');
            }
        });
    }

    return (
        <AppLayout title={'Tambah Promo Event'}>
            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                    <div className="flex justify-between">
                        <div className="text-2xl">
                            Tambah Promo Event
                        </div>
                        <button className="bg-blue-500 text-white hover:bg-blue-600 py-3 px-5 rounded-lg text-md font-semibold">
                            <InertiaLink href={route('promo.index')}>
                                Kembali
                            </InertiaLink>
                        </button>
                    </div>
                    <form className="flex-col gap-5 py-5" onSubmit={onSubmit}>
                        <Form
                            form={form}
                            className="my-5 mx-2"
                        />
                        <div className="flex justify-end">
                            <button
                                className="bg-blue-500 text-white hover:bg-blue-600 py-3 px-5 rounded-lg text-md font-semibold m-5 mt-10 w-1/2"
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
