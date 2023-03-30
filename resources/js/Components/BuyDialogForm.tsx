import { asset } from "@/Models/Helper";
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
        <Dialog open={open} onClose={closeHandler} sx={{ borderRadius: 2 }} maxWidth="sm" fullWidth>
            <DialogContent className="w-full" >
                <div className="flex justify-center">
                    <img
                        src={asset('root', 'assets/images/Smile Fest Post-07.png')}
                        alt="Logo"
                        width={300}
                    />
                </div>
                <form className="flex flex-col gap-5 mx-5">
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
                    <div className="flex justify-center">
                        <div className="grid grid-cols-3 gap-3 justify-center">
                            <div className="flex flex-col">
                                <div className="font-bold text-center">
                                    Harga per Tiket
                                </div>
                                <div className="text-center">
                                    Rp. {price?.toLocaleString()}
                                </div>
                            </div>
                            <div>
                                <div className="font-bold text-center">
                                    Biaya Langganan
                                </div>
                                <div className="text-center">
                                    Rp. {adminFee?.toLocaleString()}
                                </div>
                            </div>
                            <div>
                                <div className="font-bold text-center">
                                    Jumlah
                                </div>
                                <div className="text-center">
                                    Rp. {(price! * form.data.ticket_amount).toLocaleString()}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="text-xl">
                            <div className="font-bold text-center">
                                Jumlah
                            </div>
                            <div className="text-center">
                                Rp. {form.data.total_price.toLocaleString()}
                            </div>
                        </div>
                    </div>
                </form>
                <div className="flex justify-center">
                    <button
                        onClick={onSubmitHandler}
                        className="bg-pink-400 hover:bg-pink-600 rounded-md text-xl px-10 py-2 my-3 font-bold text-white"
                    >
                        Beli Tiket
                    </button>
                </div>
            </DialogContent>

        </Dialog >
    );
}
