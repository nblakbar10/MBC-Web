import React from 'react';
import Select from 'react-select';

import InputError from '@/Components/Jetstream/InputError';
import TextInput from '@/Components/Jetstream/TextInput';
import { InertiaFormProps } from '@inertiajs/inertia-react';
import { InputLabel } from '@mui/material';
import { PromoCreateModel } from '@/Models/Promo';

interface Props extends React.HTMLAttributes<HTMLElement> {
    form: InertiaFormProps<PromoCreateModel>,
    className?: string,
}

export default function Form(props: Props) {

    let form = props.form;
    console.log(form.data);

    return (
        <div className={`flex-col gap-5 ${props.className}`}>
            <div className="form-control w-full mt-4">
                <InputLabel htmlFor="name">Nama Promo</InputLabel>
                <TextInput
                    id="name"
                    type="text"
                    className="mt-1 block w-full"
                    value={form.data.promo_name}
                    onChange={e => form.setData('promo_name', e.currentTarget.value)}
                    required
                    autoFocus
                    autoComplete="name"
                />
                <InputError className="mt-2" message={form.errors.promo_name} />
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
                <InputLabel htmlFor="stocks">Stok</InputLabel>
                <TextInput
                    id="stocks"
                    type="number"
                    className="mt-1 block w-full"
                    value={form.data.stocks}
                    onChange={e => form.setData('stocks', Number(e.currentTarget.value))}
                    required
                    autoFocus
                    autoComplete="stocks"
                />
                <InputError className="mt-2" message={form.errors.stocks} />
            </div>
            <div className="form-control w-full mt-4">
                <InputLabel htmlFor="price">Harga Promo</InputLabel>
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
        </div>
    )
}
