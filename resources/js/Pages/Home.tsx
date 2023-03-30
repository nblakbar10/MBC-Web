import BuyDialogForm from "@/Components/BuyDialogForm";
import AppLayout from "@/Layouts/AppLayout";
import { asset } from "@/Models/Helper";
import { Tab, Tabs } from "@mui/material";
import React, { useState } from "react";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <div className="p-3">
                    {children}
                </div>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Home() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <AppLayout>
            <div className="flex justify-center m-auto p-3 w-full md:w-5/6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <img
                        className="object-cover rounded-xl basis-2/3"
                        src={asset('root', 'assets/images/bg-caknan.jpeg')}
                    />
                    <div className="flex flex-col gap-3 ">
                        <div className="flex flex-col gap-3 p-auto basis-1/2 p-3 md:p-10 rounded-2xl border-stone-600 border-2">
                            <p className="text-xl md:text-4xl">
                                Balikpapan Fest 2023
                            </p>
                            <div className="text-md md:text-xl mt-10 flex flex-col gap-3">
                                <p className="flex gap-2">
                                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 10c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2m0-5c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3m-7 2.602c0-3.517 3.271-6.602 7-6.602s7 3.085 7 6.602c0 3.455-2.563 7.543-7 14.527-4.489-7.073-7-11.072-7-14.527m7-7.602c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602" /></svg>
                                    Balikpapan
                                </p>
                                <p className="flex gap-2">
                                    <svg width="24" height="24" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 122.88 122.88" ><g><path d="M81.61,4.73c0-2.61,2.58-4.73,5.77-4.73c3.19,0,5.77,2.12,5.77,4.73v20.72c0,2.61-2.58,4.73-5.77,4.73 c-3.19,0-5.77-2.12-5.77-4.73V4.73L81.61,4.73z M66.11,103.81c-0.34,0-0.61-1.43-0.61-3.2c0-1.77,0.27-3.2,0.61-3.2H81.9 c0.34,0,0.61,1.43,0.61,3.2c0,1.77-0.27,3.2-0.61,3.2H66.11L66.11,103.81z M15.85,67.09c-0.34,0-0.61-1.43-0.61-3.2 c0-1.77,0.27-3.2,0.61-3.2h15.79c0.34,0,0.61,1.43,0.61,3.2c0,1.77-0.27,3.2-0.61,3.2H15.85L15.85,67.09z M40.98,67.09 c-0.34,0-0.61-1.43-0.61-3.2c0-1.77,0.27-3.2,0.61-3.2h15.79c0.34,0,0.61,1.43,0.61,3.2c0,1.77-0.27,3.2-0.61,3.2H40.98 L40.98,67.09z M66.11,67.09c-0.34,0-0.61-1.43-0.61-3.2c0-1.77,0.27-3.2,0.61-3.2H81.9c0.34,0,0.61,1.43,0.61,3.2 c0,1.77-0.27,3.2-0.61,3.2H66.11L66.11,67.09z M91.25,67.09c-0.34,0-0.61-1.43-0.61-3.2c0-1.77,0.27-3.2,0.61-3.2h15.79 c0.34,0,0.61,1.43,0.61,3.2c0,1.77-0.27,3.2-0.61,3.2H91.25L91.25,67.09z M15.85,85.45c-0.34,0-0.61-1.43-0.61-3.2 c0-1.77,0.27-3.2,0.61-3.2h15.79c0.34,0,0.61,1.43,0.61,3.2c0,1.77-0.27,3.2-0.61,3.2H15.85L15.85,85.45z M40.98,85.45 c-0.34,0-0.61-1.43-0.61-3.2c0-1.77,0.27-3.2,0.61-3.2h15.79c0.34,0,0.61,1.43,0.61,3.2c0,1.77-0.27,3.2-0.61,3.2H40.98 L40.98,85.45z M66.11,85.45c-0.34,0-0.61-1.43-0.61-3.2c0-1.77,0.27-3.2,0.61-3.2H81.9c0.34,0,0.61,1.43,0.61,3.2 c0,1.77-0.27,3.2-0.61,3.2H66.11L66.11,85.45z M91.25,85.45c-0.34,0-0.61-1.43-0.61-3.2c0-1.77,0.27-3.2,0.61-3.2h15.79 c0.34,0,0.61,1.43,0.61,3.2c0,1.77-0.27,3.2-0.61,3.2H91.25L91.25,85.45z M15.85,103.81c-0.34,0-0.61-1.43-0.61-3.2 c0-1.77,0.27-3.2,0.61-3.2h15.79c0.34,0,0.61,1.43,0.61,3.2c0,1.77-0.27,3.2-0.61,3.2H15.85L15.85,103.81z M40.98,103.81 c-0.34,0-0.61-1.43-0.61-3.2c0-1.77,0.27-3.2,0.61-3.2h15.79c0.34,0,0.61,1.43,0.61,3.2c0,1.77-0.27,3.2-0.61,3.2H40.98 L40.98,103.81z M29.61,4.73c0-2.61,2.58-4.73,5.77-4.73s5.77,2.12,5.77,4.73v20.72c0,2.61-2.58,4.73-5.77,4.73 s-5.77-2.12-5.77-4.73V4.73L29.61,4.73z M6.4,45.32h110.07V21.47c0-0.8-0.33-1.53-0.86-2.07c-0.53-0.53-1.26-0.86-2.07-0.86H103 c-1.77,0-3.2-1.43-3.2-3.2c0-1.77,1.43-3.2,3.2-3.2h10.55c2.57,0,4.9,1.05,6.59,2.74c1.69,1.69,2.74,4.02,2.74,6.59v27.06v65.03 c0,2.57-1.05,4.9-2.74,6.59c-1.69,1.69-4.02,2.74-6.59,2.74H9.33c-2.57,0-4.9-1.05-6.59-2.74C1.05,118.45,0,116.12,0,113.55V48.52 V21.47c0-2.57,1.05-4.9,2.74-6.59c1.69-1.69,4.02-2.74,6.59-2.74H20.6c1.77,0,3.2,1.43,3.2,3.2c0,1.77-1.43,3.2-3.2,3.2H9.33 c-0.8,0-1.53,0.33-2.07,0.86c-0.53,0.53-0.86,1.26-0.86,2.07V45.32L6.4,45.32z M116.48,51.73H6.4v61.82c0,0.8,0.33,1.53,0.86,2.07 c0.53,0.53,1.26,0.86,2.07,0.86h104.22c0.8,0,1.53-0.33,2.07-0.86c0.53-0.53,0.86-1.26,0.86-2.07V51.73L116.48,51.73z M50.43,18.54 c-1.77,0-3.2-1.43-3.2-3.2c0-1.77,1.43-3.2,3.2-3.2h21.49c1.77,0,3.2,1.43,3.2,3.2c0,1.77-1.43,3.2-3.2,3.2H50.43L50.43,18.54z" /></g></svg>
                                    10 April - 15 April 2023
                                </p>
                                <p className="flex gap-2">
                                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm0 11h6v1h-7v-9h1v8z" /></svg>
                                    14:00 - 22:00
                                </p>
                            </div>
                            <div className="border-black border-t-2 text-md md:text-xl my-5">
                                <p>
                                    Diselenggarakan Oleh
                                </p>
                                <p className="font-bold">
                                    MBC Entertainment
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <button className="bg-blue-400 hover:bg-blue-500 text-xl text-white font-bold py-3 px-7 rounded-lg" onClick={handleOpen}>
                                Beli Tiket
                            </button>
                        </div>
                    </div>
                    <div className="p-10  h-96 rounded-2xl">
                        <div>
                            <Tabs value={tabValue} onChange={handleTabChange} centered variant="fullWidth">
                                <Tab label="Deskripsi" {...a11yProps(0)} />
                                <Tab label="Promo Tiket" {...a11yProps(1)} />
                            </Tabs>
                            <TabPanel value={tabValue} index={0}>
                                <div className="my-auto text-4xl">
                                    Deskripsi
                                </div>
                            </TabPanel>
                            <TabPanel value={tabValue} index={1}>
                                <div className="flex flex-col my-3 gap-3">
                                    <div className="p-4 border-stone-600 border-2 flex flex-col gap-2">
                                        <p className="text-xl text-cyan-500 font-bold">
                                            PROMOTIONAL SALES 1
                                        </p>
                                        <p>
                                            Harga Belum Termasuk Pajak dan Biaya Layanan
                                        </p>
                                        <div className="border-black border-t-2 text-md md:text-xl my-5 flex justify-between py-3">
                                            <p className="font-bold">
                                                {`Rp. ${Number(100000).toLocaleString()}`}
                                            </p>
                                            <p className="font-semibold text-pink-500">
                                                PROMO ENDED
                                            </p>
                                        </div>
                                    </div>
                                    <div className="p-4 border-stone-600 border-2 flex flex-col gap-2">
                                        <p className="text-xl text-cyan-500 font-bold">
                                            PROMOTIONAL SALES 2
                                        </p>
                                        <p>
                                            Harga Belum Termasuk Pajak dan Biaya Layanan
                                        </p>
                                        <div className="border-black border-t-2 text-md md:text-xl my-5 flex justify-between py-3">
                                            <p className="font-bold">
                                                {`Rp. ${Number(100000).toLocaleString()}`}
                                            </p>
                                            <button className="bg-blue-400 hover:bg-blue-500 text-xl text-white font-bold py-1 px-7 rounded-lg" onClick={handleOpen}>
                                                Beli Tiket
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </div>
                    </div>
                    <div className="flex justify-center p-10">
                        <img
                            className="object-cover rounded-xl basis-2/3"
                            src={asset('root', 'assets/images/peta.jpg')}
                        />
                    </div>
                </div>
            </div>
            <BuyDialogForm open={open} closeHandler={handleClose} />
        </AppLayout>
    )
}
