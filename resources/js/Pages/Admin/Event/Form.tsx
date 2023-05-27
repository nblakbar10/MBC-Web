import React, { useEffect, useState } from 'react';
import Select from 'react-select';

import InputError from '@/Components/Jetstream/InputError';
import TextInput from '@/Components/Jetstream/TextInput';
import { InertiaFormProps } from '@inertiajs/inertia-react';
import { InputLabel } from '@mui/material';
import { EventCreateModel } from '@/Models/Event';
import Input from '@/Components/Jetstream/Input';
import ZoomableImage from '@/Components/ZoomableImage';
import { District } from '@/Models/Helper';
import useIndonesiaCityAPI from '@/Hooks/useIndonesianCityAPI';

interface Props extends React.HTMLAttributes<HTMLElement> {
    form: InertiaFormProps<EventCreateModel>,
    className?: string,
}

export default function Form(props: Props) {

    const form = props.form;

    const {
        provinceSelected,
        setProvinceSelected,
        provinces,
        citiesProvince,
    } = useIndonesiaCityAPI();

    return (
        <div className={`flex-col gap-5 ${props.className}`}>
            <div className="form-control w-full mt-4">
                <InputLabel htmlFor="name">Nama</InputLabel>
                <TextInput
                    id="name"
                    type="text"
                    className="mt-1 block w-full"
                    value={form.data.name}
                    onChange={e => form.setData('name', e.currentTarget.value)}
                    required
                    autoFocus
                    autoComplete="name"
                />
                <InputError className="mt-2" message={form.errors.name} />
            </div>
            <div className="form-control w-full mt-4">
                <InputLabel htmlFor="description">Deskripsi</InputLabel>
                <TextInput
                    id="description"
                    type="text"
                    className="mt-1 block w-full"
                    value={form.data.description}
                    onChange={e => form.setData('description', e.currentTarget.value)}
                    required
                    autoFocus
                    autoComplete="description"
                />
                <InputError className="mt-2" message={form.errors.description} />
            </div>
            <div className="form-control w-full mt-4">
                <InputLabel htmlFor="image">Kota/Kabupaten</InputLabel>
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
                    value={citiesProvince.find(city => city.name === form.data.city)}
                    onChange={e => form.setData('city', e?.name as string)}
                    getOptionValue={option => option.id}
                    getOptionLabel={option => option.name}
                    options={citiesProvince}
                />
            </div>
            <div className="form-control w-full mt-4">
                <InputLabel htmlFor="location">Lokasi</InputLabel>
                <TextInput
                    id="location"
                    type="text"
                    className="mt-1 block w-full"
                    value={form.data.location}
                    onChange={e => form.setData('location', e.currentTarget.value)}
                    required
                    autoFocus
                    autoComplete="location"
                />
                <InputError className="mt-2" message={form.errors.location} />
            </div>
            <div className="form-control w-full mt-4">
                <InputLabel htmlFor="maximum_buy">Maksimal Pembelian</InputLabel>
                <TextInput
                    id="maximum_buy"
                    type="number"
                    className="mt-1 block w-full"
                    value={form.data.maximum_buy}
                    onChange={e => form.setData('maximum_buy', parseInt(e.currentTarget.value))}
                    required
                    autoFocus
                    autoComplete="maximum_buy"
                />
                <InputError className="mt-2" message={form.errors.maximum_buy} />
            </div>
            <div className="form-control w-full mt-4">
                <InputLabel htmlFor="start_date">Waktu Mulai</InputLabel>
                {form.data.start_date.toString}
                <Input
                    id="start_date"
                    type="datetime-local"
                    className="mt-1 block w-full"
                    value={form.data.start_date}
                    onChange={e => form.setData('start_date', e.currentTarget.value)}
                    autoFocus
                    autoComplete="start_date"
                />
                <InputError className="mt-2" message={form.errors.start_date} />
            </div>
            <div className="form-control w-full mt-4">
                <InputLabel htmlFor="end_date">Waktu Selesai</InputLabel>
                <Input
                    id="end_date"
                    type="datetime-local"
                    className="mt-1 block w-full"
                    value={form.data.end_date}
                    onChange={e => form.setData('end_date', e.currentTarget.value)}
                    required
                    autoFocus
                    autoComplete="end_date"
                />
                <InputError className="mt-2" message={form.errors.end_date} />
            </div>
            <div className="form-control w-full mt-4">
                <InputLabel htmlFor="poster">Poster</InputLabel>
                <Input
                    id="poster"
                    type="file"
                    className="mt-1 block w-full"
                    onChange={e => {
                        form.setData('poster', {
                            file: e.target?.files?.item(0) || undefined,
                            path: "",
                            disk: 'public'
                        });
                        // form.setData('poster', URL.createObjectURL(e.target?.files?.item(0) || undefined));
                    }}
                    autoFocus
                    autoComplete="poster"
                />
                <InputError className="mt-2" message={form.errors.poster} />
                <ZoomableImage
                    img={form.data.poster ? form.data.poster : form.data.poster_url}
                    onChange={(_) => {} }
                    title="Gambar Yang Diinputkan"
                />
            </div>
            <div className="form-control w-full mt-4">
                <InputLabel htmlFor="event_map">Denah Event</InputLabel>
                <Input
                    id="event_map"
                    type="file"
                    className="mt-1 block w-full"
                    onChange={e => {
                        form.setData('event_map', {
                            file: e.target?.files?.item(0) || undefined,
                            path: "",
                            disk: 'public'
                        });
                    }}
                    autoFocus
                    autoComplete="event_map"
                />
                <InputError className="mt-2" message={form.errors.event_map} />
                <ZoomableImage
                    img={form.data.event_map ? form.data.event_map : form.data.event_map_url}
                    onChange={(_) => {} }
                    title="Gambar Yang Diinputkan"
                />
            </div>
            <div className="form-control w-full mt-4">
                <InputLabel htmlFor="preview">Preview</InputLabel>
                <Input
                    id="preview"
                    type="file"
                    className="mt-1 block w-full"
                    onChange={e => {
                        form.setData('preview', {
                            file: e.target?.files?.item(0) || undefined,
                            path: "",
                            disk: 'public'
                        });
                    }}
                    autoFocus
                    autoComplete="preview"
                />
                <InputError className="mt-2" message={form.errors.preview} />
                <ZoomableImage
                    img={form.data.preview ? form.data.preview : form.data.preview_url }
                    onChange={(_) => {} }
                    title="Gambar Yang Diinputkan"
                />
            </div>
        </div>
    )
}
