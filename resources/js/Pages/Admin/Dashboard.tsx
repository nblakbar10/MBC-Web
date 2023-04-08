import React from 'react';

import DashboardAdminLayout from '@/Layouts/DashboardAdminLayout';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { InertiaLink } from '@inertiajs/inertia-react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import route from 'ziggy-js';

interface Props {
    users_count:number,
    event_count:number,
    transaction_count:number,
}

const LineChartConfig = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Grafik Transaksi Pembelian',

    },

  },
};

const BarChartConfig = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Grafik Event',
    },

  },
};

interface Props {
}


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard(props: Props) {

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => Math.floor(Math.random() * (1000 - (-1000) + 1)) + (-1000)),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => Math.floor(Math.random() * (1000 - (-1000) + 1)) + (-1000)),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <DashboardAdminLayout
      title="Dashboard"
    >
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow-sm shadow-neutral-700 overflow-hidden sm:rounded-lg p-4">
          <div className="max-w-7xl">
            <div className="flex flex-col lg:flex-row p-3 gap-10 justify-around">

              <div className="rounded-lg flex-col shadow-sm shadow-neutral-700 flex-1 border-neutral-400 text-white">
                <div className='basis-  4/5 bg-[#2EA1DA] px-10 py-5 rounded-t-lg text-center'>
                    <div className="text-lg font-semibold mb-2">Jumlah Pengguna</div>
                <div className="text-2xl font-extrabold">
                    <div className="stat-value">{props.users_count}</div>
                </div>
            </div>
                <div className='h-8'>
                <InertiaLink href={route("dashboard")}>
                    <p className="text-lg font-semibold text-dark-100 text-center text-[#000000]">
                      More Info
                      <span className="text-black border-black">
                        <ArrowForwardIcon />
                      </span>
                    </p>
                  </InertiaLink ></div>
              </div>

              <div className="rounded-lg flex-col shadow-sm shadow-neutral-700 flex-1 border-neutral-400 text-white">
                <div className='basis-4/5 bg-[#2EA1DA] px-10 py-5 rounded-t-lg text-center'>
                  <div className="text-lg font-semibold mb-2">Jumlah Transaksi</div>
                  <div className="text-2xl font-extrabold">
                    <div className="stat-value">{props.transaction_count}</div></div>
                </div>
                <div className='h-8'>
                <InertiaLink href={route("dashboard")}>
                    <p className="text-lg font-semibold text-dark-100 text-center text-[#000000]">
                      More Info
                      <span className="text-black border-black">
                        <ArrowForwardIcon />
                      </span>
                    </p>
                  </InertiaLink >                </div>
              </div>
              <div className="rounded-lg flex-col shadow-sm shadow-neutral-700 flex-1 border-neutral-400 text-white">
                <div className='basis-4/5 bg-[#2EA1DA] px-10 py-5 rounded-t-lg text-center'>
                  <div className="text-lg font-semibold mb-2">Jumlah Event</div>
                  <div className="text-2xl font-extrabold">
                    <div className="stat-value">0{props.event_count}</div></div>
                </div>
                <div className='h-8'>
                  <InertiaLink href={route("dashboard")}>
                    <p className="text-lg font-semibold text-dark-100 text-center text-[#000000]">
                      More Info
                      <span className="text-black border-black">
                        <ArrowForwardIcon />
                      </span>
                    </p>
                  </InertiaLink >
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-3 mt-5">
              <div className="flex-1 rounded-lg shadow-sm shadow-neutral-700 border-neutral-400">
                <Line options={LineChartConfig} data={data} />
              </div>
              <div className="basis-1/2 rounded-lg shadow-sm shadow-neutral-700 border-neutral-400">
                <Bar options={BarChartConfig} data={data} />
              </div>
            </div>
            <div className="mt-5">

            </div>
          </div>
        </div>
      </div>
    </DashboardAdminLayout>
  );
}
