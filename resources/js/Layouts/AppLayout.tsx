import Banner from "@/Components/Jetstream/Banner";
import { asset } from "@/Models/Helper";
import { Head } from "@inertiajs/inertia-react";
import React from "react";
import EventIcon from '@mui/icons-material/Event';
import SearchIcon from "@mui/icons-material/Search";

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
            <div className="min-h-screen bg-white flex flex-col">
                <nav className="bg-gray-800 flex justify-around">
                    <div className="flex w-full lg:w-5/6 p-5 gap-10 justify-between">
                        <div className="my-auto">
                            <img
                                src={asset('root', 'assets/images/MBC_HD.png')}
                                alt="Logo"
                                width={200}
                            />
                        </div>
                        <div className="flex gap-3  px-3">
                            <form className="hidden lg:block text-md my-auto border-r p-3 px-12">
                                <input
                                    className="p-3 rounded-l-lg w-96 leading-relaxed"
                                    placeholder="Cari Event"
                                >
                                </input>
                                <button
                                    className="py-3 px-3 text-white bg-stone-400 rounded-r-lg hover:bg-stone-600 leading-relaxed"
                                >
                                    <SearchIcon/>
                                </button>
                            </form>
                            <button
                                className="px-4 rounded-lg hover:bg-gray-700"
                            >
                                <div className="flex-col text-white">
                                    <EventIcon
                                        fontSize="large"
                                    />
                                    <p className="text-sm ">Events</p>
                                </div>
                            </button>
                        </div>

                    </div>
                </nav>
                {children}
                <footer className="w-full h-60 bg-[#767171]">
                    <div className="container flex justify-center m-auto p-3 mt-8 ">
                        <div className="object-cover object-center rounded-xl shadow-md h-auto">
                            <img
                                src={asset('root', 'assets/images/MBC_HD.png')}
                                className="justify-center"
                                width={200}

                            />
                        </div>
                    </div>
                </footer>
            </div >
        </>
    );
}
