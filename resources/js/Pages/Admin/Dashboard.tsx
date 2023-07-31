import DashboardAdminLayout from '@/Layouts/DashboardAdminLayout';
import React, { useEffect } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { UserActivityModel } from '@/Models/UserActivity';
import { InertiaLink, useForm } from '@inertiajs/inertia-react';
import route from 'ziggy-js';
import moment from 'moment';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Legend, Tooltip } from 'chart.js';

interface Props {
    totalTicket: number,
    totalEvent: number,
    totalUser: number,
    totalPrice: number,
    transactionCount: number,
    latestUserActivities: UserActivityModel[]
}

interface transactionGraphProps {
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

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Legend,
    Tooltip
);

export default function Dashboard({
    totalTicket,
    totalEvent,
    totalUser,
    totalPrice,
    transactionCount,
    latestUserActivities
}: Props) {
    const dateTicketTypeFilterForm = useForm(
        {
            start: moment(new Date()).subtract(7, 'days').format('YYYY-MM-DD'),
            end: moment(new Date()).format('YYYY-MM-DD'),
        }
    );

    const [transactionData, setTransactionData] = React.useState<transactionGraphProps>();

    useEffect(() => {
        fetch(route('api.transactionDateAll', {
            start_date: dateTicketTypeFilterForm.data.start,
            end_date: dateTicketTypeFilterForm.data.end
        })).then((response) => {
            response.json().then((data) => {
                setTransactionData(data);
            });
        });

    }, [dateTicketTypeFilterForm.data.start, dateTicketTypeFilterForm.data.end]);

    console.log(transactionData);
    
    return (
        <DashboardAdminLayout
            title="Dashboard"
        >
            <div className="max-w-7xl mx-auto sm:px-6 md:px-3 lg:px-6 xl:px-6 mt-10 ">
                <div className="bg-white shadow-sm shadow-neutral-700 overflow-hidden sm:rounded-lg p-4">
                    {/* <div className="max-w-7xl"> */}
                    <div className="flex flex-col gap-5 justify-around">
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 justify-around'>
                            <div className="rounded-lg flex-col shadow-sm shadow-neutral-700 border-neutral-400 text-white">
                                <div className='basis-4/5 bg-[#E05E36] px-10 py-5 rounded-t-lg text-center'>
                                    <div className="text-lg font-semibold mb-2">Total Event yang Berlangsung</div>
                                    <div className="text-2xl font-extrabold">
                                        <div className="">{totalEvent} Event</div>

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
                            <div className="rounded-lg flex-col shadow-sm shadow-neutral-700 border-neutral-400 text-white">
                                <div className='basis-4/5 bg-[#E05E36] px-10 py-5 rounded-t-lg text-center'>
                                    <div className="text-lg font-semibold mb-2">Total Pengguna pada Sistem MBC</div>
                                    <div className="text-2xl font-extrabold">
                                        <div className="">{totalUser} Pengguna</div>

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
                        </div>
                        <div className='grid lg:grid-cols-3 sm:grid-cols-1 gap-10 justify-around'>
                            <div className="rounded-lg flex-col shadow-sm shadow-neutral-700 flex-1 border-neutral-400 text-white">
                                <div className='basis-4/5 bg-[#E05E36] px-10 py-5 rounded-t-lg text-center'>
                                    <div className="text-lg font-semibold mb-2">Total Tiket yang Terjual</div>
                                    <div className="text-2xl font-extrabold">
                                        <div className="">{totalTicket} Tiket</div>
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
                                    <div className="text-lg font-semibold mb-2">Total Penjualan yang Terjual </div>
                                    <div className="text-2xl font-extrabold">
                                        <div className="">{totalPrice.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</div>

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
                                    <div className="text-lg font-semibold mb-2">Jumlah Transaksi </div>
                                    <div className="text-2xl font-extrabold">
                                        <div className="">{transactionCount}</div>
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
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto py-2 mt-4 ">
                    <div className="bg-white shadow-sm shadow-neutral-700 overflow-hidden sm:rounded-lg p-4">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                    <div className='flex justify-between'>
                                        <h3 className='font-semibold text-xl'>Riwayat Aktivitas Admin Terakhir</h3>
                                        <InertiaLink
                                            href={route('user-activity.index')}
                                            className="bg-blue-500 text-white hover:bg-blue-600 py-3 px-5 rounded-lg text-md font-semibold">
                                            Lihat Lainnya
                                        </InertiaLink>
                                    </div>
                                    <table className="min-w-full text-left text-sm font-light">
                                        <thead className="border-b font-medium dark:border-neutral-500">
                                            <tr>
                                                <th scope="col" className="px-6 py-4">#</th>
                                                <th scope="col" className="px-6 py-4">Nama</th>
                                                <th scope="col" className="px-6 py-4">Email</th>
                                                <th scope="col" className="px-6 py-4">Aktivitas</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {latestUserActivities.map((activity, index) => (
                                                <tr key={index} className="border-b border-neutral-200 dark:border-neutral-700">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                                                        {index + 1}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                                                        {activity.user!.name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                                                        {activity.user!.email}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                                                        {activity.activity}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                d</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto py-2 mt-4 sm:rounded-lg shadow-sm  shadow-neutral-700">
                    <div className="bg-white  overflow-hidden p-4 flex flex-col gap-3">
                        <div className='flex justify-center'>
                            <p className='text-lg font-semibold'>
                                Grafik Penjualan
                            </p>
                        </div>
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
                    <div className="border-t p-3 ">
                        <div className='flex flex-col lg:flex-row lg:divide-x overflow-scroll'>
                            <div className='basis-1/3 px-5 max-w-screen-sm lg:max-w-full'>
                                <Line
                                    datasetIdKey={`ticket_type_ticket-total_`}
                                    options={{
                                        responsive: true,
                                        plugins: {
                                            legend: {
                                                position: 'top' as const,
                                            },
                                            title: {
                                                display: true,
                                                text: 'Grafik Jumlah Penjualan Tiket Keseluruhan ',
                                            },
                                        },
                                    }}
                                    data={{
                                        labels: transactionData?.ticket_total.labels || [],
                                        datasets: [
                                            {
                                                label: 'Jumlah Tiket',
                                                data: transactionData?.ticket_total.data || [],
                                                fill: false,
                                                borderColor: `rgb(0, 137, 240)`,
                                                tension: 0.1,
                                            }
                                        ]
                                    }}
                                />
                            </div>
                            <div className='basis-1/3 px-5 max-w-screen-sm lg:max-w-full max-h-fit'>
                                <Line
                                    datasetIdKey={`ticket_type_transaction-count_`}
                                    options={{
                                        responsive: true,
                                        plugins: {
                                            legend: {
                                                position: 'top' as const,
                                            },
                                            title: {
                                                display: true,
                                                text: 'Grafik Jumlah Transaksi Keseluruhan ',
                                            },
                                        },
                                    }}
                                    data={{
                                        labels: transactionData?.transaction_count.labels || [],
                                        datasets: [
                                            {
                                                label: 'Jumlah Transaksi',
                                                data: transactionData?.transaction_count.data || [],
                                                fill: false,
                                                borderColor: `rgb(137, 0, 240)`,
                                                tension: 0.1,
                                            }
                                        ]
                                    }}
                                />
                            </div>
                            <div className='basis-1/3 px-5 max-w-screen-sm lg:max-w-full max-h-fit'>
                                <Line
                                    datasetIdKey={`ticket_type_transaction-total_`}
                                    options={{
                                        responsive: true,
                                        plugins: {
                                            legend: {
                                                position: 'top' as const,
                                            },
                                            title: {
                                                display: true,
                                                text: 'Grafik Total Transaksi Keseluruhan ',
                                            },
                                        },
                                        scales: {
                                            y: {
                                                beginAtZero: true,
                                            },
                                        },
                                    }}
                                    data={{
                                        labels: transactionData?.transaction_total.labels || [],
                                        datasets: [
                                            {
                                                label: 'Total Transaksi',
                                                data: transactionData?.transaction_total.data || [],
                                                fill: false,
                                                borderColor: `rgb(0, 240,137)`,
                                                tension: 0.1,
                                            }
                                        ]
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardAdminLayout>
    );
}
