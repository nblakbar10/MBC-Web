import React, { PropsWithChildren } from 'react';

import AuthenticationCardLogo from '@/Components/Jetstream/AuthenticationCardLogo';
import { useMediaQuery } from '@/Hooks/useMediaQuery';
import { asset } from '@/Models/Helper';

export default function AuthenticationCard({
  children,
}: PropsWithChildren<Record<string, unknown>>) {

  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className="flex bg-sky-50">
      <div
        className="mx-0 lg:mx-auto py-20 lg:mt-20 lg:my-4 w-screen lg:w-1/2 h-full lg:h-screen  px-10 flex flex-col gap-2 sm:justify-center items-center p-6 sm:pt-0 "
      >
        <div className="card glass py-5 w-full md:w-3/4 mt-10 lg:mt-0">
          <div className="card-body ">
            <div className='flex flex-col text-black'>
              <div className='text-2xl m-auto font-semibold'>
                Digital Reconnect Ticketing
              </div>
            </div>
            <div className="mt-6 py-4 sm:rounded-lg ">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
