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

export default function RedeemForm() {
    const form = useForm({
        token: '',
    });

    const scannerRef = useRef(null);

    const [redeemModal, setRedeemModal] = React.useState({
        open: false,
        message: ''
    });

    const handleClose = () => {
        setRedeemModal({
            open: false,
            message: ''
        });
    };

    const [cameraModal, setCameraModal] = React.useState(false);


    const handleCameraOpen = () => {
        setCameraModal(!cameraModal);
    };

    const onSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(form.data);
        form.clearErrors();
        const { token } = form.data;
        axios.post(route('transaction.redeem'), {
            token: token
        }).then((response) => {
            setRedeemModal({
                open: true,
                message: response.data.message
            });
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
            setRedeemModal({
                open: true,
                message: error.response.data.message
            });
        });
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
                            <InertiaLink href={route('transaction.index')}>
                                Kembali
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
                                onDetected={(result: { codeResult: { code: string; }; }) => {
                                    form.setData('token', result.codeResult.code)
                                    console.log(result.codeResult.code);
                                }
                                }
                            />
                                : null}
                        </div>
                        <p>{form.data.token}</p>
                    </div>
                </div>
            </div>
            <Dialog open={redeemModal.open} onClose={handleClose}
            >
                <DialogContent className="w-full">
                    <div>
                        <h3 className="font-bold text-lg">{redeemModal.message}</h3>
                    </div>
                </DialogContent>
            </Dialog>
        </DashboardAdminLayout>
    )
}
