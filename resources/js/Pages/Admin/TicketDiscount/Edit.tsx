import React from 'react';
import route from 'ziggy-js';

import DashboardAdminLayout from '@/Layouts/DashboardAdminLayout';
import { InertiaLink, useForm } from '@inertiajs/inertia-react';

import Form from './Form';
import { TicketDiscountCreateModel } from '@/Models/TicketDiscount';
import { TicketTypeModel } from '@/Models/TicketType';
import { EventModel } from '@/Models/Event';
import InputError from '@/Components/Jetstream/InputError';


interface Props {
    ticketDiscount: TicketDiscountCreateModel;
    ticketTypes: Array<TicketTypeModel>
    events: Array<EventModel>
}

export default function Edit({ ticketDiscount, ticketTypes, events }: Props) {
    let form = useForm<TicketDiscountCreateModel>(
        {
            ...ticketDiscount,
        }
    );

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                form.setData({
                    ...form.data,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            });
            form.clearErrors();
            // php does'nt support PUT so...
            // @ts-ignore
            form.data._method = 'PUT';
            form.post(route('ticket-discount.update', ticketDiscount.id), {
                onError: (errors) => {
                    console.log(errors);
                },
                onSuccess: () => {
                    console.log('success');
                }
            });
        } else {
            form.setError('latitude', 'Anda Harus Mengaktifkan Geolocation Pada Browser Anda!!!');
            form.setError('longitude', 'Anda Harus Mengaktifkan Geolocation Pada Browser Anda!!!');
            alert('Anda Harus Mengaktifkan Geolocation Pada Browser Anda!!!');
            return;
        }
    }

    return (
        <DashboardAdminLayout title={"Edit discount Event"}>
            <div className="py-12 max-w-7xl mx-auto">
                <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg p-5">
                    <div className="flex justify-between">
                        <div className="text-2xl">
                            Edit Event
                        </div>
                        <button>
                            <InertiaLink
                                className="bg-blue-500 text-white hover:bg-blue-600 py-3 px-5 rounded-lg text-md font-semibold focus:outline-none border-2"
                                href={route('ticket-discount.index')}
                            >
                                Kembali
                            </InertiaLink>
                        </button>
                    </div>
                    <form className="flex-col gap-5" onSubmit={onSubmit}>
                        <Form
                            form={form}
                            className="my-5"
                            ticketTypes={ticketTypes}
                            events={events}
                        />
                        <InputError
                            message={form.errors.latitude ? "Lokasi Koordinat Lintang (Latitude) tidak diketahui, Anda Harus Mengaktifkan Geolocation Pada Browser Anda!!!" : ""}
                            className="my-5 mx-2"
                        />
                        <InputError
                            message={form.errors.longitude ? "Lokasi Koordinat Bujur (Longitude) tidak diketahui, Anda Harus Mengaktifkan Geolocation Pada Browser Anda!!!" : ""}
                            className="my-5 mx-2"
                        />
                        <button
                            className="bg-yellow-500 text-white hover:bg-yellow-600 py-3 px-5 rounded-lg text-md font-semibold focus:outline-none border-2 w-full"
                            type="submit"
                            disabled={form.processing}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </DashboardAdminLayout>
    )
}
