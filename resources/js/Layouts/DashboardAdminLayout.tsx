import React, { PropsWithChildren } from 'react';

import Banner from '@/Components/Jetstream/Banner';
import ResponsiveNavLink from '@/Components/Jetstream/ResponsiveNavLink';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import { Inertia } from '@inertiajs/inertia';
import { Box, Drawer } from '@mui/material';
import { asset } from '@/Models/Helper';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import Dropdown from '@/Components/Jetstream/Dropdown';
import DropdownLink from '@/Components/Jetstream/DropdownLink';
import { Head, InertiaLink } from '@inertiajs/inertia-react';

interface Props {
    title: string;
    renderHeader?(): JSX.Element;
    isAdministrator?: boolean;
}

export default function DashboardAdminLayout({
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

    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    const toggleDrawer =
        (open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }
                setIsSidebarOpen(open)
            };

    const sideBar = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <div className="bg-[#262626] ">
                <InertiaLink href={route('dashboard')}>
                    <img
                        className="h-20 p-4 px-2 ml-10"
                        src={asset('root', 'assets/images/MBC_HD.jpg')}
                        alt="Logo"
                    />
                </InertiaLink>
            </div>
            <ul className="my-10">
                {/* <li>
                    <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                        Dashboard
                    </ResponsiveNavLink>
                </li> */}
                {
                    page.props.user.roles[0].name == 'super-admin' && (
                        <>
                            <li className='border-t-2'>
                                <div className="flex justify-between items-center text-md text-gray-400 px-4 py-2">
                                    <span>Autorisasi</span>
                                </div>
                            </li>
                            <li>
                                <ResponsiveNavLink href={route('user.index')} active={route().current('user.index')}>
                                    Pengguna
                                </ResponsiveNavLink>
                            </li>
                            <li>
                                <ResponsiveNavLink href={route('user-activity.index')} active={route().current('user-activity.index')}>
                                    Aktivitas Pengguna
                                </ResponsiveNavLink>
                            </li>
                        </>
                    )
                }
                {
                    (page.props.user.roles[0].name == 'super-admin' || page.props.user.roles[0].name == 'admin') && (
                        <>
                            <li className='border-t-2'>
                                <div className="flex justify-between items-center text-md text-gray-400 px-4 py-2">
                                    <span>Fitur Sistem</span>
                                </div>
                            </li>
                            <li>
                                <ResponsiveNavLink href={route('event.index')} active={route().current('event.index')}>
                                    Event
                                </ResponsiveNavLink>
                            </li>
                            <li>
                                <ResponsiveNavLink href={route('ticket-type.index')} active={route().current('ticket-type.index')}>
                                    Jenis Tiket
                                </ResponsiveNavLink>
                            </li>
                            <li>
                                <ResponsiveNavLink href={route('ticket-discount.index')} active={route().current('ticket-discount.index')}>
                                    Diskon Tiket
                                </ResponsiveNavLink>
                            </li>
                            <li>
                                <ResponsiveNavLink href={route('redeem.create')} active={route().current('redeem.create')}>
                                    Redeem Tiket
                                </ResponsiveNavLink>
                            </li>
                        </>
                    )
                }
                <li className='border-t-2'>
                    <div className="flex justify-between items-center text-md text-gray-400 px-4 py-2">
                        <span>Log Aksi</span>
                    </div>
                </li>
                <li>
                    <ResponsiveNavLink href={route('redeem.index')} active={route().current('redeem.index')}>
                        Riwayat Redeem
                    </ResponsiveNavLink>
                </li>
                <li>
                    <ResponsiveNavLink href={route('transaction.index')} active={route().current('transaction.index')}>
                        History Transaksi
                    </ResponsiveNavLink>
                </li>
                <li>
                    <ResponsiveNavLink href={route('transaction.export-view')} active={route().current('transaction.export-view')}>
                        Export Transaksi
                    </ResponsiveNavLink>
                </li>
            </ul>
        </Box>
    );

    return (
        <div>
            <Head>
                <title>{title || "MBC Entertainment"}</title>
                <link rel="icon" type="image/svg+xml" href={asset('root', 'assets/images/Icon-MBC.JPG')} />
            </Head>
            <Banner />
            <nav className="flex justify-between w-full sticky bg-[#262626] py-3 px-5">
                <div className="flex gap-3 max-w-6xl">
                    <button className="text-3xl bg-[#262626] text-white hover:bg-[#404040] px-3 py-2"
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon fontSize="large" />
                    </button>
                    {/* <InertiaLink
                        className='inline text-3xl bg-[#2EA1DA] text-white p-2 hover:bg-blue-500 rounded-lg'
                        href={route('transaction.redeemForm')}
                    >
                        Reedeem Tiket
                    </InertiaLink> */}
                </div>
                <div className="">
                    <Dropdown
                        align="right"
                        width="48"
                        renderTrigger={() => (
                            <button className="flex text-sm text-white border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
                                <SettingsIcon fontSize="large" />
                            </button>
                        )
                        }
                    >
                        {/* <!-- Account Management --> */}
                        <div className="block px-4 py-2 text-xs text-gray-400">
                            Manage Account
                        </div>
                        <DropdownLink href={route('profile.show')}>
                            Profile
                        </DropdownLink>
                        <div className="border-t border-gray-100"></div>
                        {/* <!-- Authentication --> */}
                        <form onSubmit={logout}>
                            <DropdownLink as="button">Log Out</DropdownLink>
                        </form>
                    </Dropdown>
                </div>
            </nav>
            <React.Fragment>
                <Drawer
                    anchor={"left"}
                    open={isSidebarOpen}
                    onClose={toggleDrawer(false)}
                >
                    {sideBar()}
                </Drawer>
            </React.Fragment>
            {/* <div className='w-full'> */}
            {/* <div className="bg-gradient-to-r from-[#FFA6A8]"> */}
            {/* </div> */}
            {children}
        </div >
    );
}
