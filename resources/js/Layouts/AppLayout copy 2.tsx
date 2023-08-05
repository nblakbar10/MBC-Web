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
                <nav className="flex w-full bg-[#262626] p-5 pl-20">
                    <div className="flex justify-around m-auto p-3 w-full md:w-5/6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            {/* <!-- logo --> */}
                            <div className="flex items-center justify-center">
                                <img
                                    src={asset('root', 'assets/images/MBC_HD.jpg')}
                                    alt="Logo"
                                    width={200}
                                />
                            </div>
                            {/* <!-- search bar --> */}
                            <div className="flex items-center justify-center  ">
                                <div className="flex rounded ">
                                    <input type="text" className="px-4 py-2 w-80" placeholder="Search..."/>
                                    <button className="flex items-center justify-center px-4 border-l bg-[#7E7B73]">
                                        <svg className="w-6 h-6 text-[#FFFFFF]" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24">
                                            <path
                                                d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            {/* <!-- event icon --> */}
                            <div className="flex items-center justify-center gap-3">
                                <button className="flex text-sm text-white border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
                                    <EventIcon fontSize="large"/>
                                </button>
                                <div className="h-300 min-h-[2em] w-0.5 bg-[#767171]">
                                    <span className="text-md text-[#FFFFFF]">Event</span>
                                </div>

                                {/* <!-- button login --> */}
                                {/* <div className="">
                                    <button
                                        type="button"
                                        className="inline-block rounded-[10px] bg-[#FFFFFF] mr-2 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-[#262626]">
                                        Success
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-block rounded-[10px] border-2 border-[#FFFFFF] bg-[#262626] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-[#FFFFFF] ">
                                        Danger
                                    </button>
                                </div> */}
                            </div>
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
