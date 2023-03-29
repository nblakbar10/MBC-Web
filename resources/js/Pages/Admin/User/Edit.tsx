import React from 'react';
import route from 'ziggy-js';

import AppLayout from '@/Layouts/AppLayout';
import { NewUser, Role, UserProfile } from '@/types';
import { useForm } from '@inertiajs/inertia-react';

import Form from './Form';

interface UserEdited extends NewUser { 
    user_profile: UserProfile;
}

interface Props {
    user: UserEdited;
    roles: Array<Role>;
}

export default function Edit(props: Props) {
    let user = props.user;
    let form = useForm<NewUser>(
        {
            ...user,
            NIM: user.user_profile ? user.user_profile.NIM : '',
            NIDN: user.user_profile ? user.user_profile.NIDN : '',
            NIP_NIPH: user.user_profile ? user.user_profile.NIP_NIPH : '',
        }
    );

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        form.clearErrors();
        // php does'nt support PUT so...
        // @ts-ignore
        form.data._method = 'PUT';
        form.post(route('user.update', user.id), {
            onError: (errors) => {
                console.log(errors);
            },
            onSuccess: () => {
                console.log('success');
            }
        });
    }

    return (
        <AppLayout title={"Edit User"}>
            <div className='py-12'>
                <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                        <div className="flex justify-between">
                            <div className="text-2xl">
                                Edit User
                            </div>
                            <button className="btn btn-primary">
                                <a href={route('user.index')}>
                                    Kembali
                                </a>
                            </button>
                        </div>
                        <form className="flex-col gap-5" onSubmit={onSubmit}>
                            <Form
                                form={form}
                                roles={props.roles}
                                className="my-5"
                            />
                            <button
                                className="btn btn-warning py-2 px-4 rounded mt-10 w-full"
                                type="submit"
                                disabled={form.processing}
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
