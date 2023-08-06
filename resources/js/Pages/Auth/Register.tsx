import classNames from 'classnames';
import React from 'react';

import AuthenticationCard from '@/Components/Jetstream/AuthenticationCard';
import Checkbox from '@/Components/Jetstream/Checkbox';
import InputError from '@/Components/Jetstream/InputError';
import InputLabel from '@/Components/Jetstream/InputLabel';
import PrimaryButton from '@/Components/Jetstream/PrimaryButton';
import TextInput from '@/Components/Jetstream/TextInput';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import { Head, InertiaLink, useForm } from '@inertiajs/inertia-react';
import { asset } from "@/Models/Helper";
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div className='py-5'>
          <div className="text-lg">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function Register() {
  const page = useTypedPage();
  const route = useRoute();
  const form = useForm({
    name: '',
    email: '',
    phone_number: '',
    password: '',
    password_confirmation: '',
    terms: false,
    role: 'guest',
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post(route('register'), {
      onFinish: () => form.reset('password', 'password_confirmation'),
    });
  }

  const [tabIndex, setTabIndex] = React.useState(0);
  const handleOnTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <AuthenticationCard>
      <Head title="Register" />
      <div className="flex justify-center">
        <div className="flex h-full items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className=" rounded-lg bg-white shadow-lg dark:bg-neutral-800">
            <div className="p-5 md:mx-6 md:p-12">
              <img className="mx-auto w-48"
                src={asset('root', 'assets/images/MBC_HD.jpg')}
                alt="logo" />
              <h4 className="mt-1 mb-12 pb-1 p-4 text-xl text-center font-semibold">

              </h4>
              <form
                onSubmit={onSubmit}
                className=''
              >
                <div>
                  <InputLabel htmlFor="name"><p className="text-[#FFFFFF]">Name</p></InputLabel>
                  <TextInput
                    id="name"
                    type="text"
                    className="mt-1 block w-full text-[#000000]"
                    value={form.data.name}
                    onChange={e => form.setData('name', e.currentTarget.value)}
                    required
                    autoFocus
                    autoComplete="name"
                  />
                  <InputError className="mt-2" message={form.errors.name} />
                </div>
                <div className="mt-4">
                  <InputLabel htmlFor="email"><p className="text-[#FFFFFF]">Phone Number</p></InputLabel>
                  <TextInput
                    id="phone_number"
                    type="text"
                    className="mt-1 block w-full text-[#000000]"
                    value={form.data.phone_number}
                    onChange={e => form.setData('phone_number', e.currentTarget.value)}
                    required
                  />
                  <InputError className="mt-2" message={form.errors.phone_number} />
                </div>

                <div className="mt-4">
                  <InputLabel htmlFor="email"><p className="text-[#FFFFFF]">Email</p></InputLabel>
                  <TextInput
                    id="email"
                    type="email"
                    className="mt-1 block w-full text-[#000000]"
                    value={form.data.email}
                    onChange={e => form.setData('email', e.currentTarget.value)}
                    required
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
                    autoComplete="new-password"
                  />
                  <InputError className="mt-2" message={form.errors.password} />
                </div>

                <div className="mt-4">
                  <InputLabel htmlFor="password_confirmation"><p className="text-[#FFFFFF]">Confirm Password</p></InputLabel>
                  <TextInput
                    id="password_confirmation"
                    type="password"
                    className="mt-1 block w-full text-[#000000]"
                    value={form.data.password_confirmation}
                    onChange={e =>
                      form.setData('password_confirmation', e.currentTarget.value)
                    }
                    required
                    autoComplete="new-password"
                  />
                  <InputError className="mt-2" message={form.errors.password_confirmation} />
                </div>
                <div className='flex justify-between mt-4 gap-5'>
                  <InertiaLink
                    href={route('login')}
                    className="underline text-sm text-[#FFFFFF] hover:text-[#2EA1DA]"
                  >
                    Already registered?
                  </InertiaLink>
                  <button
                    className='inline-flex items-center px-4 py-2 bg-[#2EA1DA] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring focus:ring-gray-300 disabled:opacity-25 transition'
                    onClick={() => setTabIndex(1)}
                  >
                    Selanjutnya
                  </button>
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
