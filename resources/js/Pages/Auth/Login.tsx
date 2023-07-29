import classNames from 'classnames';
import React from 'react';

import AuthenticationCard from '@/Components/Jetstream/AuthenticationCard';
import Checkbox from '@/Components/Jetstream/Checkbox';
import InputError from '@/Components/Jetstream/InputError';
import InputLabel from '@/Components/Jetstream/InputLabel';
import PrimaryButton from '@/Components/Jetstream/PrimaryButton';
import TextInput from '@/Components/Jetstream/TextInput';
import useRoute from '@/Hooks/useRoute';
import { Head, InertiaLink, useForm } from '@inertiajs/inertia-react';
import { asset } from "@/Models/Helper";


export default function Login() {
  const route = useRoute();
  const form = useForm({
    email: '',
    password: '',
    remember: '',
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post(route('login'), {
      onFinish: () => form.reset('password'),
    });
  }

  return (
    <AuthenticationCard>
      <Head title="login" />
      <div className="flex justify-center">
        <div className="flex h-full items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className=" rounded-lg bg-white shadow-lg dark:bg-neutral-800">
            <div className="p-5 md:mx-6 md:p-12">
              <img className="mx-auto w-48"
                src="https://loketmbc.com/assets/images/MBC_HD.png"
                alt="logo" />
              <h4 className="mt-1 mb-12 pb-1 p-4 text-xl text-center font-semibold">

              </h4>

              <form onSubmit={onSubmit} className=''>
                <div >
                  <InputLabel htmlFor="email"><p className="text-[#FFFFFF]">Email</p></InputLabel>
                  <TextInput
                    id="email"
                    type="email"
                    className="mt-1 block w-full text-[#000000]"
                    value={form.data.email}
                    onChange={e => form.setData('email', e.currentTarget.value)}
                    required
                    autoFocus
                  />
                  <InputError className="mt-2" message={form.errors.email} />
                </div>

                <div className="mt-4">
                  <InputLabel htmlFor="password"><p className="text-[#FFFFFF]">Password</p></InputLabel>
                  <TextInput
                    id="password"
                    type="password"
                    className="mt-1 block w-full text-[#000000]"
                    value={form.data.password}
                    onChange={e => form.setData('password', e.currentTarget.value)}
                    required
                    autoComplete="current-password"
                  />
                  <InputError className="mt-2" message={form.errors.password} />
                </div>

                {/* <div className="mt-4">
                  <label className="flex items-center">
                    <Checkbox
                      name="remember"
                      checked={form.data.remember === 'on'}
                      onChange={e =>
                        form.setData('remember', e.currentTarget.checked ? 'on' : '')
                      }
                    />
                    <span className="ml-2 text-sm text-white">Remember me</span>
                  </label>
                </div> */}

                <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-end md:space-y-0 mt-4">
                  <div className="flex items-center justify-end">
                    <PrimaryButton
                      className={classNames('ml-4', { 'opacity-25': form.processing })}
                      disabled={form.processing}
                    >
                      Log in
                    </PrimaryButton>
                  </div>
                </div>
                <div className='border-white border-t-2 flex justify-center mt-5 p-2'>By : Digital Reconnect</div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthenticationCard>
  );
}
