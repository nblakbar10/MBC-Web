import React from 'react';
import Select from 'react-select';

import InputError from '@/Components/Jetstream/InputError';
import TextInput from '@/Components/Jetstream/TextInput';
import { InertiaFormProps } from '@inertiajs/inertia-react';
import { InputLabel } from '@mui/material';
import { TicketTypeCreateModel } from '@/Models/TicketType';
import { EventModel } from '@/Models/Event';

interface Props extends React.HTMLAttributes<HTMLElement> {
    form: InertiaFormProps<TicketTypeCreateModel>,
    events: Array<EventModel>,
    className?: string,
}

export default function Form(props: Props) {

    const { form, events } = props;

    const eventOptions = [
        { label: "Pilih Event", value: 0 },
        ...events.map(event => ({ label: event.name, value: event.id }))
    ]

    console.log(form.data)

    return (
        <div className={`flex-col gap-5 ${props.className}`}>
            <div className="form-control w-full mt-4">
                <InputLabel htmlFor="name">Nama Jenis Tiket</InputLabel>
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
                <InputLabel htmlFor="stock">Stok</InputLabel>
                <TextInput
                    id="stock"
                    type="number"
                    className="mt-1 block w-full"
                    value={form.data.stock}
                    onChange={e => form.setData('stock', Number(e.currentTarget.value))}
                    required
                    autoFocus
                    autoComplete="stock"
                />
                <InputError className="mt-2" message={form.errors.stock} />
            </div>
            <div className="form-control w-full mt-4">
                <InputLabel htmlFor="price">Harga Tiket</InputLabel>
                <TextInput
                    id="price"
                    type="text"
                    className="mt-1 block w-full"
                    value={form.data.price}
                    onChange={e => form.setData('price', Number(e.currentTarget.value))}
                    required
                    autoFocus
                    autoComplete="price"
                />
                <InputError className="mt-2" message={form.errors.price} />
            </div>
            <div className="form-control w-full mt-4">
                <InputLabel htmlFor="fee">Pajak</InputLabel>
                <TextInput
                    id="fee"
                    type="text"
                    className="mt-1 block w-full"
                    value={form.data.fee}
                    onChange={e => form.setData('fee', Number(e.currentTarget.value))}
                    required
                    autoFocus
                    autoComplete="fee"
                />
                <InputError className="mt-2" message={form.errors.fee} />
            </div>
            <div className="form-control w-full mt-4">
                <InputLabel htmlFor="maximum_buy">Maksimum Pembelian</InputLabel>
                <TextInput
                    id="maximum_buy"
                    type="text"
                    className="mt-1 block w-full"
                    value={form.data.maximum_buy}
                    onChange={e => form.setData('maximum_buy', Number(e.currentTarget.value))}
                    required
                    autoFocus
                    autoComplete="maximum_buy"
                />
                <InputError className="mt-2" message={form.errors.price} />
            </div>
            <div className="form-control w-full mt-4">
                <InputLabel htmlFor="price">Event</InputLabel>
                <Select
                    id="event_id"
                    className="mt-1 block w-full"
                    value={eventOptions.find(option => option.value === form.data.event_id)}
                    onChange={e => form.setData('event_id',e?.value || 0)}
                    options={eventOptions}
                />
                <InputError className="mt-2" message={form.errors.event_id} />
            </div>
        </div>
    )
}
