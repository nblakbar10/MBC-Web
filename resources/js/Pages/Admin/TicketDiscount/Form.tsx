import React, { useEffect } from 'react';

import InputError from '@/Components/Jetstream/InputError';
import TextInput from '@/Components/Jetstream/TextInput';
import { InertiaFormProps } from '@inertiajs/inertia-react';
import { InputLabel, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { TicketDiscountCreateModel } from '@/Models/TicketDiscount';
import { TicketTypeModel } from '@/Models/TicketType';
import { EventModel } from '@/Models/Event';
import Select from 'react-select';

interface Props extends React.HTMLAttributes<HTMLElement> {
    form: InertiaFormProps<TicketDiscountCreateModel>,
    className?: string,
    ticketTypes: Array<TicketTypeModel>,
    events: Array<EventModel>,
}

export default function Form({ form, className, ticketTypes, events }: Props) {


    const numberInputHandler = (
        val: string,
        form: InertiaFormProps<TicketDiscountCreateModel>,
        column: keyof TicketDiscountCreateModel,
        max: number = 999999999,
    ) => {
        const value = parseInt(val, 10);
        if (isNaN(value)) {
            form.setData(column, 0);
        } else if (value > (max)) {
            form.setData(column, max);
        } else if (value < 0) {
            form.setData(column, 0);
        } else {
            form.setData(column, value);
        }
    }

    const [eventId, setEventId] = React.useState<number>(0);

    const eventOptions = [
        { label: "Pilih Event", value: 0 },
        ...events.map(event => ({ label: event.name, value: event.id }))
    ];

    const [ticketTypeOptions, setTicketTypeOptions] = React.useState<Array<{ label: string, value: number }>>([
        { label: "Pilih Jenis Tiket", value: 0 },
    ]);

    useEffect(() => {
        const filteredTicketTypes = ticketTypes.filter(
            tt => tt.event_id === eventId
        ).map(
            tt => ({ label: tt.name, value: tt.id })
        );
        if (eventId > 0) {
            if (filteredTicketTypes.length > 0) {
                setTicketTypeOptions([
                    { label: "Pilih Jenis Tiket", value: 0 },
                    ...filteredTicketTypes
                ]);
            } else {
                setTicketTypeOptions([
                    { label: "Tidak ada jenis tiket pada event yang dipilih", value: 0 },
                ]);
            }
        } else {
            setTicketTypeOptions([
                { label: "Pilih Jenis Tiket", value: 0 },
                ...ticketTypes.map(tt => ({ label: tt.name, value: tt.id }))
            ]);
        }
    }, [eventId, ticketTypes]);

    return (
        <div className={`flex-col gap-5 ${className}`}>
            <div className="form-control w-full mt-4">
                <InputLabel htmlFor="name">Nama Diskon Tiket</InputLabel>
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
                <InputLabel htmlFor="ticket_type_id">Jenis Tiket Event</InputLabel>
                <div className='flex flex-col gap-3'>
                    <div className='flex mt-2 border-t-2 py-3'>
                        <div className='flex-1'>
                            Event
                        </div>
                        <Select
                            id="event_id"
                            className="mt-1 block w-1/2"
                            value={eventOptions.find(option => option.value === eventId)}
                            onChange={e => setEventId(e?.value as number)}
                            options={eventOptions}
                        />
                    </div>
                    <div className='flex'>
                        <div className='flex-1'>
                            Jenis Tiket
                        </div>
                        <Select
                            id="event_id"
                            className="mt-1 block w-1/2"
                            value={ticketTypeOptions.find(option => option.value === form.data.ticket_type_id)}
                            onChange={e => form.setData('ticket_type_id', e?.value as number)}
                            options={ticketTypeOptions}
                        />
                    </div>
                </div>
                <InputError className="mt-2" message={form.errors.ticket_type_id} />
            </div>
            <div className="form-control w-full mt-4 flex flex-col gap-1">
                <InputLabel htmlFor="type">Tipe Diskon</InputLabel>
                <ToggleButtonGroup
                    id="type"
                    color='primary'
                    value={form.data.type}
                    exclusive
                    onChange={(_e: React.MouseEvent<HTMLElement>, v: "fixed" | "percentage") => form.setData('type', v)}
                    aria-label="text alignment"
                >
                    <ToggleButton value="fixed" aria-label="left aligned">
                        Tetap
                    </ToggleButton>
                    <ToggleButton value="percentage" aria-label="centered">
                        Persentase
                    </ToggleButton>
                </ToggleButtonGroup>
                <InputError className="mt-2" message={form.errors.type} />
            </div>
            <div className="form-control w-full mt-4">
                <InputLabel htmlFor="minimum_buy">Pemesanan Minimal</InputLabel>
                <TextInput
                    id="minimum_buy"
                    type="number"
                    className="mt-1 block w-full"
                    value={form.data.minimum_buy}
                    required
                    autoFocus
                    autoComplete="minimum_buy"
                    onChange={e => numberInputHandler(
                        e.target.value,
                        form,
                        'minimum_buy'
                    )}
                />
                <InputError className="mt-2" message={form.errors.minimum_buy} />
            </div>
            <div className="form-control w-full mt-4">
                <InputLabel htmlFor="stock">Stok</InputLabel>
                <TextInput
                    id="stock"
                    type="number"
                    className="mt-1 block w-full"
                    value={form.data.stock}
                    onChange={e => numberInputHandler(
                        e.target.value,
                        form,
                        'stock'
                    )}
                    required
                    autoFocus
                    autoComplete="stock"
                />
                <InputError className="mt-2" message={form.errors.stock} />
            </div>
            <div className="form-control w-full mt-4">
                <InputLabel htmlFor="amount">Besaran</InputLabel>
                <TextInput
                    id="amount"
                    type="number"
                    className="mt-1 block w-full"
                    value={form.data.amount}
                    onChange={e => numberInputHandler(
                        e.target.value,
                        form,
                        'amount',
                    )}
                    max={(form.data.type === 'percentage' ? 100 : undefined)}
                    required
                    autoFocus
                    autoComplete="amount"
                />
                <InputError className="mt-2" message={form.errors.amount} />
            </div>
        </div>
    )
}
