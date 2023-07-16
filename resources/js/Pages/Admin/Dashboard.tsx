import DashboardAdminLayout from '@/Layouts/DashboardAdminLayout';
import React from 'react';

interface Props {

}

export default function Dashboard(props: Props) {

	return (
		<DashboardAdminLayout
			title="Dashboard"
		>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-12">
				<div className="bg-white shadow-sm shadow-neutral-700 overflow-hidden sm:rounded-lg p-4">
					<div className="max-w-7xl">
						<div className="grid grid-cols-1 lg:grid-cols-3 p-3 gap-10 justify-around">

							<div className="rounded-lg flex-col shadow-sm shadow-neutral-700 flex-1 border-neutral-400 text-white">
								<div className='basis-  4/5 bg-[#2EA1DA] px-10 py-5 rounded-t-lg text-center'>
									<div className="text-lg font-semibold mb-2">Total Terbayar</div>
									<div className="text-2xl font-extrabold">
										{/* <div className="stat-value">{netTransaction.length} Pembelian</div>
										<div className="stat-value">{
											totalIncome(netTransaction).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
										}</div>
										<div className="stat-value">{
											totalTicketCount(netTransaction)
										} Tiket</div> */}
									</div>
								</div>
								<div className='h-8'>
									{/* <InertiaLink href={route("transaction.index")}>
										<p className="text-lg font-semibold text-dark-100 text-center text-[#000000]">
											More Info
											<span className="text-black border-black">
												<ArrowForwardIcon />
											</span>
										</p>
									</InertiaLink > */}
                                    </div>
							</div>

							<div className="rounded-lg flex-col shadow-sm shadow-neutral-700 flex-1 border-neutral-400 text-white">
								<div className='basis-  4/5 bg-[#2EA1DA] px-10 py-5 rounded-t-lg text-center'>
									<div className="text-lg font-semibold mb-2">Dana</div>
									<div className="text-2xl font-extrabold">
										{/* <div className="stat-value">{Dana.length} Pembelian</div>
										<div className="stat-value">{
											totalIncome(Dana).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
										}</div>
										<div className="stat-value">{
											totalTicketCount(Dana)
										} Tiket</div> */}
									</div>
								</div>
								<div className='h-8'>
									{/* <InertiaLink href={route("transaction.index")}>
										<p className="text-lg font-semibold text-dark-100 text-center text-[#000000]">
											More Info
											<span className="text-black border-black">
												<ArrowForwardIcon />
											</span>
										</p>
									</InertiaLink > */}
                                    </div>
							</div>
							<div className="rounded-lg flex-col shadow-sm shadow-neutral-700 flex-1 border-neutral-400 text-white">
								<div className='basis-  4/5 bg-[#2EA1DA] px-10 py-5 rounded-t-lg text-center'>
									<div className="text-lg font-semibold mb-2">Transfer VA Bank</div>
									<div className="text-2xl font-extrabold">
										{/* <div className="stat-value">{TransferVABank.length} Pembelian</div>
										<div className="stat-value">{
											totalIncome(TransferVABank).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
										}</div>
										<div className="stat-value">{
											totalTicketCount(TransferVABank)
										} Tiket</div> */}
									</div>
								</div>
								<div className='h-8'>
									{/* <InertiaLink href={route("transaction.index")}>
										<p className="text-lg font-semibold text-dark-100 text-center text-[#000000]">
											More Info
											<span className="text-black border-black">
												<ArrowForwardIcon />
											</span>
										</p>
									</InertiaLink > */}
                                    </div>
							</div>
							<div className="rounded-lg flex-col shadow-sm shadow-neutral-700 flex-1 border-neutral-400 text-white">
								<div className='basis-  4/5 bg-[#2EA1DA] px-10 py-5 rounded-t-lg text-center'>
									<div className="text-lg font-semibold mb-2">Terbayar dan Tidak Terbayar</div>
									<div className="text-2xl font-extrabold">
										{/* <div className="stat-value">{allTransactions.length} Pembelian</div>
										<div className="stat-value">{
											totalTicketCount(allTransactions)
										} Tiket</div> */}
									</div>
								</div>
								<div className='h-8'>
									{/* <InertiaLink href={route("transaction.index")}>
										<p className="text-lg font-semibold text-dark-100 text-center text-[#000000]">
											More Info
											<span className="text-black border-black">
												<ArrowForwardIcon />
											</span>
										</p>
									</InertiaLink > */}
                                    </div>
							</div>
							<div className="rounded-lg flex-col shadow-sm shadow-neutral-700 flex-1 border-neutral-400 text-white">
								<div className='basis-4/5 bg-[#2EA1DA] px-10 py-5 rounded-t-lg text-center'>
									<div className="text-lg font-semibold mb-2">PENDING</div>
									<div className="text-2xl font-extrabold">
										{/* <div className="stat-value">{unpaidTransaction.length} Pembelian</div>
										<div className="stat-value">{
											totalTicketCount(unpaidTransaction)
										} Tiket</div> */}
									</div>
								</div>
								<div className='h-8'>
									{/* <InertiaLink href={route("transaction.index")}>
										<p className="text-lg font-semibold text-dark-100 text-center text-[#000000]">
											More Info
											<span className="text-black border-black">
												<ArrowForwardIcon />
											</span>
										</p>
									</InertiaLink > */}
                                    </div>
							</div>
							<div className="rounded-lg flex-col shadow-sm shadow-neutral-700 flex-1 border-neutral-400 text-white">
								<div className='basis-4/5 bg-[#2EA1DA] px-10 py-5 rounded-t-lg text-center'>
									<div className="text-lg font-semibold mb-2">Expired</div>
									<div className="text-2xl font-extrabold">
										{/* <div className="stat-value">{expiredTransaction.length} Pembelian</div>
										<div className="stat-value">{
											totalTicketCount(expiredTransaction)
										} Tiket</div> */}
									</div>
								</div>
								<div className='h-8'>
									{/* <InertiaLink href={route("transaction.index")}>
										<p className="text-lg font-semibold text-dark-100 text-center text-[#000000]">
											More Info
											<span className="text-black border-black">
												<ArrowForwardIcon />
											</span>
										</p>
									</InertiaLink > */}
                                    </div>
							</div>
						</div>
						{/* <div className="flex flex-col lg:flex-row p-3 gap-10 justify-around">

              <div className="rounded-lg flex-col shadow-sm shadow-neutral-700 flex-1 border-neutral-400 text-white">
                <div className='basis-  4/5 bg-[#2EA1DA] px-10 py-5 rounded-t-lg text-center'>
                  <div className="text-lg font-semibold mb-2">Jumlah Pengguna</div>
                  <div className="text-2xl font-extrabold">
                    <div className="stat-value">{users_count}</div>
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
                    <div className="stat-value">{transaction_count}</div></div>
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
              <div className="rounded-lg flex-col shadow-sm shadow-neutral-700 flex-1 border-neutral-400 text-white">
                <div className='basis-4/5 bg-[#2EA1DA] px-10 py-5 rounded-t-lg text-center'>
                  <div className="text-lg font-semibold mb-2">Jumlah Event</div>
                  <div className="text-2xl font-extrabold">
                    <div className="stat-value">0{event_count}</div></div>
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
            </div> */}
						{/* <div className="flex flex-col lg:flex-row gap-3 mt-5">
              <div className="flex-1 rounded-lg shadow-sm shadow-neutral-700 border-neutral-400">
                <Line options={LineChartConfig} data={data} />
              </div>
              <div className="basis-1/2 rounded-lg shadow-sm shadow-neutral-700 border-neutral-400">
                <Bar options={BarChartConfig} data={data} />
              </div>
            </div>
            <div className="mt-5">

            </div> */}
					</div>
				</div>
			</div>
		</DashboardAdminLayout>
	);
}
