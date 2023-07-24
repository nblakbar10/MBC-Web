import DashboardAdminLayout from '@/Layouts/DashboardAdminLayout';
import React from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface Props {

}

export default function Dashboard(props: Props) {

	return (
		<DashboardAdminLayout
			title="Dashboard"
		>
            <div className="max-w-7xl mx-auto sm:px-6 md:px-3 lg:px-6 xl:px-6 mt-10 ">
				<div className="bg-white shadow-sm shadow-neutral-700 overflow-hidden sm:rounded-lg p-4">
					{/* <div className="max-w-7xl"> */}
						<div className="grid grid-cols-1 sm:grid-cols-1 p-3 gap-5 justify-around">
							<div className="rounded-lg flex-col shadow-sm shadow-neutral-700 flex-1 border-neutral-400 text-white">
								<div className='basis-  4/5 bg-[#E05E36] px-10 py-5 rounded-t-lg text-center'>
									<div className="text-lg font-semibold mb-2">Total Event yang Berlangsung</div>
									<div className="text-2xl font-extrabold">
										<div className="stat-value">0 Event</div>

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
                            <div className='grid lg:grid-cols-3 sm:grid-cols-1 gap-10 justify-around'>
                                <div className="rounded-lg flex-col shadow-sm shadow-neutral-700 flex-1 border-neutral-400 text-white">
                                    <div className='basis-  4/5 bg-[#E05E36] px-10 py-5 rounded-t-lg text-center'>
                                        <div className="text-lg font-semibold mb-2">Total Tiket Event yang Terjual</div>
                                        <div className="text-2xl font-extrabold">
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
                                        <div className="text-lg font-semibold mb-2">Total Harga Tiket yang Terjual </div>
                                        <div className="text-2xl font-extrabold">
                                            <div className="stat-value">Rp.0</div>

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
                                        <div className="text-lg font-semibold mb-2">Total Pengguna pada Sistem MBC</div>
                                        <div className="text-2xl font-extrabold">
                                            <div className="stat-value">1 Pengguna</div>

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
                            <h3 className='font-semibold'>DAFTAR RIWAYAT</h3>
                                <table className="min-w-full text-left text-sm font-light">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                    <tr>
                                    <th scope="col" className="px-6 py-4">#</th>
                                    <th scope="col" className="px-6 py-4">First</th>
                                    <th scope="col" className="px-6 py-4">Last</th>
                                    <th scope="col" className="px-6 py-4">Handle</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b dark:border-neutral-500">
                                    <td className="whitespace-nowrap px-6 py-4 font-medium">1</td>
                                    <td className="whitespace-nowrap px-6 py-4">Mark</td>
                                    <td className="whitespace-nowrap px-6 py-4">Otto</td>
                                    <td className="whitespace-nowrap px-6 py-4">@mdo</td>
                                    </tr>
                                    <tr className="border-b dark:border-neutral-500">
                                    <td className="whitespace-nowrap px-6 py-4 font-medium">2</td>
                                    <td className="whitespace-nowrap px-6 py-4">Jacob</td>
                                    <td className="whitespace-nowrap px-6 py-4">Thornton</td>
                                    <td className="whitespace-nowrap px-6 py-4">@fat</td>
                                    </tr>
                                    <tr className="border-b dark:border-neutral-500">
                                    <td className="whitespace-nowrap px-6 py-4 font-medium">3</td>
                                    <td className="whitespace-nowrap px-6 py-4">Larry</td>
                                    <td className="whitespace-nowrap px-6 py-4">Wild</td>
                                    <td className="whitespace-nowrap px-6 py-4">@twitter</td>
                                    </tr>
                                </tbody>
                                </table>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto py-2 mt-4">
                    <div className="bg-white shadow-sm shadow-neutral-700 overflow-hidden sm:rounded-lg p-4">
                    </div>
                </div>
                <div className="max-w-7xl mx-auto py-2 mt-4">
                    <div className="bg-white shadow-sm shadow-neutral-700 overflow-hidden sm:rounded-lg p-4">
                    </div>
                </div>
            </div>
		</DashboardAdminLayout>
	);
}
