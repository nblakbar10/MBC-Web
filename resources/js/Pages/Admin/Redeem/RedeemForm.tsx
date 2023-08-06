import InputError from "@/Components/Jetstream/InputError";
import InputLabel from "@/Components/Jetstream/InputLabel";
import TextInput from "@/Components/Jetstream/TextInput";
import DashboardAdminLayout from "@/Layouts/DashboardAdminLayout";
import { InertiaLink } from "@inertiajs/inertia-react";
import { useForm } from "@inertiajs/react";
import { Dialog, DialogContent } from "@mui/material";
import axios, { Axios } from "axios";
import React, { useEffect, useRef } from "react";
import route from "ziggy-js";
// @ts-ignore
import Scanner from "./Scanner";

interface dataUser {
    name: string,
    email: string,
    phone: string,
}

export default function RedeemForm() {
    const form = useForm({
        token: '',
        redeemed_amount: 0,
        latitude: undefined as unknown as number,
        longitude: undefined as unknown as number,
    });

    const scannerRef = useRef(null);

    const [redeemModal, setRedeemModal] = React.useState<{
        open: boolean,
        message: string,
        data: {
            name: string,
            email: string,
            phone: string,
        } | {}
    }>({
        open: false,
        message: '',
        data: {}
    });

    const handleClose = () => {
        setRedeemModal({
            open: false,
            message: '',
            data: {}
        });
    };

    const [cameraModal, setCameraModal] = React.useState(false);


    const handleCameraOpen = () => {
        setCameraModal(!cameraModal);
    };

    const onSubmitHandler = (e: React.FormEvent) => {
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
            const { token, redeemed_amount } = form.data;
            axios.post(route('redeemAPI.store'), {
                token: token,
                redeemed_amount: redeemed_amount
            }).then((response) => {
                setRedeemModal({
                    open: true,
                    message: response.data.message,
                    data: response.data.data || {}
                });
                console.log(response.data);
            }).catch((error) => {
                console.log(error);
                setRedeemModal({
                    open: true,
                    message: error.response.data.message,
                    data: {}
                });
            });
        } else {
            form.setError('latitude', 'Anda Harus Mengaktifkan Geolocation Pada Browser Anda!!!');
            form.setError('longitude', 'Anda Harus Mengaktifkan Geolocation Pada Browser Anda!!!');
            alert('Anda Harus Mengaktifkan Geolocation Pada Browser Anda!!!');
            return;
        }
    }

    return (
        <DashboardAdminLayout
            title="Redeem Tiket"
        >
            <div className="my-10  max-w-7xl mx-auto">
                <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg py-12 sm:px-6 lg:px-8">
                    <div className="flex justify-between">
                        <div className="text-3xl">
                            Redeem Tiket
                        </div>
                        <button className="bg-blue-500 text-white hover:bg-blue-600 py-3 px-5 rounded-lg text-md font-semibold">
                            <InertiaLink href={route('redeem.index')}>
                                Riwayat Redeem
                            </InertiaLink>
                        </button>
                    </div>
                    <form className={`flex-col gap-5`}>
                        <div className="form-control w-full mt-4">
                            <InputLabel htmlFor="token">Redeem Token Pembayaran</InputLabel>
                            <TextInput
                                id="token"
                                type="text"
                                className="mt-1 block w-full"
                                value={form.data.token}
                                onChange={e => form.setData('token', e.currentTarget.value)}
                                required
                                autoFocus
                                autoComplete="token"
                            />
                            <InputError className="mt-2" message={form.errors.token} />
                        </div>
                        <div className="form-control w-full mt-4">
                            <InputLabel htmlFor="redeemed_amount">Jumlah Tiket Diredeem</InputLabel>
                            <TextInput
                                id="redeemed_amount"
                                type="number"
                                className="mt-1 block w-full"
                                min={1}
                                step={1}
                                value={form.data.redeemed_amount}
                                onChange={e => {
                                    const value = parseInt(e.currentTarget.value);
                                    if (isNaN(value)) {
                                        form.setData('redeemed_amount', 0);
                                    } else if (value < 0) {
                                        form.setData('redeemed_amount', 0);
                                    } else {
                                        form.setData('redeemed_amount', value);
                                    }
                                }}
                                required
                            />
                            <InputError className="mt-2" message={form.errors.redeemed_amount} />
                        </div>
                        <InputError
                            message={form.errors.latitude ? "Lokasi Koordinat Lintang (Latitude) tidak diketahui, Anda Harus Mengaktifkan Geolocation Pada Browser Anda!!!" : ""}
                            className="my-5 mx-2"
                        />
                        <InputError
                            message={form.errors.longitude ? "Lokasi Koordinat Bujur (Longitude) tidak diketahui, Anda Harus Mengaktifkan Geolocation Pada Browser Anda!!!" : ""}
                            className="my-5 mx-2"
                        />
                        <div className="flex justify-end">
                            <div
                                className="bg-sky-500 text-white hover:bg-sky-600 py-3 px-5 rounded-lg text-md font-semibold m-5 mt-10 w-1/2 text-center"

                                onClick={handleCameraOpen}
                            >
                                Scan
                            </div>
                            <button
                                className="bg-blue-500 text-white hover:bg-blue-600 py-3 px-5 rounded-lg text-md font-semibold m-5 mt-10 w-1/2"
                                disabled={form.processing}
                                onClick={onSubmitHandler}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                    <div>
                        <div ref={scannerRef} style={{ position: 'relative', border: '3px solid red' }}>
                            {/* <video style={{ width: window.innerWidth, height: 480, border: '3px solid orange' }}/> */}
                            <canvas className="drawingBuffer" style={{
                                position: 'absolute',
                                top: '0px',
                                // left: '0px',
                                // height: '100%',
                                // width: '100%',
                            }} width="640" height="480" />
                            {cameraModal ? <Scanner scannerRef={scannerRef}
                                onDetected={
                                    (result: { codeResult: { code: string; }; }) => {
                                        form.setData('token', result.codeResult.code.slice(1, -1))
                                    }
                                }
                            />
                                : null}
                        </div>
                    </div>
                </div>
            </div>
            <Dialog open={redeemModal.open} onClose={handleClose}
            >
                <DialogContent className="w-full">
                    <div>
                        <h3 className="font-bold text-lg">{redeemModal.message}</h3>
                        {/* @ts-ignore */}
                        {redeemModal.data.name && (
                            <div className="mt-3">
                                <p className="text-lg">Data Pemesan :</p>
                                {/* @ts-ignore */}
                                <p>name : {redeemModal.data.name}</p>
                                {/* @ts-ignore */}
                                <p>email : {redeemModal.data.email}</p>
                                {/* @ts-ignore */}
                                <p>no telepon : {redeemModal.data.phone}</p>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </DashboardAdminLayout>
    )
}
