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
                <nav className="bg-[#262626] flex justify-around">
                    <div className="flex w-full lg:w-5/6 p-5 lg:px-1 justify-between">
                        <div className="my-auto">
                            <img
                                src={asset('root', 'assets/images/MBC_HD.png')}
                                alt="Logo"
                                width={200}
                            />
                        </div>
                        <div className="flex gap-3 px-1">
                            <form className="hidden sm:block text-md my-auto border-r p-3">
                                <div className="relative flex w-auto grow rounded text-gray-400 focus-within:text-gray-600">
                                    <input
                                        className="w-full appearance-none p-3 rounded-l-lg focus:outline-none xxs:pr-4"
                                        placeholder="Cari Event"
                                    >
                                    </input>
                                    <button
                                        className="py-3 px-3 text-white bg-stone-400 rounded-r-lg hover:bg-stone-600 leading-relaxed"
                                    >
                                        <SearchIcon/>
                                    </button>
                                </div>
                            </form>

                            <button
                                className="px-2 rounded-lg hover:bg-gray-700"
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
                <footer className="w-full h-auto bg-[#767171]">
                    <div className="container flex justify-center m-auto p-3 mt-8 mb-5">
                        <div className="object-cover object-center rounded-xl ">
                            <img
                                src={asset('root', 'assets/images/MBC_HD.png')}
                                className="justify-center"
                                width={200}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 ">
                        <div className="flex flex-col items-center justify-center">
                            <p className="text-base font-bold text-[#FFFFFF] break-normal">About Us</p>
                            <p className="text-base text-center text-[#FFFFFF] p-5">Lorem ipsum dolor sitptatibus impedit numquam aliquid eum animi dignissimos fuga, atque, labore laborum? Maxime magni obcaecati labore perferendis deleniti enim dignissimos?</p>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <p className="text-base font-bold text-[#FFFFFF] break-normal">Help</p>
                            <p className="text-base text-center text-[#FFFFFF] p-5">Lorem ipsum dolor sitptatibus impedit numquam aliquid eum animi dignissimos fuga, atque, labore laborum? Maxime magni obcaecati labore perferendis deleniti enim dignissimos?</p>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <p className="text-base font-bold text-[#FFFFFF] break-normal">Contact Us</p>
                            <p className="text-base text-center text-[#FFFFFF] p-5">Lorem ipsum dolor sitptatibus impedit numquam aliquid eum animi dignissimos fuga, atque, labore laborum? Maxime magni obcaecati labore perferendis deleniti enim dignissimos?</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center border-t-2 my-2 p-2">

                            <p className="text-sm text-center font-bold text-[#FFFFFF] break-normal">© 2023 CV. Maju Bersama Creative. All Rights Reserved.</p>

                    </div>

                </footer>
            </div >
        </>
    );
}
