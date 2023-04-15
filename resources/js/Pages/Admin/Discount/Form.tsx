import React from 'react';

import InputError from '@/Components/Jetstream/InputError';
import TextInput from '@/Components/Jetstream/TextInput';
import { InertiaFormProps } from '@inertiajs/inertia-react';
import { InputLabel } from '@mui/material';
import { DiscountCreateModel } from '@/Models/Discount';
import { PromoModel } from '@/Models/Promo';

interface Props extends React.HTMLAttributes<HTMLElement> {
    form: InertiaFormProps<DiscountCreateModel>,
    className?: string,
    promos : Array<PromoModel>
}

export default function Form({form, className, promos}: Props) {


    const numberInputHandler = (
        val: string,
        form: InertiaFormProps<DiscountCreateModel>,
        column: keyof DiscountCreateModel,
        max : number = 999999999,
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
    console.log(form.data)

    return (
        <div className={`flex-col gap-5 ${className}`}>
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
                    onChange={e => form.setData('type', e.currentTarget.value as "Absolute" | "Percentage")}
                    required
                    autoFocus
                >
                    <option value={"Absolute"}>Absolute</option>
                    <option value={"Percentage"}>Percentage</option>
                </select>
                <InputError className="mt-2" message={form.errors.type} />
            </div>
            <div className="form-control w-full mt-4">
                <InputLabel htmlFor="promo_id">Promo Tiket</InputLabel>
                {/* <select 
                    id="promo_id"
                    className="mt-1 block w-full rounded-sm"
                    value={form.data.promo_id}
                    onChange={e => form.setData('promo_id', Number(e.currentTarget.value))}
                    required
                    autoFocus
                >
                    {promos.map((promo) => (
                        <option value={promo.id}>{promo.name}</option>
                    ))}
                </select> */}
                <TextInput
                    id="promo_id"
                    type="number"
                    className="mt-1 block w-full"
                    value={form.data.promo_id}
                    onChange={e => numberInputHandler(
                        e.target.value,
                        form,
                        'promo_id'
                    )}
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
                    onChange={e => numberInputHandler(
                        e.target.value,
                        form,
                        'quota'
                    )}
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
                    type="number"
                    className="mt-1 block w-full"
                    value={form.data.deduction}
                    onChange={e => numberInputHandler(
                        e.target.value,
                        form,
                        'deduction',
                    )}
                    max={(form.data.type === 'Percentage' ? 100 : undefined)}
                    required
                    autoFocus
                    autoComplete="deduction"
                />
                <InputError className="mt-2" message={form.errors.deduction} />
            </div>
        </div>
    )
}
