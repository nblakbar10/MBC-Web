<!DOCTYPE html>
<html>

<head>
    <title>LoketMBC.com - SmileFest2023</title>
   <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet">

</head>

<body>
    <div class="flex justify-center bg-gray-600 h-screen py-10 px-24"
        style="display: flex;justify-content: center;--tw-bg-opacity: 1;padding-left: 6rem;padding-right: 6rem;padding-top: 2.5rem;padding-bottom: 2.5rem; height: 100vh;background-color: rgb(75 85 99 / var(--tw-bg-opacity));">
        <div class="bg-white rounded-lg max-w-7xl h-full flex flex-col gap-5 p-5"
            style="--tw-bg-opacity: 1;background-color: rgb(255 255 255 / var(--tw-bg-opacity));border-radius: 0.5rem;border-radius: 0.5rem;max-width: 80rem;height: 100%;display: flex;flex-direction: column;gap: 1.25rem;padding: 1.25rem;">
            <div class="flex justify-center p-3" style="display: flex;justify-content: center;padding: 0.75rem;">
                <img src="./MBC_HD.png" class="w-40 bg-gray-500 p-3 rounded-lg"
                    style="--tw-bg-opacity: 1;background-color: rgb(107 114 128 / var(--tw-bg-opacity));padding: 0.75rem;border-radius: 0.5rem; width: 10rem;" />
            </div>

            <h2 class="text-md mt-5" style="margin-top: 1.25rem;">
                Hallo, {{$mailData['to']}}
            </h2>
            <h4 class="text-md mt-5" style="margin-top: 1.25rem;">
                Proses booking tiket anda telah berhasil! Anda akan menerima bukti konfirmasi pembelian tiket
                ketika pembayaran anda telah kami terima.
            </h4>
            <h3 class="text-md mt-5" style="margin-top: 1.25rem;">
                Berikut detail data pemesanan anda yang kami terima:
            </h3>

            <div class="border-y-neutral-900 border py-3 px-2"
                style="--tw-border-opacity: 1;border-top-color: rgb(23 23 23 / var(--tw-border-opacity));border-bottom-color: rgb(23 23 23 / var(--tw-border-opacity));border-top-style: solid;border-bottom-style: solid;border-width: 1px;padding-top: 0.75rem;padding-bottom: 0.75rem;padding-left: 0.5rem;padding-right: 0.5rem;">
                <div>
                    <table class="w-full table-auto" style="width: 100%;table-layout: auto;">
                        <tr>
                            <td class="text-md">Nama</td>
                            <td class="text-md px-3">:</td>
                            <td class="text-md">{{$mailData['nama']}}</td>
                        </tr>
                        <tr>
                            <td class="text-md">No.HP</td>
                            <td class="text-md px-3">:</td>
                            <td class="text-md">{{$mailData['no_hp']}}</td>
                        </tr>
                        <tr>
                            <td class="text-md">Email</td>
                            <td class="text-md px-3">:</td>
                            <td class="text-md">{{$mailData['email']}}</td>
                        </tr>
                        <tr>
                            <td class="text-md">Jumlah Tiket</td>
                            <td class="text-md px-3">:</td>
                            <td class="text-md">{{$mailData['jumlah_tiket']}}</td>
                        </tr>
                        <tr>
                            <td class="text-md">Jenis Tiket</td>
                            <td class="text-md px-3">:</td>
                            <td class="text-md">{{$mailData['jenis_tiket']}}</td>
                        </tr>
                        <tr>
                            <td class="text-md">Total Pembelian</td>
                            <td class="text-md px-3">:</td>
                            <td class="text-md">{{$mailData['total_pembelian']}}</td>
                        </tr>
                        <tr>
                            <td class="text-md">Metode Pembayaran</td>
                            <td class="text-md px-3">:</td>
                            <td class="text-md">{{$mailData['metode_pembayaran']}}</td>
                        </tr>
                        <tr>
                            <td class="text-md">Status Pembayaran</td>
                            <td class="text-md px-3">:</td>
                            <td class="text-md">{{$mailData['status_pembayaran']}}</td>
                        </tr>
                    </table>
                    <div class="text-md mt-5"
                    style="margin-top: 1.25rem;"
                    >
                        Berikut link untuk melakukan pembayaran:
                    </div>
                </div>

            </div>
            <div
            class="flex justify-center"
            style="display: flex;justify-content: center;"
            >
                <p>2023 @ PT Maju Bersama Kreatif</p>
            </div>
        </div>
    </div>
</body>

</html>
