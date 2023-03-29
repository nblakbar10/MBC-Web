import React, { PropsWithChildren } from 'react';

import Banner from '@/Components/Jetstream/Banner';
import ResponsiveNavLink from '@/Components/Jetstream/ResponsiveNavLink';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import { Inertia } from '@inertiajs/inertia';
import { Head, InertiaLink } from '@inertiajs/inertia-react';

interface Props {
    title: string;
    renderHeader?(): JSX.Element;
    isAdministrator?: boolean;
}

export default function AppLayout({
    title,
    renderHeader,
    children,
}: PropsWithChildren<Props>) {
    const page = useTypedPage();
    const route = useRoute();

    function logout(e: React.FormEvent) {
        e.preventDefault();
        Inertia.post(route('logout'));
    }

    return (
        <div>
            <Head title={title} />
            <Banner />
            <div className="drawer">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Navbar */}
                    <div className="navbar bg-primary text-white font-medium">
                        <div className="navbar-start gap-2">
                            <div className="flex-none">
                                <button className="btn btn-square btn-ghost">
                                    <label htmlFor="my-drawer" className=" drawer-button">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                                    </label>
                                </button>
                            </div>
                            <div className='hidden md:flex'>
                                <a className="btn btn-ghost normal-case text-xl" href={route('dashboard')}>Dashboard</a>
                            </div>
                        </div>
                        <div className="navbar-end mr-10">
                            <div className="dropdown dropdown-hover dropdown-end ">
                                <label tabIndex={0} className="btn btn-ghost">
                                    <div className="p-2 rounded-full flex">
                                        Profile
                                    </div>
                                </label>
                                <ul tabIndex={0} className="dropdown-content menu p-2 gap-2 shadow bg-base-100 rounded-box w-40 top-10">
                                    <li className="z-50">
                                        <ResponsiveNavLink
                                            href={route('profile.show')}
                                            active={route().current('profile.show')}
                                        >
                                            Profile
                                        </ResponsiveNavLink>
                                    </li>
                                    <li className="z-50">
                                        <form method="POST" onSubmit={logout}>
                                            <ResponsiveNavLink as="button">
                                                Log Out
                                            </ResponsiveNavLink>
                                        </form>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* End of Navbar */}
                    <div className='mx-7'>
                        <main>{children}</main>
                    </div>
                </div>
                <div className="drawer-side text-white">
                    <label htmlFor="my-drawer" className="drawer-overlay "></label>
                    <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content font-medium ">
                        <div className='md:hidden'>
                            <div className="divider">SIMPEL</div>
                            <li>
                                <div className="dropdown dropdown-hover dropdown-end">
                                    <ul className="flex flex-col gap-5">
                                        <InertiaLink href={route('dashboard')}>
                                            <label>
                                                Dashboard
                                            </label>
                                        </InertiaLink>
                                    </ul>
                                </div>
                            </li>
                        </div>
                        {page.props.isAdministrator ? (
                            <>
                                <div className="divider">Admin Only</div>
                                <li >
                                    <div className="dropdown dropdown-hover dropdown-end">
                                        <label tabIndex={0} className="">
                                            Autentikasi
                                        </label>
                                        <ul tabIndex={0} className="dropdown-content menu p-2 gap-2 shadow bg-base-100 rounded-box w-40 top-5 text-sm">
                                            <li className="z-50">
                                                <InertiaLink
                                                    className=""
                                                    href={route('user.index')}
                                                >
                                                    Users
                                                </InertiaLink>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </>
                        ) : null
                        }
                        <button className="block lg:hidden">
                            <label htmlFor="my-drawer" className="btn btn-ghost drawer-button text-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
                            </label>
                        </button>
                    </ul>
                </div>
            </div >
        </div >
    );
}
