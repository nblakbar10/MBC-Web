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

      <form
        onSubmit={onSubmit}
        className=''
      >
        <Tabs
          value={tabIndex}
          onChange={handleOnTabChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
          centered
        >
          <Tab {...a11yProps(0)} label="Data Diri"/>
          <Tab {...a11yProps(1)} label="Data Akun"/>
        </Tabs>
        <TabPanel index={0} value={tabIndex}>
          <div>
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
          <div className="mt-4">
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
          {/* <div className="mt-4">
            <InputLabel htmlFor="role">Status Warga ITK </InputLabel>
            <select
              id="role"
              className="mt-1 block w-full md:w-1/2"
              value={form.data.role}
              onChange={e => form.setData('role', e.currentTarget.value)}
            >
              <option value="guest">Guest</option>
              <option value="mahasiswa">Mahasiswa</option>
              <option value="dosen">Dosen</option>
            </select>
            <InputError className="mt-2" message={form.errors.role} />
          </div> */}
          <div className='flex justify-between mt-4 gap-5'>
            <InertiaLink
              href={route('login')}
              className="underline text-sm text-gray-900 hover:text-gray-900"
            >
              Already registered?
            </InertiaLink>
            <button
              className='inline-flex items-center px-4 py-2 bg-sky-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring focus:ring-gray-300 disabled:opacity-25 transition'
              onClick={() => setTabIndex(1)}
            >
              Selanjutnya
            </button>
          </div>
        </TabPanel>
        <TabPanel index={1} value={tabIndex}>
          <div className="mt-4">
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

          <div className="mt-4">
            <InputLabel htmlFor="password">Password</InputLabel>
            <TextInput
              id="password"
              type="password"
              className="mt-1 block w-full"
              value={form.data.password}
              onChange={e => form.setData('password', e.currentTarget.value)}
              required
              autoComplete="new-password"
            />
            <InputError className="mt-2" message={form.errors.password} />
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="password_confirmation">Confirm Password</InputLabel>
            <TextInput
              id="password_confirmation"
              type="password"
              className="mt-1 block w-full"
              value={form.data.password_confirmation}
              onChange={e =>
                form.setData('password_confirmation', e.currentTarget.value)
              }
              required
              autoComplete="new-password"
            />
            <InputError className="mt-2" message={form.errors.password_confirmation} />
          </div>

          {page.props.jetstream.hasTermsAndPrivacyPolicyFeature && (
            <div className="mt-4">
              <InputLabel htmlFor="terms">
                <div className="flex items-center">
                  <Checkbox
                    name="terms"
                    id="terms"
                    checked={form.data.terms}
                    onChange={e => form.setData('terms', e.currentTarget.checked)}
                    required
                  />

                  <div className="ml-2">
                    I agree to the
                    <a
                      target="_blank"
                      href={route('terms.show')}
                      className="underline text-sm text-gray-600 hover:text-gray-900"
                    >
                      Terms of Service
                    </a>
                    and
                    <a
                      target="_blank"
                      href={route('policy.show')}
                      className="underline text-sm text-gray-600 hover:text-gray-900"
                    >
                      Privacy Policy
                    </a>
                  </div>
                </div>
                <InputError className="mt-2" message={form.errors.terms} />
              </InputLabel>
            </div>
          )}
          <InertiaLink
            href={route('login')}
            className="inline-flex md:hidden mt-4 underline text-sm text-gray-900 hover:text-gray-900"
          >
            Already registered?
          </InertiaLink>
          <div className="flex items-center justify-between mt-4">
            
            <button
              className='inline-flex items-center px-4 py-2 bg-sky-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring focus:ring-gray-300 disabled:opacity-25 transition'
              onClick={() => setTabIndex(0)}
            >
              Kembali
            </button>
            <InertiaLink
              href={route('login')}
              className="hidden md:inline-flex underline text-sm text-gray-900 hover:text-gray-900"
            >
              Already registered?
            </InertiaLink>
            <PrimaryButton
              className={classNames('ml-4', { 'opacity-25': form.processing })}
              disabled={form.processing}
            >
              Register
            </PrimaryButton>
          </div>
        </TabPanel>
      </form>
    </AuthenticationCard>
  );
}
