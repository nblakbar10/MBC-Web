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
            <DialogContent className="w-full text-center flex flex-col gap-3 p-3" >
                <div className="text-xl">
                    Check Out
                </div>
                <div className="flex justify-around">
                    <button
                        className="bg-[#2EA1DA] hover:bg-blue-500 text-xl text-white font-bold py-1 px-7 rounded-lg"
                        onClick={closeHandler}
                    >
                        Kembali
                    </button>
                    <button
                        className="bg-[#2EA1DA] hover:bg-blue-500 text-xl text-white font-bold py-1 px-7 rounded-lg"
                        onClick={onCheckoutHandler}
                    >
                        Bayar
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
