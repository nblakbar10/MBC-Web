import { asset } from "@/Models/Helper";
import { Dialog, DialogContent } from "@mui/material";
import { AxiosResponse } from "axios";
import React from "react";


interface Props {
    open: boolean;
    closeHandler: () => void;
    response: AxiosResponse;
}

export default function CheckOutModal({ open, closeHandler, response }: Props) {

    const onCheckoutHandler = () => {
        console.log(response);
    }

    return (
        <Dialog open={open} onClose={closeHandler} sx={{ borderRadius: 2 }} maxWidth="sm" fullWidth>
            <DialogContent className="w-full text-center flex flex-col gap-3 p-3 my-5" >
                {response.status === 200 ? onSuccessModal({ open, closeHandler, response }) : onFailedModal({ open, closeHandler, response })}
            </DialogContent>
        </Dialog>
    )
}


function onSuccessModal({ open, closeHandler, response }: Props) {
    return (
        <>
            <div className="flex justify-center my-5">
                <img
                    className="rounded-full w-3/5"
                    src={asset('root', 'assets/images/checkout-icon.jpg')}
                    alt="check"
                />
            </div>
            <div className="text-xl font-bold">
                Konfirmasi Email Transaksi Anda
            </div>
            <div className="text-md from-neutral-500 my-5">
                Silahkan Cek Email Anda Untuk Melakukan Pembayaran
            </div>
            <div className="text-md from-neutral-500">
                Catatan :Transaksi Hanya Dapat Dilakukan Dengan Email Aktif.
            </div>
            <div className="text-md from-neutral-500 ">
                Silahkan Mengisi Kembali Form Pembayaran Apabila Tidak Mendapat Link Pembayaran.
            </div>
            <div className="flex flex-col md:flex-row gap-3 justify-around">
                <button
                    className="bg-[#2EA1DA] hover:bg-blue-500 text-xl text-white font-bold py-3 px-7 rounded-lg"
                    onClick={closeHandler}
                >
                    Tutup
                </button>
                {/* <button
                    className="bg-[#2EA1DA] hover:bg-blue-500 text-xl text-white font-bold py-3 px-7 rounded-lg"
                    onClick={() => console.log(response)}
                >
                    Selanjutnya
                </button> */}
            </div>
        </>
    );
}

function onFailedModal({ open, closeHandler, response }: Props) {
    return (
        <>
            <div className="flex justify-center my-5">
                <img
                    className="rounded-full w-3/5"
                    src={asset('root', 'assets/images/checkout-failed-icon')}
                    alt="check"
                />
            </div>
            <div className="text-xl font-bold text-red-500 ">
                Pembayaran Gagal !!!
            </div>
            <div className="text-md from-neutral-500 my-10 text-red-500">
                {response && response.data && response.data.message ? response.data.message : "Terjadi Kesalahan saat memproses tagihan, silahkan coba lagi"}
            </div>
            <div className="flex flex-col md:flex-row gap-3 justify-around">
                <button
                    className="bg-[#2EA1DA] hover:bg-blue-500 text-xl text-white font-bold py-3 px-7 rounded-lg"
                    onClick={closeHandler}
                >
                    Tutup
                </button>
                {/* <button
                    className="bg-[#2EA1DA] hover:bg-blue-500 text-xl text-white font-bold py-3 px-7 rounded-lg"
                    onClick={() => console.log(response)}
                >
                    Selanjutnya
                </button> */}
            </div>
        </>
    );
}
