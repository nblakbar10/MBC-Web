import { asset } from "@/Models/Helper";
import { useForm } from "@inertiajs/inertia-react";
import { Dialog, DialogContent } from "@mui/material";
import React, { useEffect } from "react";
import InputLabel from "./Jetstream/InputLabel";
import TextInput from "./Jetstream/TextInput";

import route from "ziggy-js";
import { PromoModel } from "@/Models/Promo";

interface Props {
    open: boolean;
    checkOutOpenHandler: () => void;
    closeHandler: () => void;
    setXenditLinkHandler: (link: string) => void;
    price?: number;
    adminFee?: number;
    promo: PromoModel | null;
}


export default function BuyDialogForm({ open, checkOutOpenHandler, closeHandler, setXenditLinkHandler, price, adminFee, promo }: Props) {
    const form = useForm({
        name: '',
        email: '',
        phone_number: '',
        ticket_amount: 1,
        tickets_category: promo?.promo_name,
        payment_method: 'Transfer Bank (VA)',
        total_price: 0,
    });

    if (!adminFee) {
        adminFee = 6000;
    }

    const [paymentError, setPaymentError] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);


    useEffect(() => {
        form.setData('total_price', ((promo?.price || 0) * form.data.ticket_amount) + adminFee!);
    }, [form.data.ticket_amount]);

    useEffect(() => {
        form.setData('tickets_category', promo?.promo_name);
    }, [promo?.promo_name]);

    const onSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const data = fetch(route('checkout'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-TOKEN': document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, "$1")
            },
            credentials: 'same-origin',
            body: JSON.stringify(form.data)
        })
            .then(response => {
                response.status === 200 ? setPaymentError(false) : setPaymentError(true)
                setIsLoading(false);
                return response.json()
            })
            .then(data => {
                if (!paymentError) {
                    setXenditLinkHandler(data);
                    checkOutOpenHandler();
                }
            });
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
                <div className="text-lg text-center">
                    {promo?.promo_name}
                </div>
                <form className="flex flex-col gap-5 mx-5">
                    <div className="form-control w-full mt-4">
                        <InputLabel htmlFor="name">Nama (Sesuai KTP atau Identitas Lainnya)</InputLabel>
                        <TextInput
                            id="name"
                            type="text"
                            className="mt-1 block w-full"
                            value={form.data.name}
                            onChange={e => {
                                form.setData('name', e.currentTarget.value)
                                form.setData('tickets_category', promo?.promo_name)
                            }}
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
                            max={5}
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
                            <option value="Transfer Bank (VA)">Transfer Bank (VA)</option>
                            <option value="QRIS">QRIS</option>
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
                                    Rp. {promo?.price.toLocaleString() || 0}
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
                {isLoading ? (
                    <div className="flex justify-center">
                        <div className="text-xl text-gray-500">
                            Memproses...
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center">
                        <button
                            onClick={onSubmitHandler}
                            className="bg-pink-400 hover:bg-pink-600 rounded-md text-xl px-10 py-2 my-3 font-bold text-white"
                        >
                            Beli Tiket
                        </button>
                    </div>
                )}
                {paymentError && (
                    <div className="flex justify-center">
                        <div className="text-xl text-red-500">
                            Terjadi kesalahan, silahkan coba lagi
                        </div>
                    </div>
                )}
            </DialogContent>

        </Dialog >
    );
}
