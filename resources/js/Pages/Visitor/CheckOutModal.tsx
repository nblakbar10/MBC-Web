import { asset } from "@/Models/Helper";
import { Dialog, DialogContent } from "@mui/material";
import React from "react";


interface Props {
    open: boolean;
    closeHandler: () => void;
    xenditLink: string;
}

export default function CheckOutModal({ open, closeHandler, xenditLink }: Props) {

    const onCheckoutHandler = () => {
        console.log('checkout', xenditLink);
    }

    return (
        <Dialog open={open} onClose={closeHandler} sx={{ borderRadius: 2 }} maxWidth="sm" fullWidth>
            <DialogContent className="w-full text-center flex flex-col gap-3 p-3 my-5" >
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
                <div className="text-md from-neutral-500 my-10">
                    Silahkan memilih tombol "Selanjutnya" untuk melakukan pembayaran
                </div>
                <div className="flex flex-col md:flex-row gap-3 justify-around">
                    <button
                        className="bg-[#2EA1DA] hover:bg-blue-500 text-xl text-white font-bold py-3 px-7 rounded-lg"
                        onClick={closeHandler}
                    >
                        Kembali
                    </button>
                    <button
                        className="bg-[#2EA1DA] hover:bg-blue-500 text-xl text-white font-bold py-3 px-7 rounded-lg"
                        onClick={onCheckoutHandler}
                    >
                        Selanjutnya
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
