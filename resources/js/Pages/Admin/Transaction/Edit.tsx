import React from 'react';
import route from 'ziggy-js';

import DashboardAdminLayout from '@/Layouts/DashboardAdminLayout';
import { InertiaLink, useForm } from '@inertiajs/inertia-react';

import { TransactionModel } from '@/Models/Transaction';
import { InputLabel } from '@mui/material';
import TextInput from '@/Components/Jetstream/TextInput';
import InputError from '@/Components/Jetstream/InputError';

interface Props {
    transaction: TransactionModel;
}

export default function Edit({ transaction }: Props) {
    console.log(transaction);
    let form = useForm<TransactionModel>(
        {
            ...transaction,
        }
    );

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        form.clearErrors();
        // php does'nt support PUT so...
        // @ts-ignore
        form.data._method = 'PUT';
        form.post(route('transaction.update', transaction.id), {
            onError: (errors) => {
                console.log(errors);
            },
            onSuccess: () => {
                console.log('success');
            }
        });
    }

    return (
        <DashboardAdminLayout title={"Edit Transaksi"}>
            <div className='py-12'>
                <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                        <div className="flex justify-between p-3">
                            <div className="text-2xl">
                                Edit Event
                            </div>
                            <button>
                                <InertiaLink
                                    className="bg-blue-500 text-white hover:bg-blue-600 py-3 px-5 rounded-lg text-md font-semibold focus:outline-none border-2"
                                    href={route('discount.index')}
                                >
                                    Kembali
                                </InertiaLink>
                            </button>
                        </div>
                        <form className="flex-col gap-5" onSubmit={onSubmit}>
                            <div className="flex flex-col gap-2 p-3">
                                <div className="form-control w-full mt-4">
                                    <InputLabel htmlFor="name">Nama Pembeli</InputLabel>
                                    <TextInput
                                        id="name"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={form.data.name}
                                        required
                                        autoFocus
                                        autoComplete="name"
                                        disabled
                                    />
                                    <InputError className="mt-2" message={form.errors.name} />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 p-3">
                                <div className="form-control w-full mt-4">
                                    <InputLabel htmlFor="email">Email Transaksi</InputLabel>
                                    <TextInput
                                        id="email"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={form.data.email}
                                        required
                                        autoFocus
                                        autoComplete="email"
                                        disabled
                                    />
                                    <InputError className="mt-2" message={form.errors.email} />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 p-3">
                                <div className="form-control w-full mt-4">
                                    <InputLabel htmlFor="phone_number">No Handphone</InputLabel>
                                    <TextInput
                                        id="phone_number"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={form.data.phone_number}
                                        required
                                        autoFocus
                                        autoComplete="phone_number"
                                        disabled
                                    />
                                    <InputError className="mt-2" message={form.errors.name} />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 p-3">
                                <div className="form-control w-full mt-4">
                                    <InputLabel htmlFor="payment_method">Metode Pembayaran</InputLabel>
                                    <TextInput
                                        id="payment_method"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={form.data.payment_method}
                                        required
                                        autoFocus
                                        autoComplete="payment_method"
                                        disabled
                                    />
                                    <InputError className="mt-2" message={form.errors.payment_method} />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 p-3">
                                <div className="form-control w-full mt-4">
                                    <InputLabel htmlFor="total_amount">Total Pembayaran</InputLabel>
                                    <TextInput
                                        id="total_amount"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={form.data.total_amount}
                                        required
                                        autoFocus
                                        autoComplete="total_amount"
                                        disabled
                                    />
                                    <InputError className="mt-2" message={form.errors.total_amount} />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 p-3">
                                <div className="form-control w-full mt-4">
                                    <InputLabel htmlFor="total_tickets">Jumlah Tiket</InputLabel>
                                    <TextInput
                                        id="total_tickets"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={form.data.total_tickets}
                                        required
                                        autoFocus
                                        autoComplete="total_tickets"
                                        disabled
                                    />
                                    <InputError className="mt-2" message={form.errors.total_tickets} />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 p-3">
                                <div className="form-control w-full mt-4">
                                    <InputLabel htmlFor="payment_status">Status Pembayaran</InputLabel>
                                    <select
                                        id="payment_status"
                                        className="mt-1 block w-full"
                                        value={form.data.payment_status}
                                        required
                                        autoFocus
                                        autoComplete="payment_status"
                                        onChange={(e) => form.setData('payment_status', e.target.value)}
                                    >
                                        <option value="PENDING">PENDING</option>
                                        <option value="PAID">PAID</option>
                                        <option value="EXPIRED">EXPIRED</option>
                                    </select>
                                    <InputError className="mt-2" message={form.errors.payment_status} />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 p-3">
                                <div className="form-control w-full mt-4">
                                    <InputLabel htmlFor="tickets_category">Jenis Tiket</InputLabel>
                                    <TextInput
                                        id="tickets_category"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={form.data.tickets_category}
                                        required
                                        autoFocus
                                        autoComplete="tickets_category"
                                        disabled
                                    />
                                    <InputError className="mt-2" message={form.errors.tickets_category} />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 p-3">
                                <div className="form-control w-full mt-4">
                                    <InputLabel htmlFor="payment_link">Tautan Pembayaran</InputLabel>
                                    <TextInput
                                        id="payment_link"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={form.data.payment_link}
                                        required
                                        autoFocus
                                        autoComplete="payment_link"
                                        disabled
                                    />
                                    <InputError className="mt-2" message={form.errors.payment_link} />
                                </div>
                            </div>
                            {form.data.payment_status === 'PAID' && (
                                <>
                                    <div className="flex flex-col gap-2 p-3">
                                        <div className="form-control w-full mt-4">
                                            <InputLabel htmlFor="ticket_id">ID Tiket</InputLabel>
                                            <TextInput
                                                id="ticket_id"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={form.data.ticket_id}
                                                required
                                                autoFocus
                                                autoComplete="ticket_id"
                                                onChange={(e) => form.setData('ticket_id', e.target.value)}
                                            />
                                            <InputError className="mt-2" message={form.errors.ticket_id} />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 p-3">
                                        <div className="form-control w-full mt-4">
                                            <InputLabel htmlFor="ticket_status">Tiket Status</InputLabel>
                                            <select
                                                id="ticket_status"
                                                className="mt-1 block w-full"
                                                value={form.data.ticket_status}
                                                required
                                                autoFocus
                                                autoComplete="ticket_status"
                                                onChange={(e) => form.setData('ticket_status', e.target.value)}
                                            >
                                                <option value="not redeemed yet">Not Redeemeed yet</option>
                                                <option value="Reedeemed!">Redeemed</option>
                                            </select>
                                            <InputError className="mt-2" message={form.errors.ticket_status} />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 p-3">
                                        <div className="form-control w-full mt-4">
                                            <InputLabel htmlFor="ticket_barcode">Tiket Barcode</InputLabel>
                                            <TextInput
                                                id="ticket_barcode"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={form.data.ticket_barcode}
                                                required
                                                autoFocus
                                                autoComplete="ticket_barcode"
                                                disabled
                                            />
                                            <InputError className="mt-2" message={form.errors.ticket_barcode} />
                                        </div>
                                    </div>
                                </>
                            )}
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
            </div>
        </DashboardAdminLayout>
    )
}
