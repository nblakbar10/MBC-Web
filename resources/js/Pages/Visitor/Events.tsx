import TextInput from "@/Components/Jetstream/TextInput";
import ZoomableImage from "@/Components/ZoomableImage";
import useIndonesiaCityAPI from "@/Hooks/useIndonesianCityAPI";
import AppLayout from "@/Layouts/AppLayout";
import { District, Pagination as PaginationModel, asset } from "@/Models/Helper";
import Select from 'react-select';
import React, { useEffect, useState } from "react";
import { InertiaLink, useForm } from "@inertiajs/inertia-react";
import listMonth from "@/Static/ListMonth";
import { Inertia } from "@inertiajs/inertia";
import route from "ziggy-js";
import { Stack, Pagination } from "@mui/material";
import { EventModel } from "@/Models/Event";
import { PaginationState } from "@tanstack/react-table";
import axios from "axios";
import ReactLoading from 'react-loading';
import { set } from "lodash";

interface Props {
    events: PaginationModel<EventModel>;
}

export default function Events(props: Props) {

    const [events, setEvents] = useState<PaginationModel<EventModel>>(props.events);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 8,
    });

    const {
        provinceSelected,
        setProvinceSelected,
        provinces,
        citiesProvince,
    } = useIndonesiaCityAPI();

    const form = useForm({
        name: '',
        year: '',
        month: '',
        city: '',
    });

    useEffect(() => {
        const fetchEvents = async () => {
            const params: {
                page: number,
                city?: string,
                month?: string,
                year?: string,
                name?: string,
            } = {
                page: pagination.pageIndex + 1,
            }
            if (form.data.city !== "") {
                params.city = form.data.city;
            }
            if (form.data.month !== "") {
                params.month = form.data.month;
            }
            if (form.data.year !== "") {
                params.year = form.data.year;
            }
            if (form.data.name !== "") {
                params.name = form.data.name;
            }
            axios.get(route('api.visitorEvents', params),
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                    },
                }).then((response) => {
                    setEvents(response.data as PaginationModel<EventModel>);
                }
                ).catch((error) => {
                    console.log(error);
                });

        };

        setIsLoading(true);
        const timer = setTimeout(() => {
            fetchEvents();
            setIsLoading(false);
        }, 3000);

        return () => clearTimeout(timer);

    }, [JSON.stringify(pagination), JSON.stringify(form.data)]);



    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const url = new URL(route(route().current()!).toString());

        url.searchParams.delete('city');
        url.searchParams.delete('month');
        url.searchParams.delete('year');
        url.searchParams.delete('name');

        if (form.data.city !== "") {
            url.searchParams.set('city', form.data.city);
        }
        if (form.data.month !== "") {
            url.searchParams.set('month', form.data.month);
        }
        if (form.data.year !== "") {
            url.searchParams.set('year', form.data.year);
        }
        if (form.data.name !== "") {
            url.searchParams.set('name', form.data.name);
        }

        Inertia.visit(url.toString(), {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };


    return (
        <AppLayout>
            <div className="h-auto mb-auto">
                <div className="w-5/6 flex flex-col lg:flex-row mx-auto gap-5 p-5">
                    <div className="w-full lg:w-1/3 xl:w-1/4 flex flex-col gap-5 ">
                        <div className="text-3xl font-bold">Filter</div>
                        <form className="rounded-2xl border-2 shadow-md ">
                            <div className="flex flex-col gap-3 px-5 p-3">
                                <div>
                                    <label>Nama Event</label>
                                    <TextInput
                                        type="text"
                                        value={form.data.name}
                                        onChange={e => form.setData('name', e.target.value)}
                                        className="border-2 rounded-md px-2 py-3 mt-1 block w-full"
                                    />
                                </div>
                                <div>
                                    <label>Tahun</label>
                                    <TextInput
                                        type="number"
                                        value={form.data.year}
                                        onChange={e => form.setData('year', e.target.value)}
                                        className="border-2 rounded-md px-2 py-3 mt-1 block w-full"
                                    />
                                </div>
                                <div className="w-full">
                                    <label>Bulan</label>
                                    <Select
                                        className="border-2 rounded-md px-2 py-3 mt-1 block w-full"
                                        id="month"
                                        value={listMonth.find(month => month.value === parseInt(form.data.month))}
                                        onChange={e => form.setData('month', e?.value.toLocaleString() || "")}
                                        getOptionValue={option => option.value.toString()}
                                        getOptionLabel={option => option.name}
                                        options={listMonth}
                                    />
                                </div>
                                <div className="w-full flex flex-col gap-3">
                                    <label>Provinsi</label>
                                    <Select
                                        id="year"
                                        className="mt-1 block w-full"
                                        value={provinceSelected}
                                        onChange={e => setProvinceSelected(e as District)}
                                        getOptionValue={option => option.id}
                                        getOptionLabel={option => option.name}
                                        options={provinces}
                                    />
                                    <label>Kota/Kabupaten</label>
                                    <Select
                                        id="year"
                                        className="mt-1 block w-full"
                                        value={citiesProvince.find(city => city.name === form.data.city) || { id: '', name: '' }}
                                        onChange={e => form.setData('city', e?.name as string)}
                                        getOptionValue={option => option.id}
                                        getOptionLabel={option => option.name}
                                        options={citiesProvince}
                                    />
                                </div>
                                <div className="flex justify-center border-t-2 my-2">
                                    <button
                                        className="bg-gray-700 hover:bg-gray-500 text-white rounded-full px-4 py-2 my-3 font-mono"
                                        onClick={onSubmit}
                                    >
                                        Filter
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="flex-1 flex flex-col gap-3">
                        <div className="text-3xl font-bold">
                            Events
                        </div>
                        {isLoading ? (
                            <div className="text-center text-black text-lg flex flex-col mx-auto gap-3">
                                <div className='flex justify-center'>
                                    <ReactLoading color="#51B3AA" type='spin' />
                                </div>
                                <p>Memuat Event...</p>
                            </div>
                        ) : (
                                    events.data.length > 0 ? (
                                        <>
                                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 p-1">
                                                {events.data.map((item, i) => (
                                                    <div className="flex justify-center rounded-2xl border-2 shadow-md" key={item.id}>
                                                        <div className="flex flex-col gap-3 w-full">
                                                            <div className="flex justify-center">
                                                                <InertiaLink href={route('visitor.event-detail', item.id)}>
                                                                    <img className="w-full object-cover rounded-t-2xl" src={asset('public', item.preview_url)} alt="" />
                                                                </InertiaLink>
                                                            </div>
                                                            <div className="flex flex-col gap-3 px-5">
                                                                <div className="text-2xl ">{item.name}</div>
                                                                <div className="text-md text-gray-700">Mulai {new Date(item.start_date).toLocaleDateString("id") + '-' + new Date(item.end_date).toLocaleTimeString("id")}</div>
                                                                <div className="text-md text-gray-700">Selesai {new Date(item.end_date).toLocaleDateString("id") + '-' + new Date(item.start_date).toLocaleTimeString("id")}</div>
                                                                <div className="flex justify-center border-t-2 my-2">
                                                                    <InertiaLink
                                                                        href={route('visitor.event-detail', item.id)}
                                                                        className="bg-gray-700 text-white rounded-full px-4 py-2 my-3 hover:bg-gray-500">
                                                                        Buy Ticket
                                                                    </InertiaLink>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="flex justify-end">
                                                <Stack spacing={2}>
                                                    <Pagination
                                                        count={events.last_page}
                                                        shape="rounded"
                                                        onChange={(e, page) => {
                                                            setPagination({
                                                                ...pagination,
                                                                pageIndex: page - 1,
                                                            });
                                                        }}
                                                    />
                                                </Stack>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex justify-center items-center h-96">
                                            <div className="text-3xl font-bold text-gray-600">Tidak Ada Event</div>
                                        </div>
                                    )
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

