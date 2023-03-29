import { useForm } from "@inertiajs/inertia-react";
import { Dialog, DialogActions, DialogContent, DialogContentText, TextField } from "@mui/material";
import React, { useEffect } from "react";
import InputError from "./Jetstream/InputError";
import InputLabel from "./Jetstream/InputLabel";
import TextInput from "./Jetstream/TextInput";

interface Props {
    open: boolean;
    closeHandler: () => void;
    price?: number;
    adminFee?: number;
}


export default function BuyDialogForm({ open, closeHandler, price, adminFee }: Props) {
    const form = useForm({
        name: '',
        email: '',
        phone_number: '',
        ticket_amount: 1,
        payment_method: '',
        total_price: 0,
    });

    if (!price) {
        price = 100000;
    }

    if (!adminFee) {
        adminFee = 6000;
    }

    useEffect(() => {
        form.setData('total_price', (price! * form.data.ticket_amount) + adminFee!);
    }, [form.data.ticket_amount]);

    const onSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        // form.post(route('buy-ticket'), {
        //     preserveScroll: true,
        //     onSuccess: () => {
        //         closeHandler();
        //     }
        // }); 
    }

    return (
        <Dialog open={open} onClose={closeHandler}
        >
            <DialogContent className="w-full">
                <div className="text-2xl">
                    Balikpapan Fest 2023
                </div>
                <form className="flex flex-col gap-5 m-5">
                    <div className="form-control w-full mt-4">
                        <InputLabel htmlFor="name">Nama Lengkap Sesuai KTP</InputLabel>
                        <TextInput
                            id="name"
                            type="text"
                            className="mt-1 block w-full"
                            value={form.data.name}
                            onChange={e => form.setData('name', e.currentTarget.value)}
                            required
                            autoFocus
                            autoComplete="name"
                        />
                        {/* <InputError className="mt-2" message={"salah"} /> */}
                    </div>
                    <div className="form-control w-full mt-4">
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <TextInput
                            id="email"
                            type="email"
                            className="mt-1 block w-full"
                            value={form.data.email}
                            onChange={e => form.setData('email', e.currentTarget.value)}
                            required
                        />
                        {/* <InputError className="mt-2" message={"salah"} /> */}
                    </div>
                    <div className="form-control w-full mt-4">
                        <InputLabel htmlFor="phone_number">Nomor Telepon</InputLabel>
                        <TextInput
                            id="phone_number"
                            type="text"
                            className="mt-1 block w-full"
                            value={form.data.phone_number}
                            onChange={e => form.setData('phone_number', e.currentTarget.value)}
                            required
                        />
                        {/* <InputError className="mt-2" message={"salah"} /> */}
                    </div>
                    <div className="form-control w-full mt-4">
                        <InputLabel htmlFor="ticket_amount">Jumlah Tiket</InputLabel>
                        <TextInput
                            id="ticket_amount"
                            type="number"
                            className="mt-1 block w-full"
                            min={1}
                            step={1}
                            value={form.data.ticket_amount}
                            onChange={e => form.setData('ticket_amount', Number(e.currentTarget.value))}
                            required
                        />
                        {/* <InputError className="mt-2" message={"salah"} /> */}
                    </div>
                    <div className="form-control w-full mt-4">
                        <InputLabel htmlFor="payment_method">Metode Pembayaran</InputLabel>
                        <select
                            id="payment_method"
                            className="mt-1 block w-full"
                            value={form.data.payment_method}
                            onChange={e => form.setData('payment_method', e.currentTarget.value)}
                            required
                        >
                            <option value="bank_transfer">Transfer Bank</option>
                            <option value="credit_card">Kartu Kredit</option>
                        </select>
                        {/* <InputError className="mt-2" message={"salah"} /> */}
                    </div>
                    <div className="flex gap-3">
                        <div className="flex flex-col">
                            <div className="font-bold">
                                Harga per Tiket
                            </div>
                            <div className="font-bold">
                                Rp. {price?.toLocaleString()}
                            </div>
                        </div>
                        <div>
                            <div className="font-bold">
                                Biaya Langganan
                            </div>
                            <div className="font-bold">
                                Rp. {adminFee?.toLocaleString()}
                            </div>
                        </div>
                        <div>
                            <div className="font-bold">
                                Jumlah
                            </div>
                            <div className="font-bold">
                                Rp. {(price! * form.data.ticket_amount).toLocaleString()}
                            </div>
                        </div>
                    </div>
                    <div className="form-control w-full mt-4">
                        <InputLabel htmlFor="total_price">Total Harga</InputLabel>
                        <TextInput
                            id="total_price"
                            type="number"
                            className="mt-1 block w-full"
                            value={form.data.total_price}
                            readOnly
                        />
                        {/* <InputError className="mt-2" message={"salah"} /> */}
                    </div>
                </form>
                <DialogActions>
                    <button onClick={closeHandler}>Cancel</button>
                    <button onClick={onSubmitHandler}>Beli</button>
                </DialogActions>
            </DialogContent>

        </Dialog >
    );
}
