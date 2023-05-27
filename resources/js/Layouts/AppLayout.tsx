import Banner from "@/Components/Jetstream/Banner";
import { asset } from "@/Models/Helper";
import { Head } from "@inertiajs/inertia-react";
import React from "react";

interface Props {
    children: React.ReactNode;
    title?: string;
}

export default function AppLayout({ children, title }: Props) {
    return (
        <>
            <Head  >
                <title>{title || "LoketMBC"}</title>
                <link rel="icon" type="image/svg+xml" href={asset('root', 'assets/images/Icon-MBC.JPG')} />
            </Head>
            <Banner />
            <div className="min-h-screen bg-white flex flex-col gap-3">
                <nav className="bg-gray-800 flex justify-center">
                    <div className="flex w-full lg:w-5/6 p-5">
                        <div className="">
                            <img
                                src={asset('root', 'assets/images/MBC_HD.png')}
                                alt="Logo"
                                width={200}
                            />
                        </div>
                    </div>
                </nav>
                {children}
                <footer className="w-full h-60 bg-stone-500">
                    <div className="container flex justify-center m-auto p-3 mt-8 ">
                        <div className="object-cover object-center rounded-xl shadow-md h-auto">
                        </div>
                    </div>
                </footer>
            </div >
        </>
    );
}
