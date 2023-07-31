import React, { useEffect } from 'react';
import route from 'ziggy-js';

import DashboardAdminLayout from '@/Layouts/DashboardAdminLayout';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, useForm } from '@inertiajs/inertia-react';
import { Dialog, DialogContent, Tab, Tabs } from '@mui/material';
import { EventModel } from '@/Models/Event';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { TicketTypeModel } from '@/Models/TicketType';
import ZoomableImage from '@/Components/ZoomableImage';
import parse from 'html-react-parser';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Legend, Tooltip } from 'chart.js';
import mulberry32 from '@/Utils/Mulberry32.';
import moment from 'moment';
import { TransactionModel } from '@/Models/Transaction';

interface ticketTypeShowProps extends TicketTypeModel {
    transaction_count: {
        labels: Array<string>,
        data: Array<number>,
    },
    transaction_total: {
        labels: Array<string>,
        data: Array<number>,
    },
    ticket_total: {
        labels: Array<string>,
        data: Array<number>,
    },
}

interface EventShowProps extends EventModel {
    ticket_types: ticketTypeShowProps[];
}

interface Props {
    event: EventShowProps;
    transactions : TransactionModel[]
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

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Legend,
    Tooltip
);

const totalTicketCount = (transactions: Array<TransactionModel>) => {
    if (transactions.length === 0) return 0;
    return transactions.map(transaction => transaction.ticket_amount).reduce((prev, next) => prev + next);
}

const totalIncome = (transactions: Array<TransactionModel>) => {
    if (transactions.length === 0) return 0;
    return transactions.map(transaction => transaction.total_price).reduce((prev, next) => prev + next);
}

