import React from 'react';
import Select from 'react-select';

import InputError from '@/Components/Jetstream/InputError';
import TextInput from '@/Components/Jetstream/TextInput';
import { InertiaFormProps } from '@inertiajs/inertia-react';
import { InputLabel } from '@mui/material';
import { EventPromoCreateModel } from '@/Models/EventPromo';

interface Props extends React.HTMLAttributes<HTMLElement> {
    form: InertiaFormProps<EventPromoCreateModel>,
    className?: string,
}

export default function Form(props: Props) {

    let form = props.form;

    return (
        <div className={`flex-col gap-5 ${props.className}`}>
            <div className="form-control w-full mt-4">
                <InputLabel htmlFor="name">Name</InputLabel>
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
        </div>
    )
}
