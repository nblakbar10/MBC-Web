import { asset } from '@/Models/Helper';
import { InertiaLink } from '@inertiajs/inertia-react';
import React from 'react';

export default function AuthenticationCardLogo() {
  return (
    <InertiaLink href="/">
      <img src={asset('root', 'assets/images/Lambang_ITK.png')} alt= "logo itk" className='w-40' />
    </InertiaLink>
  );
}