export default function Show({ event, transactions }: Props) {

    const allTransactions = transactions;

    const paidTransaction = transactions.filter(transaction => transaction.payment_status.toUpperCase() === 'PAID');

    const pendingTransaction = transactions.filter(transaction => transaction.payment_status === 'PENDING');

    const expiredTransaction = transactions.filter(transaction => transaction.payment_status === 'EXPIRED');

    const [netTransaction, setNetTransaction] = React.useState<Array<TransactionModel>>([]);


    useEffect(() => {
        setNetTransaction(
            paidTransaction.map((transaction) => {
                if (transaction.payment_method === 'Transfer Bank (VA)') {
                    transaction.total_price -= 4500;
                } else if (transaction.payment_method === 'DANA') {
                    transaction.total_price -= Math.round(((transaction.total_price - (transaction.ticket_amount * (transaction.ticket_type?.fee || 1))) * 0.02) / 1000) * 1000;
                } else if (transaction.payment_method === 'QRIS') {
                    transaction.total_price -= Math.round(((transaction.total_price - (transaction.ticket_amount * (transaction.ticket_type?.fee || 1))) * 0.01) / 1000) * 1000;
                }
                return transaction;
            })
        )
    }, [
        transactions
    ]);

    const Dana = netTransaction.filter(
        (transaction) => transaction.payment_method === 'DANA'
    );

    const TransferVABank = netTransaction.filter(
        (transaction) => transaction.payment_method === 'Transfer Bank (VA)'
    );

    const QRIS = netTransaction.filter(
        (transaction) => transaction.payment_method === 'QRIS'
    );

    const ticketTypeColumns = React.useMemo<MRT_ColumnDef<ticketTypeShowProps>[]>(() => [
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

    const [isReadyShowTicketType, setIsReadyShowTicketType] = React.useState(false);

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

    const dateTicketTypeFilterForm = useForm(
        {
            start: moment(new Date()).subtract(7, 'days').format('YYYY-MM-DD'),
            end: moment(new Date()).format('YYYY-MM-DD'),
        }
    );

    useEffect(() => {
        setIsReadyShowTicketType(false);
        eventData.ticket_types.forEach((event) => {
            const res = fetch(route('api.ticketTypeTransaction', {
                ticket_type_id: event.id.toString(),
                start_date: dateTicketTypeFilterForm.data.start,
                end_date: dateTicketTypeFilterForm.data.end,
            }), {
                method: 'GET',
            }).then(res => res.json()).then(res => {
                setEventData(
                    (prevState) => {
                        const newState = { ...prevState };
                        const index = newState.ticket_types.findIndex((ticketType) => ticketType.id === event.id);
                        newState.ticket_types[index].transaction_count = res.transaction_count;
                        newState.ticket_types[index].transaction_total = res.transaction_total;
                        newState.ticket_types[index].ticket_total = res.ticket_total;
                        return newState;
                    }
                )
            });
        });
        setIsReadyShowTicketType(true);
    }, [dateTicketTypeFilterForm.data.start, dateTicketTypeFilterForm.data.end]);

    return (
        <DashboardAdminLayout title={`${event.name}`}>
            <div className="py-10 mx-auto sm:px-6 md:px-6 lg:px-6 xl:px-6">
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
                                                        <td className="whitespace-nowrap px-6 py-4">{eventData.name}</td>

                                                    </tr>
                                                    <tr className="border-b dark:border-neutral-500">
                                                        <td className="whitespace-nowrap px-6 py-4 font-medium">2</td>
                                                        <td className="whitespace-nowrap px-6 py-4">Lokasi</td>
                                                        <td className="whitespace-nowrap px-6 py-4">{eventData.location}</td>
                                                    </tr>
                                                    <tr className="border-b dark:border-neutral-500">
                                                        <td className="whitespace-nowrap px-6 py-4 font-medium">3</td>
                                                        <td className="whitespace-nowrap px-6 py-4">Tanggal Dimulai</td>
                                                        <td className="whitespace-nowrap px-6 py-4">{eventData.start_date}</td>
                                                    </tr>
                                                    <tr className="border-b dark:border-neutral-500">
                                                        <td className="whitespace-nowrap px-6 py-4 font-medium">4</td>
                                                        <td className="whitespace-nowrap px-6 py-4">Tanggal Berakhir</td>
                                                        <td className="whitespace-nowrap px-6 py-4">{eventData.end_date}</td>
                                                    </tr>
                                                    <tr className=" dark:border-neutral-500">
                                                        <td className="whitespace-nowrap px-6 py-4 font-medium">5</td>
                                                        <td className="whitespace-nowrap px-6 py-4">Maksimum Pembelian</td>
                                                        <td className="whitespace-nowrap px-6 py-4">{eventData.maximum_buy}</td>
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
                                <div className="bg-white shadow-sm shadow-neutral-700 overflow-hidden sm:rounded-lg p-4">
                                    <div className="text-lg md:text-2xl text-center font-bold">
                                        Statistik Penjualan Tiket
                                    </div>

                                    <div className="grid grid-cols-1 p-3 gap-10 justify-around">

                                        <div className="rounded-lg flex-col shadow-sm shadow-neutral-700 flex-1 border-neutral-400 text-white col-span-3">
                                            <div className='basis-  4/5 bg-[#36E051] px-10 py-5 rounded-t-lg text-center'>
                                                <div className="text-lg font-semibold mb-2">Total Terbayar</div>
                                                <div className="text-2xl font-extrabold">
                                                    <div className="stat-value">{paidTransaction.length} Pembelian</div>
                                                    <div className="stat-value">{totalIncome(paidTransaction).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) }</div>
                                                    <div className="stat-value">{totalTicketCount(paidTransaction)} Tiket</div>
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
                                    </div>
                                        {/* <div className="sm:px-6 md:px-6 lg:px-3 xl:px-6"> */}
                                            <div className='grid lg:grid-cols-3 sm:grid-cols-1 p-3 gap-10 justify-around'>
                                                <div className="rounded-lg flex-col shadow-sm shadow-neutral-700 flex-1 border-neutral-400 text-white">
                                                    <div className='basis-  4/5 bg-[#3684E0] px-10 py-5 rounded-t-lg text-center'>
                                                        <div className="text-lg font-semibold mb-2">Dana</div>
                                                        <div className="text-2xl font-extrabold">
                                                            <div className="stat-value">{Dana.length} Pembelian</div>
                                                            <div className="stat-value">{totalIncome(Dana).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</div>
                                                            <div className="stat-value">{totalTicketCount(  Dana)} Tiket</div>
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
                                                    <div className='basis-  4/5 bg-[#2EA1DA] px-10 py-5 rounded-t-lg text-center'>
                                                        <div className="text-lg font-semibold mb-2">Transfer VA Bank</div>
                                                        <div className="text-2xl font-extrabold">
                                                            <div className="stat-value">{TransferVABank.length} Pembelian</div>
                                                            <div className="stat-value">{totalIncome(TransferVABank).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</div>
                                                            <div className="stat-value">{totalTicketCount(TransferVABank)} Tiket</div>
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
                                                    <div className='basis-  4/5 bg-[#E03636] px-10 py-5 rounded-t-lg text-center'>
                                                        <div className="text-lg font-semibold mb-2">QRIS</div>
                                                        <div className="text-2xl font-extrabold">
                                                            <div className="stat-value">{QRIS.length} Pembelian</div>
                                                            <div className="stat-value">{totalIncome(QRIS).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</div>
                                                            <div className="stat-value">{totalTicketCount(QRIS)} Tiket</div>
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
                                                    <div className='basis-  4/5 bg-[#7736E0] px-10 py-5 rounded-t-lg text-center'>
                                                        <div className="text-lg font-semibold mb-2">Terbayar dan Tidak Terbayar</div>
                                                        <div className="text-2xl font-extrabold">
                                                            <div className="stat-value">{allTransactions.length} Pembelian</div>
                                                            <div className="stat-value">{totalTicketCount(allTransactions)} Tiket</div>
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
                                                    <div className='basis-4/5 bg-[#E0A636] px-10 py-5 rounded-t-lg text-center'>
                                                        <div className="text-lg font-semibold mb-2">Status Transaksi Tiket Pending</div>
                                                        <div className="text-2xl font-extrabold">
                                                            <div className="stat-value">{pendingTransaction.length} Pembelian</div>
                                                            <div className="stat-value">{totalTicketCount(pendingTransaction)} Tiket</div>
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
                                                        <div className="text-lg font-semibold mb-2">Status Transaksi Tiket Expired</div>
                                                        <div className="text-2xl font-extrabold">
                                                            <div className="stat-value">{expiredTransaction.length} Pembelian</div>
                                                            <div className="stat-value">{totalTicketCount(expiredTransaction)} Tiket</div>
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
                                            {/* </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CustomTabPanel>
                        {/* TODO : Make Graph */}
                        <CustomTabPanel value={tabValue} index={2}>
                        <div className="bg-white shadow-sm shadow-neutral-700 overflow-hidden sm:rounded-lg p-4">
                            <div className=''>
                                <div className='flex justify-between mb-4'>
                                    <div className="mt-6 text-center text-lg md:text-2xl font-bold ">
                                        Jenis Tiket Event
                                    </div>
                                <div className='my-auto overflow-auto flex gap-3'>
                                    <InertiaLink
                                        href={route('ticket-type.create', {
                                            event_id: eventData.id.toString()
                                        })}
                                        className="bg-blue-500 text-white hover:bg-blue-600 py-3 mt-6 px-5 rounded-lg text-md font-semibold my-auto">
                                        Tambah Jenis Tiket
                                    </InertiaLink>
                                    <form className="flex justify-between gap-2">
                                        <div className="form-control w-full ">
                                            <label htmlFor="start">Mulai tanggal</label>
                                            <input
                                                id="start"
                                                className="mt-1 block w-full"
                                                value={dateTicketTypeFilterForm.data.start}
                                                type="date"
                                                onChange={e => {
                                                    dateTicketTypeFilterForm.setData('start', e.currentTarget.value);
                                                }}
                                                autoComplete="date"
                                            />
                                        </div>
                                        <div className="form-control w-full ">
                                            <label htmlFor="end">Akhir tanggal</label>
                                            <input
                                                id="end"
                                                className="mt-1 block w-full"
                                                value={dateTicketTypeFilterForm.data.end}
                                                type="date"
                                                onChange={e => {
                                                    dateTicketTypeFilterForm.setData('end', e.currentTarget.value);
                                                }}
                                                autoComplete="date"
                                            />
                                        </div>
                                    </form>
                                </div>
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
                                    // renderTopToolbarCustomActions={() => {
                                    //     return (
                                    //         <div className='my-auto overflow-auto flex gap-3'>
                                    //             <InertiaLink
                                    //                 href={route('ticket-type.create', {
                                    //                     event_id: eventData.id.toString()
                                    //                 })}
                                    //                 className="bg-blue-500 text-white hover:bg-blue-600 py-3 mt-6 px-5 rounded-lg text-md font-semibold my-auto">
                                    //                 Tambah Jenis Tiket
                                    //             </InertiaLink>
                                    //             <form className="flex justify-between gap-2">
                                    //                 <div className="form-control w-full ">
                                    //                     <label htmlFor="start">Mulai tanggal</label>
                                    //                     <input
                                    //                         id="start"
                                    //                         className="mt-1 block w-full"
                                    //                         value={dateTicketTypeFilterForm.data.start}
                                    //                         type="date"
                                    //                         onChange={e => {
                                    //                             dateTicketTypeFilterForm.setData('start', e.currentTarget.value);
                                    //                         }}
                                    //                         autoComplete="date"
                                    //                     />
                                    //                 </div>
                                    //                 <div className="form-control w-full ">
                                    //                     <label htmlFor="end">Akhir tanggal</label>
                                    //                     <input
                                    //                         id="end"
                                    //                         className="mt-1 block w-full"
                                    //                         value={dateTicketTypeFilterForm.data.end}
                                    //                         type="date"
                                    //                         onChange={e => {
                                    //                             dateTicketTypeFilterForm.setData('end', e.currentTarget.value);
                                    //                         }}
                                    //                         autoComplete="date"
                                    //                     />
                                    //                 </div>
                                    //             </form>
                                    //         </div>
                                    //     )
                                    // }}
                                    renderDetailPanel={({ row }) => {
                                        return (
                                            <>
                                                {isReadyShowTicketType ? (
                                                    <div className='flex flex-col lg:flex-row lg:divide-x overflow-scroll'>
                                                        <div className='basis-1/3 px-5 max-w-screen-sm lg:max-w-full'>
                                                            <Line
                                                                datasetIdKey={`ticket_type_ticket-total_${row.original.id}`}
                                                                options={{
                                                                    responsive: true,
                                                                    plugins: {
                                                                        legend: {
                                                                            position: 'top' as const,
                                                                        },
                                                                        title: {
                                                                            display: true,
                                                                            text: 'Grafik Jumlah Penjualan Tiket ' + row.original.name,
                                                                        },
                                                                    },
                                                                }}
                                                                data={{
                                                                    labels: row.original.ticket_total.labels || [],
                                                                    datasets: [
                                                                        {
                                                                            label: 'Jumlah Tiket',
                                                                            data: row.original.ticket_total.data || [],
                                                                            fill: false,
                                                                            borderColor: `rgb(${Math.floor(mulberry32(row.original.id) * 255)}, ${Math.floor(mulberry32(row.original.price) * 255)}, ${Math.floor(mulberry32(row.original.fee) * 255)})`,
                                                                            tension: 0.1,
                                                                        }
                                                                    ]
                                                                }}
                                                            />
                                                        </div>
                                                        <div className='basis-1/3 px-5 max-w-screen-sm lg:max-w-full max-h-fit'>
                                                            <Line
                                                                datasetIdKey={`ticket_type_transaction-count_${row.original.id}`}
                                                                options={{
                                                                    responsive: true,
                                                                    plugins: {
                                                                        legend: {
                                                                            position: 'top' as const,
                                                                        },
                                                                        title: {
                                                                            display: true,
                                                                            text: 'Grafik Jumlah Transaksi ' + row.original.name,
                                                                        },
                                                                    },
                                                                }}
                                                                data={{
                                                                    labels: row.original.transaction_count.labels || [],
                                                                    datasets: [
                                                                        {
                                                                            label: 'Jumlah Transaksi',
                                                                            data: row.original.transaction_count.data || [],
                                                                            fill: false,
                                                                            borderColor: `rgb(${Math.floor(mulberry32(row.original.fee) * 255)}, ${Math.floor(mulberry32(row.original.id) * 255)}, ${Math.floor(mulberry32(row.original.price) * 255)})`,
                                                                            tension: 0.1,
                                                                        }
                                                                    ]
                                                                }}
                                                            />
                                                        </div>
                                                        <div className='basis-1/3 px-5 max-w-screen-sm lg:max-w-full max-h-fit'>
                                                            <Line
                                                                datasetIdKey={`ticket_type_transaction-total_${row.original.id}`}
                                                                options={{
                                                                    responsive: true,
                                                                    plugins: {
                                                                        legend: {
                                                                            position: 'top' as const,
                                                                        },
                                                                        title: {
                                                                            display: true,
                                                                            text: 'Grafik Total Transaksi ' + row.original.name,
                                                                        },
                                                                    },
                                                                    scales: {
                                                                        y: {
                                                                            beginAtZero: true,
                                                                        },
                                                                    },
                                                                }}
                                                                data={{
                                                                    labels: row.original.transaction_total.labels || [],
                                                                    datasets: [
                                                                        {
                                                                            label: 'Total Transaksi',
                                                                            data: row.original.transaction_total.data || [],
                                                                            fill: false,
                                                                            borderColor: `rgb(${Math.floor(mulberry32(row.original.price) * 255)}, ${Math.floor(mulberry32(row.original.fee) * 255)}, ${Math.floor(mulberry32(row.original.id) * 255)})`,
                                                                            tension: 0.1,
                                                                        }
                                                                    ]
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                ) :
                                                    (
                                                        <>
                                                            <div className="animate-pulse flex space-x-4" />
                                                        </>
                                                    )}
                                            </>
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
                            {/* </div> */}
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
