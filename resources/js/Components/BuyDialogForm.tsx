import { District, asset } from "@/Models/Helper";
import { useForm } from "@inertiajs/inertia-react";
import { Dialog, DialogContent } from "@mui/material";
import React, { useEffect } from "react";
import InputLabel from "./Jetstream/InputLabel";
import TextInput from "./Jetstream/TextInput";
import Select from 'react-select';

import route from "ziggy-js";
import { TicketTypeModel } from "@/Models/TicketType";
import InputError from "./Jetstream/InputError";
import { TicketDiscountModel } from "@/Models/TicketDiscount";
import useIndonesiaCityAPI from "@/Hooks/useIndonesianCityAPI";
import axios, { AxiosResponse } from "axios";

interface Props {
    open: boolean;
    checkOutOpenHandler: () => void;
    closeHandler: () => void;
    setResponseBuyHandler: (link: AxiosResponse) => void;
    price?: number;
    ticketType: TicketTypeModel | null;
    discounts: Array<TicketDiscountModel>
    adminFee: number;
}


export default function BuyDialogForm({ open, checkOutOpenHandler, closeHandler, setResponseBuyHandler, price, ticketType, discounts, adminFee }: Props) {
    const form = useForm({
        name: '',
        email: '',
        city: '',
        phone_number: '',
        ticket_amount: 1,
        payment_method: 'Transfer Bank (VA)',
        ticketType_id: ticketType?.id,
        total_price: 0,
    });


    const [filteredDiscount, setFilteredDiscount] = React.useState<TicketDiscountModel>();

    const maxBuy = Math.min(ticketType?.maximum_buy || 0, ticketType?.stock || 0)
    useEffect(() => {
        // form.setData('total_price', ((ticketType?.price || 0) * form.data.ticket_amount) + adminFee!);
        form.setData('total_price', ((ticketType?.price || 0) * form.data.ticket_amount));
        setFilteredDiscount(discounts.filter(discount => discount.minimum_buy <= form.data.ticket_amount).sort((a, b) => b.minimum_buy - a.minimum_buy)[0]);
    }, [form.data.ticket_amount]);

    useEffect(() => {
        form.setData('ticketType_id', ticketType?.id);
    }, [ticketType])

    const {
        provinceSelected,
        setProvinceSelected,
        provinces,
        citiesProvince,
    } = useIndonesiaCityAPI();


    const onSubmitHandler = (e: React.FormEvent) => {
        form.clearErrors();
        e.preventDefault();
        axios.post(route('transaction.store'), form.data)
            .then(response => {
                console.log(response);
                setResponseBuyHandler(response);
                checkOutOpenHandler();

            })
            .catch(error => {
                console.log(error.response.data.errors);
                form.setError(error.response.data.errors);
            })

        // form.post(route('transaction.store'), {
        //     preserveScroll: true,
        //     onSuccess: () => {
        //         closeHandler();
        //     },
        //     onError: () => {
        //         console.log(form.errors);
        //     }
        // });


        // const onSubmitHandler = (e: React.FormEvent) => {
        //     e.preventDefault();
        //     setIsLoading(true);
        //     const data = fetch(route('checkout'), {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Accept': 'application/json',
        //             'X-Requested-With': 'XMLHttpRequest',
        //             'X-CSRF-TOKEN': document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, "$1")
        //         },
        //         credentials: 'same-origin',
        //         body: JSON.stringify(form.data)
        //     })
        //         .then(response => {
        //             response.status === 200 ? setPaymentError(false) : setPaymentError(true)
        //             setIsLoading(false);
        //             return response.json()
        //         })
        //         .then(data => {
        //             if (!paymentError) {
        //                 setResponseBuyHandler(data);
        //                 checkOutOpenHandler();
        //             }
        //         });
    }

    return (
        <Dialog open={open} onClose={closeHandler} sx={{ borderRadius: 2 }} maxWidth="sm" fullWidth>
            <DialogContent className="w-full " >
                <div className="border-[#262626] border-2">
                    <div className="flex justify-center bg-[#262626] py-3 px-5">
                        <img
                            src={asset('root', 'assets/images/MBC_HD.png')}
                            alt="Logo"
                            width={200}
                        />
                    </div>

                    <div className="text-lg text-center p-2 mt-4 ">
                        <p className="font-semibold text-2xl">{ticketType?.name}</p>
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
                                }}
                                required
                                autoFocus
                                autoComplete="name"
                            />
                            <InputError className="mt-2" message={form.errors["name"]} />
                        </div>
                        <div className="form-control w-full mt-4">
                            <InputLabel htmlFor="email">Email (Aktif)</InputLabel>
                            <TextInput
                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                value={form.data.email}
                                onChange={e => form.setData('email', e.currentTarget.value)}
                                required
                            />
                            <InputError className="mt-2" message={form.errors["email"]} />
                        </div>
                        <div className="form-control w-full mt-4">
                            <InputLabel htmlFor="phone_number">Nomor Telepon (diawali 08)</InputLabel>
                            <TextInput
                                id="phone_number"
                                type="number"
                                className="mt-1 block w-full"
                                value={form.data.phone_number}
                                onChange={e => form.setData('phone_number', e.currentTarget.value)}
                                required
                            />
                            <InputError className="mt-2" message={form.errors["phone_number"]} />
                        </div>
                        <div className="form-control w-full mt-4">
                            <InputLabel htmlFor="image">Kota/Kabupaten</InputLabel>
                            <label>Provinsi</label>
                            <Select
                                id="year"
                                className="mt-1 block w-full"
                                value={provinceSelected}
                                onChange={e => setProvinceSelected(e as District)}
                                getOptionValue={option => option.id}
                                getOptionLabel={option => option.name}
                                options={provinces}
                            />
                            <label>Kota/Kabupaten</label>
                            <Select
                                id="year"
                                className="mt-1 block w-full"
                                value={citiesProvince.find(city => city.name === form.data.city) || { id: '', name: '' }}
                                onChange={e => form.setData('city', e?.name as string)}
                                getOptionValue={option => option.id}
                                getOptionLabel={option => option.name}
                                options={citiesProvince}
                            />
                            <InputError className="mt-2" message={form.errors["city"]} />
                        </div>
                        <div className="form-control w-full mt-4">
                            <InputLabel htmlFor="ticket_amount">Jumlah Tiket</InputLabel>
                            <TextInput
                                id="ticket_amount"
                                type="number"
                                className="mt-1 block w-full"
                                min={1}
                                max={maxBuy}
                                step={1}
                                value={form.data.ticket_amount}
                                onChange={e => {
                                    const value = parseInt(e.currentTarget.value);
                                    if (isNaN(value)) {
                                        form.setData('ticket_amount', 1);
                                    } else if (value > maxBuy) {
                                        form.setData('ticket_amount', maxBuy);
                                    } else if (value < 1) {
                                        form.setData('ticket_amount', 1);
                                    } else {
                                        form.setData('ticket_amount', value);
                                    }
                                }}
                                required
                            />
                            <InputError className="mt-2" message={form.errors["ticket_amount"]} />
                        </div>
                        <div className="form-control w-full mt-4">
                            <InputLabel htmlFor="payment_method">Metode Pembayaran (Pajak Transaksi)</InputLabel>
                            <select
                                id="payment_method"
                                className="mt-1 block w-full"
                                value={form.data.payment_method}
                                onChange={e => form.setData('payment_method', e.currentTarget.value)}
                                required
                            >
                                <option value="Transfer Bank (VA)">Transfer Bank (VA) - Rp.     4500</option>
                                <option value="DANA">DANA - 2%</option>
                                {/* <option value="QRIS">QRIS - 0.7%</option> */}
                            </select>
                            <InputError className="mt-2" message={form.errors["payment_method"]} />
                        </div>
                        <div className="flex flex-col ">
                            <div className="flex justify-center mt-4 ">
                                <div className="">
                                    <table className="table-auto font-light">
                                        <thead className="text-2xl">
                                            <tr>
                                                <th>Tagihan</th>
                                                <th>Harga</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="text-lg pr-10">Harga per Tiket</td>
                                                <td>Rp. {(
                                                    filteredDiscount && ticketType ? (
                                                        filteredDiscount.type === 'percentage' ?
                                                            ticketType.price - (ticketType!.price *
                                                                (filteredDiscount.amount / 100)
                                                            ) :
                                                            ticketType.price - filteredDiscount.amount
                                                    ) :
                                                        ticketType?.price || 0
                                                ).toLocaleString() || 0}</td>
                                            </tr>
                                            <tr>
                                                <td className="text-lg pr-10">Biaya Admin</td>
                                                <td>Rp. {adminFee?.toLocaleString()}</td>
                                            </tr>
                                            <tr>
                                                <td className="text-lg pr-10">Jumlah Harga</td>
                                                <td>Rp. {(
                                                    (
                                                        (
                                                            filteredDiscount && ticketType ? (
                                                                filteredDiscount.type === 'percentage' ?
                                                                    ticketType.price - (ticketType!.price *
                                                                        (filteredDiscount.amount / 100)
                                                                    ) :
                                                                    ticketType.price - filteredDiscount.amount
                                                            ) :
                                                                ticketType?.price || 0
                                                        ) * form.data.ticket_amount
                                                    ) +
                                                    (adminFee * form.data.ticket_amount)
                                                ).toLocaleString()}</td>
                                            </tr>
                                        </tbody >
                                        <tr className="border-gray-500 border-dashed border-t-2 mt-5 py-3">
                                            <td className="text-lg pr-10">Total Pembayaran Termasuk Pajak</td>
                                            <td>Rp. {(
                                                (
                                                    (
                                                        filteredDiscount && ticketType ? (
                                                            filteredDiscount.type === 'percentage' ?
                                                                ticketType.price - (ticketType!.price *
                                                                    (filteredDiscount.amount / 100)
                                                                ) :
                                                                ticketType.price - filteredDiscount.amount
                                                        ) :
                                                            ticketType?.price || 0
                                                    ) * form.data.ticket_amount
                                                ) +
                                                (adminFee * form.data.ticket_amount) +
                                                (
                                                    form.data.payment_method === 'Transfer Bank (VA)' ? 4500 :
                                                        form.data.payment_method === 'DANA' ? (
                                                            (
                                                                (
                                                                    (
                                                                        filteredDiscount && ticketType ? (
                                                                            filteredDiscount.type === 'percentage' ?
                                                                                ticketType.price - (ticketType!.price *
                                                                                    (filteredDiscount.amount / 100)
                                                                                ) :
                                                                                ticketType.price - filteredDiscount.amount
                                                                        ) :
                                                                            ticketType?.price || 0
                                                                    ) * form.data.ticket_amount
                                                                ) +
                                                                (adminFee * form.data.ticket_amount)
                                                            ) * 0.015
                                                        ) :
                                                            form.data.payment_method === 'QRIS' ? (
                                                                (
                                                                    (
                                                                        (
                                                                            filteredDiscount && ticketType ? (
                                                                                filteredDiscount.type === 'percentage' ?
                                                                                    ticketType.price - (ticketType!.price *
                                                                                        (filteredDiscount.amount / 100)
                                                                                    ) :
                                                                                    ticketType.price - filteredDiscount.amount
                                                                            ) :
                                                                                ticketType?.price || 0
                                                                        ) * form.data.ticket_amount
                                                                    ) +
                                                                    (adminFee * form.data.ticket_amount)
                                                                ) * 0.007
                                                            ) : 0
                                                )

                                            ).toLocaleString()}</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="flex justify-center">
                        {form.processing ? (
                            <div className="text-center text-xl">
                                Memproses...
                            </div>
                        ) : (
                            <button
                                onClick={onSubmitHandler}
                                className="bg-[#D73337] hover:bg-[#D73337] rounded-md text-xl px-10 py-2 my-3 font-bold text-white"
                                disabled={form.processing}
                            >
                                Beli Tiket
                            </button>
                        )}
                    </div>
                    {form.hasErrors && (
                        <div className="text-center">
                            <div className="text-xl text-red-500">
                                Terjadi kesalahan, silahkan coba lagi
                            </div>
                            <div className="text-xl text-red-500">
                                {
                                    // @ts-ignore
                                    form.errors[0]
                                }
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>

        </Dialog >
    );
}
