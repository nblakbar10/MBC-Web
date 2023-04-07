import InputError from "@/Components/Jetstream/InputError";
import InputLabel from "@/Components/Jetstream/InputLabel";
import TextInput from "@/Components/Jetstream/TextInput";
import DashboardAdminLayout from "@/Layouts/DashboardAdminLayout";
import { InertiaLink } from "@inertiajs/inertia-react";
import { useForm } from "@inertiajs/react";
import React from "react";
import route from "ziggy-js";

export default function RedeemForm() {
    const form = useForm({
        token: '',
    });

    const onSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(form.data);
        form.clearErrors();
        // form.post(route('transaction.redeem'), {
        //     onError: (errors) => {
        //         console.log(errors);
        //     },
        //     onSuccess: () => {
        //         console.log('success');
        //     }
        // });
    }

    return (
        <DashboardAdminLayout
            title="Redeem Tiket"
        >
            <div className="my-10  max-w-7xl mx-auto">
                <div className="bg-white overflow-hidden shadow-xl sm:rounded-lg py-12 sm:px-6 lg:px-8">
                    <div className="flex justify-between">
                        <div className="text-3xl">
                            Redeem Tiket
                        </div>
                        <button className="bg-blue-500 text-white hover:bg-blue-600 py-3 px-5 rounded-lg text-md font-semibold">
                            <InertiaLink href={route('transaction.index')}>
                                Kembali
                            </InertiaLink>
                        </button>
                    </div>
                    <form className={`flex-col gap-5`}>
                        <div className="form-control w-full mt-4">
                            <InputLabel htmlFor="token">Redeem Token Pembayaran</InputLabel>
                            <TextInput
                                id="token"
                                type="text"
                                className="mt-1 block w-full"
                                value={form.data.token}
                                onChange={e => form.setData('token', e.currentTarget.value)}
                                required
                                autoFocus
                                autoComplete="token"
                            />
                            <InputError className="mt-2" message={form.errors.token} />
                        </div>
                        <div className="flex justify-end">
                            <button
                                className="bg-blue-500 text-white hover:bg-blue-600 py-3 px-5 rounded-lg text-md font-semibold m-5 mt-10 w-1/2"
                                disabled={form.processing}
                                onClick={onSubmitHandler}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardAdminLayout>
    )
}
