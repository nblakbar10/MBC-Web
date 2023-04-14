import React from 'react';

import InputError from '@/Components/Jetstream/InputError';
import TextInput from '@/Components/Jetstream/TextInput';
import { InertiaFormProps } from '@inertiajs/inertia-react';
import { InputLabel } from '@mui/material';
import { DiscountCreateModel } from '@/Models/Discount';

interface Props extends React.HTMLAttributes<HTMLElement> {
    form: InertiaFormProps<DiscountCreateModel>,
    className?: string,
}

export default function Form(props: Props) {

    let form = props.form;

    return (
        <div className={`flex-col gap-5 ${props.className}`}>
            <div className="form-control w-full mt-4">
                <InputLabel htmlFor="name">Nama Promo</InputLabel>
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
                <InputLabel htmlFor="promo_id">Order Minimal</InputLabel>
                <TextInput
                    id="minimum_order"
                    type="number"
                    className="mt-1 block w-full"
                    value={form.data.minimum_order}
                    required
                    autoFocus
                    autoComplete="minimum_order"
                    onChange={e => {
                        e.currentTarget.value = e.currentTarget.value.replace('0', '');
                        const value = parseInt(e.currentTarget.value.length > 1 ? e.currentTarget.value[1] : e.currentTarget.value);
                        if (isNaN(value)) {
                            form.setData('minimum_order', 0);
                        } else if (value > 5) {
                            form.setData('minimum_order', 5);
                        } else if (value < 0) {
                            form.setData('minimum_order', 0);
                        } else {
                            form.setData('minimum_order', value);
                        }
                    }}                />
                <InputError className="mt-2" message={form.errors.minimum_order} />
            </div>
            <div className="form-control w-full mt-4">
                <InputLabel htmlFor="promo_id">Tipe</InputLabel>
                <select
                    id="type"
                    className="mt-1 block w-full rounded-sm"
                    value={form.data.type}
                    onChange={e => form.setData('type', e.currentTarget.value as "Percentage" | "Absolute")}
                    required
                    autoFocus
                >
                    <option value={"Absolute"}>Absolute</option>
                    <option value={"Percentage"}>Percentage</option>
                </select>
                <InputError className="mt-2" message={form.errors.type} />
            </div>
            <div className="form-control w-full mt-4">
                <InputLabel htmlFor="minimum_order">Promo Id</InputLabel>
                <TextInput
                    id="promo_id"
                    type="number"
                    className="mt-1 block w-full"
                    value={form.data.promo_id}
                    onChange={e => form.setData('promo_id', Number(e.currentTarget.value))}
                    required
                    autoFocus
                    autoComplete="promo_id"
                />
                <InputError className="mt-2" message={form.errors.promo_id} />
            </div>
            <div className="form-control w-full mt-4">
                <InputLabel htmlFor="quota">Stok</InputLabel>
                <TextInput
                    id="quota"
                    type="number"
                    className="mt-1 block w-full"
                    value={form.data.quota}
                    onChange={e => form.setData('quota', Number(e.currentTarget.value))}
                    required
                    autoFocus
                    autoComplete="quota"
                />
                <InputError className="mt-2" message={form.errors.quota} />
            </div>
            <div className="form-control w-full mt-4">
                <InputLabel htmlFor="deduction">Deduction</InputLabel>
                <TextInput
                    id="deduction"
                    type="text"
                    className="mt-1 block w-full"
                    value={form.data.deduction}
                    onChange={e => form.setData('deduction', Number(e.currentTarget.value))}
                    required
                    autoFocus
                    autoComplete="deduction"
                />
                <InputError className="mt-2" message={form.errors.deduction} />
            </div>
        </div>
    )
}
