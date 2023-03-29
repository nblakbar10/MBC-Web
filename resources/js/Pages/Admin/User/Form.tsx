import React from 'react';
import Select from 'react-select';

import InputError from '@/Components/Jetstream/InputError';
import TextInput from '@/Components/Jetstream/TextInput';
import { ErrorHelper } from '@/Models/ErrorHelper';
import { NewUser, Role } from '@/types';
import { InertiaFormProps } from '@inertiajs/inertia-react';
import { InputLabel } from '@mui/material';

interface Props extends React.HTMLAttributes<HTMLElement> {
    form: InertiaFormProps<NewUser>,
    className?: string,
    roles: Array<Role>
}

export default function Form(props: Props) {

    let form = props.form;
    let errors = new ErrorHelper(form.errors);
    let roles = props.roles;

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
            <div className="form-control w-full mt-4">
                <InputLabel htmlFor="email">Email</InputLabel>
                <TextInput
                    id="email"
                    type="email"
                    className="mt-1 block w-full"
                    value={form.data.email}
                    onChange={e => form.setData('email', e.currentTarget.value)}
                    required
                />
                <InputError className="mt-2" message={form.errors.email} />
            </div>
            <div className="form-control w-full mt-4">
                <InputLabel htmlFor="password">Password</InputLabel>
                <TextInput
                    id="password"
                    type="password"
                    className="mt-1 block w-full"
                    value={form.data.password}
                    onChange={e => form.setData('password', e.currentTarget.value)}
                    autoComplete="new-password"
                />
                <InputError className="mt-2" message={form.errors.password} />
            </div>
            <div className="form-control w-full mt-4">
                <InputLabel htmlFor="roles">Role</InputLabel>
                <Select
                    isMulti
                    options={roles}
                    getOptionValue={it => it.id!.toString()}
                    getOptionLabel={it => it.name}
                    value={form.data.roles}
                    onChange={value => {
                        form.setData('roles', value.concat());
                    }}
                />
                <InputError message={errors.get('roles')} className="mt-2" />
            </div>
            <div className="form-control w-full mt-4">
                <InputLabel htmlFor="email">Phone Number</InputLabel>
                <TextInput
                    id="phone_number"
                    type="text"
                    className="mt-1 block w-full"
                    value={form.data.phone_number}
                    onChange={e => form.setData('phone_number', e.currentTarget.value)}
                    required
                />
                <InputError className="mt-2" message={form.errors.phone_number} />
            </div>
            {form.data.roles?.some(role => role.name === 'mahasiswa')  && (
                <div className="mt-4">
                    <InputLabel htmlFor="NIM">NIM</InputLabel>
                    <TextInput
                        id="NIM"
                        type="text"
                        className="mt-1 block w-full"
                        value={form.data.NIM}
                        onChange={e => form.setData('NIM', e.currentTarget.value)}
                        required
                    />
                    <InputError className="mt-2" message={form.errors.NIM} />
                </div>
            )}

            {form.data.roles?.some(role => role.name === 'dosen') && (
                <>
                    <div className="mt-4">
                        <InputLabel htmlFor="NIDN">NIDN</InputLabel>
                        <TextInput
                            id='NIDN'
                            type="text"
                            className="mt-1 block w-full"
                            value={form.data.NIDN}
                            onChange={e => form.setData('NIDN', e.currentTarget.value)}
                            required
                        />
                        <InputError className="mt-2" message={form.errors.NIDN} />
                    </div>
                    <div className="mt-4">
                        <InputLabel htmlFor="NIP_NIPH">NIP/NIPH</InputLabel>
                        <TextInput
                            id='NIP_NIPH'
                            type="text"
                            className="mt-1 block w-full"
                            value={form.data.NIP_NIPH}
                            onChange={e => form.setData('NIP_NIPH', e.currentTarget.value)}
                            required
                        />
                        <InputError className="mt-2" message={form.errors.NIP_NIPH} />
                    </div>
                </>
            )}
        </div>
    )
}
