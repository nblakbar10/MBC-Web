import React, { useEffect } from 'react';
import route from 'ziggy-js';

import DashboardAdminLayout from '@/Layouts/DashboardAdminLayout';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';
import { Dialog, DialogContent, Tab, Tabs } from '@mui/material';
import { EventModel } from '@/Models/Event';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { TicketTypeModel } from '@/Models/TicketType';
import ZoomableImage from '@/Components/ZoomableImage';
import parse from 'html-react-parser';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface EventShowProps extends EventModel{
    transaction_count: [
        string : number,
    ],
    transaction_total: [
        string : number,
    ],
    ticket_total: [
        string : number,
    ],
}

interface Props {
    event: EventShowProps;
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
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
                <div className='px-5'>
                    {children}
                </div>

            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Show({ event }: Props) {

    const ticketTypeColumns = React.useMemo<MRT_ColumnDef<TicketTypeModel>[]>(() => [
        {
            accessorKey: 'name',
            header: 'Jenis Tiket',
        }, {
            accessorKey: 'stock',
            header: 'Stok',
        }, {
            accessorKey: 'maximum_buy',
            header: 'Maksimal Pembelian',
        }, {
            accessorFn: (originalRow) => {
                return `Rp. ${originalRow.price.toLocaleString('id-ID')}`
            },
            header: 'Harga',
        }
    ], []);

    const [tabValue, setTabValue] = React.useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [deleteId, setDeleteId] = React.useState<number | null>(null);

    const [openTicketTypeDelete, setOpenTicketTypeDelete] = React.useState(false);

    useEffect(() => {
        if (deleteId !== null) {
            setOpenTicketTypeDelete(true);
        } else {
            setOpenTicketTypeDelete(false);
            setDeleteId(null);
        }
    }, [deleteId]);

    const handleCloseTicketTypeDelete = () => {
        setOpenTicketTypeDelete(false);
        setDeleteId(null);
    };

    const [eventData, setEventData] = React.useState<EventShowProps>(event);

    useEffect(() => {
        const res = fetch(route('api.transactionTicketTypes'), {
            method: 'GET',
        }).then(res => res.json()).then(res => {
            console.log(res);
            // setEventData({
            //     ...eventData,
            //     transaction_count: res.transaction_count,
            //     transaction_total: res.transaction_total,
            //     ticket_total: res.ticket_total,
            // });
        });
    }, []);

    return (
        <DashboardAdminLayout title={`${event.name}`}>
            <div className="py-10 max-w-7xl mx-auto sm:px-6 md:px-6 lg:px-6 xl:px-6">
                <div className="bg-white sm:rounded-lg">
                    <div className="p-6 bg-[#f4f4f4] border-b border-gray-200 flex flex-col gap-3 sm:rounded-lg">
                        <div className='border-b-cyan-200  '>
                            <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
                                <Tab label="Data Event" {...a11yProps(0)} />
                                <Tab label="Statistik" {...a11yProps(1)} />
                                <Tab label="Jenis Tiket Event" {...a11yProps(2)} />
                            </Tabs>
                        </div>
                        <div className='flex justify-between '>
                            <div className="text-lg md:text-3xl mt-2 font-mono ">
                                Detail Event
                            </div>
                            <div className="flex flex-col md:flex-row gap-3">
                                <button
                                    className="bg-blue-500 w-full text-white hover:bg-blue-600 py-3 px-5 rounded-lg text-md font-semibold focus:outline-none border-2"
                                >
                                    <InertiaLink
                                        href={route('event.index')}
                                    >
                                        Kembali
                                    </InertiaLink>
                                </button>
                                <button
                                    className="bg-yellow-500 w-full text-white hover:bg-yellow-600 py-3 px-5 rounded-lg text-md font-semibold focus:outline-none border-2"
                                >
                                    <InertiaLink
                                        href={route('event.edit', eventData.id)}
                                    >
                                        Edit
                                    </InertiaLink>
                                </button>
                                <div className="flex flex-col justify-center" >
                                    <button
                                        className="bg-red-500 w-full text-white hover:bg-red-600 py-3 px-5 rounded-lg text-md font-semibold focus:outline-none border-2"
                                        onClick={handleClickOpen}
                                    >
                                        <label htmlFor="my-modal">Delete</label>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <CustomTabPanel value={tabValue} index={0}>
                            <div className="flex flex-col gap-3">
                            <div className="bg-[#ffffff] shadow-neutral-700 shadow-sm sm:rounded-lg p-4">
                                <div className="text-lg md:text-2xl  font-bold text-center">
                                    Data Event
                                </div>
                                <div className="bg-white shadow-sm shadow-neutral-700 sm:rounded-lg mt-4">
                                    <div className='overflow-x-auto'>
                                    <table className="min-w-full text-left text-sm font-light">
                                    <thead className="border-b font-medium dark:border-neutral-500">
                                        <tr>
                                        <th scope="col" className="px-6 py-4">No</th>
                                        <th scope="col" className="px-6 py-4">Properti</th>
                                        <th scope="col" className="px-6 py-4">Keterangan</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b dark:border-neutral-500">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">1</td>
                                        <td className="whitespace-nowrap px-6 py-4">Nama</td>
                                        <td className="whitespace-nowrap px-6 py-4">{event.name}</td>

                                        </tr>
                                        <tr className="border-b dark:border-neutral-500">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">2</td>
                                        <td className="whitespace-nowrap px-6 py-4">Lokasi</td>
                                        <td className="whitespace-nowrap px-6 py-4">{event.location}</td>

                                        </tr>
                                        <tr className="border-b dark:border-neutral-500">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">3</td>
                                        <td className="whitespace-nowrap px-6 py-4">Tanggal Dimulai</td>
                                        <td className="whitespace-nowrap px-6 py-4">{event.start_date}</td>

                                        </tr>
                                        <tr className="border-b dark:border-neutral-500">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">4</td>
                                        <td className="whitespace-nowrap px-6 py-4">Tanggal Berakhir</td>
                                        <td className="whitespace-nowrap px-6 py-4">{event.end_date}</td>

                                        </tr>
                                        <tr className=" dark:border-neutral-500">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">5</td>
                                        <td className="whitespace-nowrap px-6 py-4">Maksimum Pembelian</td>
                                        <td className="whitespace-nowrap px-6 py-4">{event.maximum_buy}</td>

                                        </tr>
                                    </tbody>
                                    </table>
                                    </div>
                                </div>
                                <div className="bg-white shadow-sm shadow-neutral-700 sm:rounded-lg p-2 mt-4">
                                <div className='grid grid-cols-1 lg:grid-cols-3 mt-3 gap-3'>
                                    <div>
                                        <label className='flex justify-center font-bold '>Poster</label>
                                        <ZoomableImage
                                            img={eventData.poster_url}
                                            title={"Peta"}
                                            onChange={_ => { }}
                                        />
                                    </div>
                                    <div>
                                        <label className='flex justify-center font-bold '>Peta</label>
                                        <ZoomableImage
                                            img={eventData.event_map_url}
                                            title={"Peta"}
                                            onChange={_ => { }}
                                        />
                                    </div>
                                    <div>
                                        <label className='flex justify-center font-bold '>Preview</label>
                                        <ZoomableImage
                                            img={eventData.preview_url}
                                            title={"Preview"}
                                            onChange={_ => { }}
                                        />
                                    </div>
                                </div>
                                </div>
                                <div className='flex flex-col'>
                                <div className="bg-white shadow-sm shadow-neutral-700 sm:rounded-lg p-2 mt-4">
                                    <div className='text-1xl font-bold my-4  text-center'>
                                        Deskripsi Event
                                    </div>
                                    <div
                                        className='w-full border-2 border-gray-200 p-3 rounded-lg '
                                    >
                                        {parse(eventData.description)}
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        </CustomTabPanel>

                        <CustomTabPanel value={tabValue} index={1}>
                            <div className='flex flex-col gap-3'>
                            <div className="bg-[#ffffff] shadow-neutral-700 shadow-sm sm:rounded-lg p-4">
                                <div className='flex justify-between mt-2 mb-3'>
                                    <div className="text-lg md:text-2xl">
                                        Jenis Tiket Event
                                    </div>
                                    <div className="">
                                        <InertiaLink
                                            href={route('ticket-type.create', {
                                                event_id: event.id.toString()
                                            })}
                                            className="bg-blue-500 text-white hover:bg-blue-600 py-3 px-5 rounded-lg text-md font-semibold">
                                            Tambah Jenis Tiket
                                        </InertiaLink>
                                    </div>
                                </div>
                                <MaterialReactTable
                                    columns={ticketTypeColumns}
                                    data={event.ticket_types!}
                                    enableColumnActions
                                    enableColumnFilters
                                    enablePagination
                                    enableSorting
                                    enableBottomToolbar
                                    enableTopToolbar
                                    enableRowActions
                                    enableRowNumbers
                                    muiTableBodyRowProps={{ hover: false }}
                                    renderRowActions={({ row }) => (
                                        <div className='flex gap-2'>
                                            <div className="flex items-center justify-center gap-2">
                                                <InertiaLink href={route('ticket-type.edit', row.original.id)}
                                                    className="bg-yellow-500 text-white hover:bg-yellow-600 py-3 px-5 rounded-lg text-md font-semibold">
                                                    Edit
                                                </InertiaLink>
                                            </div>
                                            <div
                                                className="bg-red-500 text-white hover:bg-red-600 py-3 px-5 rounded-lg text-md font-semibold focus:outline-none border-2"
                                                onClick={() => {
                                                    setDeleteId(row.original.id);
                                                }}
                                            >
                                                Delete
                                            </div>
                                        </div>
                                    )}
                                />
                            </div>
                        </div>
                        </CustomTabPanel>
                        {/* TODO : Make Graph */}
                        <CustomTabPanel value={tabValue} index={2}>
                            <div className='flex flex-col gap-3'>
                            <div className="bg-white shadow-sm shadow-neutral-700 overflow-hidden sm:rounded-lg p-4">
                                <div className="text-lg md:text-2xl text-center">
                                    Statistik Penjualan Tiket
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 p-3 gap-10 justify-around">

                                    <div className="rounded-lg flex-col shadow-sm shadow-neutral-700 flex-1 border-neutral-400 text-white">
                                        <div className='basis-  4/5 bg-[#E05E36] px-10 py-5 rounded-t-lg text-center'>
                                            <div className="text-lg font-semibold mb-2">Total Terbayar</div>
                                            <div className="text-2xl font-extrabold">
                                                <div className="stat-value">0 Pembelian</div>
                                                <div className="stat-value">0</div>
                                                <div className="stat-value">0 Tiket</div>
                                            </div>
                                        </div>
                                        <div className='h-8'>
                                            {/* <InertiaLink href={route("transaction.index")}> */}
                                            <p className="text-lg font-semibold text-dark-100 text-center text-[#000000]">
                                                More Info
                                                <span className="text-black border-black ">
                                                    <ArrowForwardIcon />
                                                </span>
                                            </p>
                                            {/* </InertiaLink > */}
                                        </div>
                                    </div>
                                    <div className="rounded-lg flex-col shadow-sm shadow-neutral-700 flex-1 border-neutral-400 text-white">
                                        <div className='basis-  4/5 bg-[#E05E36] px-10 py-5 rounded-t-lg text-center'>
                                            <div className="text-lg font-semibold mb-2">Dana</div>
                                            <div className="text-2xl font-extrabold">
                                                <div className="stat-value">0 Pembelian</div>
                                                <div className="stat-value">0</div>
                                                <div className="stat-value">0 Tiket</div>
                                            </div>
                                        </div>
                                        <div className='h-8'>
                                            {/* <InertiaLink href={route("transaction.index")}> */}
                                            <p className="text-lg font-semibold text-dark-100 text-center text-[#000000]">
                                                More Info
                                                <span className="text-black border-black">
                                                    <ArrowForwardIcon />
                                                </span>
                                            </p>
                                            {/* </InertiaLink > */}
                                        </div>
                                    </div>
                                    <div className="rounded-lg flex-col shadow-sm shadow-neutral-700 flex-1 border-neutral-400 text-white">
                                        <div className='basis-  4/5 bg-[#E05E36] px-10 py-5 rounded-t-lg text-center'>
                                            <div className="text-lg font-semibold mb-2">Transfer VA Bank</div>
                                            <div className="text-2xl font-extrabold">
                                                <div className="stat-value">0 Pembelian</div>
                                                <div className="stat-value">0</div>
                                                <div className="stat-value">0 Tiket</div>
                                            </div>
                                        </div>
                                        <div className='h-8'>
                                            {/* <InertiaLink href={route("transaction.index")}> */}
                                            <p className="text-lg font-semibold text-dark-100 text-center text-[#000000]">
                                                More Info
                                                <span className="text-black border-black">
                                                    <ArrowForwardIcon />
                                                </span>
                                            </p>
                                            {/* </InertiaLink > */}
                                        </div>
                                    </div>
                                    <div className="rounded-lg flex-col shadow-sm shadow-neutral-700 flex-1 border-neutral-400 text-white">
                                        <div className='basis-  4/5 bg-[#E05E36] px-10 py-5 rounded-t-lg text-center'>
                                            <div className="text-lg font-semibold mb-2">Terbayar dan Tidak Terbayar</div>
                                            <div className="text-2xl font-extrabold">
                                                <div className="stat-value">0 Pembelian</div>
                                                <div className="stat-value">0 Tiket</div>
                                            </div>
                                        </div>
                                        <div className='h-8'>
                                            {/* <InertiaLink href={route("transaction.index")}> */}
                                            <p className="text-lg font-semibold text-dark-100 text-center text-[#000000]">
                                                More Info
                                                <span className="text-black border-black">
                                                    <ArrowForwardIcon />
                                                </span>
                                            </p>
                                            {/* </InertiaLink > */}
                                        </div>
                                    </div>
                                    <div className="rounded-lg flex-col shadow-sm shadow-neutral-700 flex-1 border-neutral-400 text-white">
                                        <div className='basis-4/5 bg-[#E05E36] px-10 py-5 rounded-t-lg text-center'>
                                            <div className="text-lg font-semibold mb-2">PENDING</div>
                                            <div className="text-2xl font-extrabold">
                                                <div className="stat-value">0 Pembelian</div>
                                                <div className="stat-value">0 Tiket</div>
                                            </div>
                                        </div>
                                        <div className='h-8'>
                                            {/* <InertiaLink href={route("transaction.index")}> */}
                                            <p className="text-lg font-semibold text-dark-100 text-center text-[#000000]">
                                                More Info
                                                <span className="text-black border-black">
                                                    <ArrowForwardIcon />
                                                </span>
                                            </p>
                                            {/* </InertiaLink > */}
                                        </div>
                                    </div>
                                    <div className="rounded-lg flex-col shadow-sm shadow-neutral-700 flex-1 border-neutral-400 text-white">
                                        <div className='basis-4/5 bg-[#E05E36] px-10 py-5 rounded-t-lg text-center'>
                                            <div className="text-lg font-semibold mb-2">Expired</div>
                                            <div className="text-2xl font-extrabold">
                                                <div className="stat-value">0 Pembelian</div>
                                                <div className="stat-value">0 Tiket</div>
                                            </div>
                                        </div>
                                        <div className='h-8'>
                                            {/* <InertiaLink href={route("transaction.index")}> */}
                                            <p className="text-lg font-semibold text-dark-100 text-center text-[#000000]">
                                                More Info
                                                <span className="text-black border-black">
                                                    <ArrowForwardIcon />
                                                </span>
                                            </p>
                                            {/* </InertiaLink > */}
                                        </div>
                                        {/* <= graph area => */}
                                        {/* <div className="max-w-7xl mx-auto sm:px-6 md:px-6 lg:px-6 py-12">
                                            <div className="bg-white shadow-sm shadow-neutral-700 overflow-hidden sm:rounded-lg p-4">
                                            </div>
                                        </div> */}

                                    </div>
                                </div>
                            </div>
                        </div>
                        </CustomTabPanel>
                        {/* TODO : Make Graph */}
                        <CustomTabPanel value={tabValue} index={2}>
                            <div className='flex flex-col gap-3'>
                                <div className='flex justify-between pb-2'>
                                    <div className="text-lg md:text-2xl">
                                        Jenis Tiket Event
                                    </div>
                                    <div className="">
                                        <InertiaLink
                                            href={route('ticket-type.create', {
                                                event_id: eventData.id.toString()
                                            })}
                                            className="bg-blue-500 text-white hover:bg-blue-600 py-3 px-5 rounded-lg text-md font-semibold">
                                            Tambah Jenis Tiket
                                        </InertiaLink>
                                    </div>
                                </div>
                                <MaterialReactTable
                                    columns={ticketTypeColumns}
                                    data={eventData.ticket_types!}
                                    enableColumnActions
                                    enableColumnFilters
                                    enablePagination
                                    enableSorting
                                    enableBottomToolbar
                                    enableTopToolbar
                                    enableRowActions
                                    enableRowNumbers
                                    muiTableBodyRowProps={{ hover: false }}
                                    enableExpanding
                                    enableExpandAll 
                                    initialState={{
                                        expanded: true,
                                    }}
                                    renderDetailPanel={({ row }) => {
                                        return (
                                            <div className='flex flex-col gap-3'>
                                                {row.original.name}
                                            </div>
                                        )
                                    }}
                                    renderRowActions={({ row }) => (
                                        <div className='flex gap-2'>
                                            <div className="flex items-center justify-center gap-2">
                                                <InertiaLink href={route('ticket-type.edit', row.original.id)}
                                                    className="bg-yellow-500 text-white hover:bg-yellow-600 py-3 px-5 rounded-lg text-md font-semibold">
                                                    Edit
                                                </InertiaLink>
                                            </div>
                                            <div
                                                className="bg-red-500 text-white hover:bg-red-600 py-3 px-5 rounded-lg text-md font-semibold focus:outline-none border-2"
                                                onClick={() => {
                                                    setDeleteId(row.original.id);
                                                }}
                                            >
                                                Delete
                                            </div>
                                        </div>
                                    )}
                                />
                            </div>
                        </CustomTabPanel>
                    </div>
                </div>
            </div >
            <Dialog open={open} onClose={handleClose}
            >
                <DialogContent className="w-full">
                    <div>
                        <h3 className="font-bold text-lg">Konfirmasi Aksi</h3>
                        <p className="py-4">Anda Yakin Menghapus Event?</p>
                        <div className="flex justify-between gap-3">
                            <button
                                className="bg-green-500 text-white hover:bg-green-600 py-3 w-1/3 rounded-lg text-md font-semibold focus:outline-none border-2"
                                onClick={
                                    handleClose
                                }
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-500 text-white hover:bg-red-600 py-3 w-1/3 rounded-lg text-md font-semibold focus:outline-none border-2"
                                onClick={
                                    () => {
                                        Inertia.post(route('event.destroy', eventData.id), {
                                            _method: 'DELETE',
                                        });
                                    }
                                }
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            <Dialog open={openTicketTypeDelete} onClose={handleCloseTicketTypeDelete}
            >
                <DialogContent className="w-full">
                    <div>
                        <h3 className="font-bold text-lg">Konfirmasi Aksi</h3>
                        <p className="py-4">Anda Yakin Menghapus Jenis Tiket?</p>
                        <div className="flex justify-between gap-3">
                            <button
                                className="bg-green-500 text-white hover:bg-green-600 py-3 w-1/3 rounded-lg text-md font-semibold focus:outline-none border-2"
                                onClick={
                                    handleCloseTicketTypeDelete
                                }
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-500 text-white hover:bg-red-600 py-3 w-1/3 rounded-lg text-md font-semibold focus:outline-none border-2"
                                onClick={
                                    () => {
                                        Inertia.post(route('ticket-type.destroy', deleteId!), {
                                            _method: 'DELETE',
                                        });
                                    }
                                }
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </DashboardAdminLayout >
    )
}
