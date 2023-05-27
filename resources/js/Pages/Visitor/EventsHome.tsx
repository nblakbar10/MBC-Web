import InputLabel from "@/Components/Jetstream/InputLabel";
import TextInput from "@/Components/Jetstream/TextInput";
import AppLayout from "@/Layouts/AppLayout";
import { asset } from "@/Models/Helper";
import React, { useEffect, useState } from "react";
import Select from "react-select";

interface District {
    id: string;
    name: string;
}

export default function EventsHome() {

    const [provinceSelected, setProvinceSelected] = useState<District>({
        id: '64',
        name: 'Kalimantan Timur',
    });
    const [citySelected, setCitySelected] = useState<District>({
        id: '',
        name: '',
    });



    useEffect(() => {
        function fetchProvince() {
            fetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json', {
                method: 'GET',
            })
                .then(response => response.json())
                .then(responseJson => {
                    setProvinces(responseJson);
                })
                .catch(error => {
                    console.error(error);
                });
        }
        fetchProvince();
    }, []);


    const [provinces, setProvinces] = React.useState([]);

    return (
        <AppLayout>
            <div className="flex justify-center w-5/6 m-auto md:m-0 md:w-full ">
                <div className="flex flex-col gap-3 py-5 px-5  lg:px-32">
                    <img
                        className=" lg:h-[50rem] w-screen object-cover rounded"
                        src={asset('root', 'assets/images/bg-caknan.jpeg')}
                    />
                    <div className="flex flex-col lg:flex-row gap-3 mt-5 justify-around rounded-xl shadow-sm shadow-slate-600 p-5">
                        <div className="form-control w-full mt-4 lg:mr-7    ">
                            <InputLabel htmlFor="Search">Nama Event</InputLabel>
                            <TextInput
                                id="Search"
                                type="text"
                                className="mt-1 block w-full"
                                value={""}
                                onChange={e => console.log(e.currentTarget.value)}
                            />
                        </div>
                        <div className="form-control w-full mt-4">
                            <InputLabel htmlFor="month">Bulan</InputLabel>
                            <Select
                                id="month"
                                className="mt-1 block w-full"
                                value={provinceSelected}
                                onChange={e => setProvinceSelected(e as District)}
                                getOptionValue={option => option.id}
                                getOptionLabel={option => option.name}
                                options={provinces}
                            />
                        </div>
                        <div className="form-control w-full mt-4">
                            <InputLabel htmlFor="year">Tahun</InputLabel>
                            <TextInput
                                id="Search"
                                type="number"
                                min={2020}
                                className="mt-1 block w-full"
                                value={2023}
                                onChange={e => console.log(e.currentTarget.value)}
                            />
                        </div>
                        <div className="form-control w-full mt-4">
                            <InputLabel htmlFor="province">Provinsi</InputLabel>
                            <Select
                                id="year"
                                className="mt-1 block w-full"
                                value={provinceSelected}
                                onChange={e => setProvinceSelected(e as District)}
                                getOptionValue={option => option.id}
                                getOptionLabel={option => option.name}
                                options={provinces}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-3 -mx-5 ">
                        <div className="flex flex-col gap-3 pb-5 m-5 rounded-xl shadow-md shadow-slate-600">
                            <img
                                className="w-full h-56   object-cover rounded-t-xl"
                                src={asset('root', 'assets/images/bg-caknan.jpeg')}
                            />
                            <div className="flex flex-col gap-2 p-3">
                                <div className="w-full">
                                    SMILE FEST LOS DOL 2023
                                </div>
                                <div className="w-full">
                                    Kalimantan Timur
                                </div>
                                <div className="w-full">
                                    13 Mei 2023 - 15 Mei 2023
                                </div>
                                <div className="w-full font-bold">
                                    Rp. {(120000).toLocaleString()}
                                </div>
                                <div className="w-full font-bold border-t border-gray-600 text-gray-600">
                                    MBC Smile Fest
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
