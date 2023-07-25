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
    ticketTypes: Array<TicketTypeModel>
    events: Array<EventModel>
}

export default function Create({ ticketTypes, events }: Props) {
    let form = useForm<TicketDiscountCreateModel>(
        {
            name: '',
            amount: 0,
            stock: 0,
            minimum_buy: 0,
            type: 'fixed',
            ticket_type_id: 0,
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
            form.post(route('ticket-discount.store'), {
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
        <DashboardAdminLayout title={'Tambah Diskon Tiket'}>
            <div className="py-12 max-w-7xl mx-auto">
                <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg p-3">
                    <div className="flex justify-between">
                        <div className="text-2xl">
                            Tambah Diskon Tiket
                        </div>
                        <button className="bg-blue-500 text-white hover:bg-blue-600 py-3 px-5 rounded-lg text-md font-semibold">
                            <InertiaLink href={route('ticket-discount.index')}>
                                Kembali
                            </InertiaLink>
                        </button>
                    </div>
                    <form className="flex-col gap-5 py-5" onSubmit={onSubmit}>
                        <Form
                            form={form}
                            className="my-5 mx-2"
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
