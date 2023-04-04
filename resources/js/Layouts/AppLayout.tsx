import { asset } from "@/Models/Helper";
import { Head } from "@inertiajs/inertia-react";
import React from "react";

interface Props {
    children: React.ReactNode;
    title? : string;
}

export default function AppLayout({ children, title }: Props) {
    return (
        <>
            <Head  >
                <title>{title || "LoketMBC"}</title>
                <link rel="icon" type="image/svg+xml" href={asset('root', 'assets/images/Icon-MBC.JPG')} />
            </Head>
            <div className="min-h-screen bg-white flex flex-col">
                <nav className="flex w-full bg-[#2EA1DA] p-5 pl-20">
                    <div className="ml-7">
                        <img
                            src={asset('root', 'assets/images/MBC_HD.png')}
                            alt="Logo"
                            width={200}
                        />
                    </div>
                </nav>
                {children}
                <div className="w-full h-60 bg-pink-600">
                </div>
            </div >
        </>
    );
}
