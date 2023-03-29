import classNames from 'classnames';
import React, { useRef, useState } from 'react';

import ActionMessage from '@/Components/Jetstream/ActionMessage';
import FormSection from '@/Components/Jetstream/FormSection';
import InputError from '@/Components/Jetstream/InputError';
import InputLabel from '@/Components/Jetstream/InputLabel';
import PrimaryButton from '@/Components/Jetstream/PrimaryButton';
import SecondaryButton from '@/Components/Jetstream/SecondaryButton';
import TextInput from '@/Components/Jetstream/TextInput';
import useRoute from '@/Hooks/useRoute';
import { User, UserProfile } from '@/types';
import { Inertia } from '@inertiajs/inertia';
import { useForm, usePage } from '@inertiajs/inertia-react';

interface Props {
  user: User;
}

export default function UpdateProfileInformationForm({ user }: Props) {


  const form = useForm({
    _method: 'PUT',
    name: user.name,
    email: user.email,
    phone_number: user.phone_number,
    photo: null as File | null,
    NIM: user.user_profile ? user.user_profile.NIM : '',
    NIDN: user.user_profile ? user.user_profile.NIDN : '',
    NIP_NIPH: user.user_profile ? user.user_profile.NIP_NIPH : '',
  });
  const route = useRoute();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const photoRef = useRef<HTMLInputElement>(null);
  const page = usePage<any>();

  function updateProfileInformation() {
    form.post(route('user-profile-information.update'), {
      errorBag: 'updateProfileInformation',
      preserveScroll: true,
      onSuccess: () => clearPhotoFileInput(),
    });
  }

  function selectNewPhoto() {
    photoRef.current?.click();
  }

  function updatePhotoPreview() {
    const photo = photoRef.current?.files?.[0];

    if (!photo) {
      return;
    }

    form.setData('photo', photo);

    const reader = new FileReader();

    reader.onload = e => {
      setPhotoPreview(e.target?.result as string);
    };

    reader.readAsDataURL(photo);
  }

  function deletePhoto() {
    Inertia.delete(route('current-user-photo.destroy'), {
      preserveScroll: true,
      onSuccess: () => {
        setPhotoPreview(null);
        clearPhotoFileInput();
      },
    });
  }

  function clearPhotoFileInput() {
    if (photoRef.current?.value) {
      photoRef.current.value = '';
      form.setData('photo', null);
    }
  }

  return (
    <FormSection
      onSubmit={updateProfileInformation}
      title={'Profile Information'}
      description={`Update your account's profile information and email address.`}
      renderActions={() => (
        <>
          <ActionMessage on={form.recentlySuccessful} className="mr-3">
            Saved.
          </ActionMessage>

          <PrimaryButton
            className={classNames({ 'opacity-25': form.processing })}
            disabled={form.processing}
          >
            Save
          </PrimaryButton>
        </>
      )}
    >
      {/* <!-- Profile Photo --> */}
      {page.props.jetstream.managesProfilePhotos ? (
        <div className="col-span-6 sm:col-span-4">
          {/* <!-- Profile Photo File Input --> */}
          <input
            type="file"
            className="hidden"
            ref={photoRef}
            onChange={updatePhotoPreview}
          />

          <InputLabel htmlFor="photo" value="Photo" />

          {photoPreview ? (
            // <!-- New Profile Photo Preview -->
            <div className="mt-2">
              <span
                className="block rounded-full w-20 h-20"
                style={{
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center center',
                  backgroundImage: `url('${photoPreview}')`,
                }}
              ></span>
            </div>
          ) : (
            // <!-- Current Profile Photo -->
            <div className="mt-2">
              <img
                src={user.profile_photo_url}
                alt={user.name}
                className="rounded-full h-20 w-20 object-cover"
              />
            </div>
          )}

          <SecondaryButton
            className="mt-2 mr-2"
            type="button"
            onClick={selectNewPhoto}
          >
            Select A New Photo
          </SecondaryButton>

          {user.profile_photo_path ? (
            <SecondaryButton
              type="button"
              className="mt-2"
              onClick={deletePhoto}
            >
              Remove Photo
            </SecondaryButton>
          ) : null}

          <InputError message={form.errors.photo} className="mt-2" />
        </div>
      ) : null}

      {/* <!-- Name --> */}
      <div className="col-span-6 sm:col-span-4">
        <InputLabel htmlFor="name" value="Name" />
        <TextInput
          id="name"
          type="text"
          className="mt-1 block w-full"
          value={form.data.name}
          onChange={e => form.setData('name', e.currentTarget.value)}
          autoComplete="name"
        />
        <InputError message={form.errors.name} className="mt-2" />
      </div>

      {/* <!-- Email --> */}
      <div className="col-span-6 sm:col-span-4">
        <InputLabel htmlFor="email" value="Email" />
        <TextInput
          id="email"
          type="email"
          className="mt-1 block w-full"
          value={form.data.email}
          onChange={e => form.setData('email', e.currentTarget.value)}
        />
        <InputError message={form.errors.email} className="mt-2" />
      </div>

      {/* <!-- Phone Number --> */}
      <div className="col-span-6 sm:col-span-4">
        <InputLabel htmlFor="phone_number" value="phone_number" />
        <TextInput
          id="phone_number"
          type="text"
          className="mt-1 block w-full"
          value={form.data.phone_number}
          onChange={e => form.setData('phone_number', e.currentTarget.value)}
        />
        <InputError message={form.errors.phone_number} className="mt-2" />
      </div>

      {user.roles.find(role => role.name === 'mahasiswa') && (
        <div className="col-span-6 sm:col-span-4">
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

      {user.roles.find(role => role.name === 'dosen') && (
        <>
          <div className="col-span-6 sm:col-span-4">
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
          <div className="col-span-6 sm:col-span-4">
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
    </FormSection>
  );
}
