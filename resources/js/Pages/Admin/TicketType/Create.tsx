import React from 'react';
import route from 'ziggy-js';

import DashboardAdminLayout from '@/Layouts/DashboardAdminLayout';
import { InertiaLink, useForm } from '@inertiajs/inertia-react';

import Form from './Form';
import { TicketTypeCreateModel } from '@/Models/TicketType';
import { EventModel } from '@/Models/Event';

interface Props {
    events: Array<EventModel>,
    event_id: number,
}

export default function Create(props: Props) {
    let form = useForm<TicketTypeCreateModel>(
        {
            name: '',
            stock: 0,
            fee: 0,
            price: 0,
            event_id: props.event_id || 0,
            event: props.events.find(event => event.id === props.event_id),
        }
    );

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        form.clearErrors();
        form.post(route('ticket-type.store'), {
            onError: (errors) => {
                console.log(errors);
            },
            onSuccess: () => {
                console.log('success');
            }
        });
    }

    return (
        <DashboardAdminLayout title={'Tambah Jenis Tiket'}>
            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg  p-3">
                    <div className="flex justify-between">
                        <div className="text-2xl">
                            Tambah Jenis Tiket Event
                        </div>
                        <button className="bg-blue-500 text-white hover:bg-blue-600 py-3 px-5 rounded-lg text-md font-semibold"
                            onClick={() => window.history.back()}
                        >
                           Kembali
                        </button>
                    </div>
                    <form className="flex-col gap-5 py-5" onSubmit={onSubmit}>
                        <Form
                            form={form}
                            events={props.events}
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
        </DashboardAdminLayout>
    )
}
