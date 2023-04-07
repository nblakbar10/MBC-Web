<!DOCTYPE html>
<html>

<head>
    <title>LoketMBC.com - SmileFest2023</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet">

</head>

<body>
    <div class="flex justify-center bg-gray-600 h-screen py-10 px-24" style="display: flex;justify-content: center;--tw-bg-opacity: 1;padding-left: 6rem;padding-right: 6rem;padding-top: 2.5rem;padding-bottom: 2.5rem; height: 100vh;background-color: rgb(75 85 99 / var(--tw-bg-opacity));">
        <div class="bg-white rounded-lg max-w-7xl h-full flex flex-col gap-5 p-5"
        style="--tw-bg-opacity: 1;background-color: rgb(255 255 255 / var(--tw-bg-opacity));border-radius: 0.5rem;border-radius: 0.5rem;max-width: 80rem;height: 100%;display: flex;flex-direction: column;gap: 1.25rem;padding: 1.25rem;">
            <div class="flex justify-center p-3"
            style="display: flex;justify-content: center;padding: 0.75rem;">
                <img src="./MBC_HD.png" class="w-40 bg-gray-500 p-3 rounded-lg"
                style="--tw-bg-opacity: 1;background-color: rgb(107 114 128 / var(--tw-bg-opacity));padding: 0.75rem;border-radius: 0.5rem; width: 10rem;" />
            </div>

            <div class="text-md mt-5">
                Selamat, pembayaran tiketmu telah kami terima, berikut data detail untuk tiketmu yang dapat di-redeem
                ketika
                konser akan berlangsung.
            </div>
           <div class="text-md mt-5">
                Jika kamu tidak menerima email, silahkan cek folder spam atau masuk ke halaman <a
                    href="https://loketmbc.com/cek-pesanan">cek pesanan</a> untuk mendapatkan tiket yang telah kamu
                pesan.
            </div>
            <div id="token" hidden >
                {{$mailData['id_tiket']}}
            </div>

            <div class="border-y-neutral-900 border flex py-3 px-2" style="--tw-border-opacity: 1;border-top-color: rgb(23 23 23 / var(--tw-border-opacity));border-bottom-color: rgb(23 23 23 / var(--tw-border-opacity));border-top-style: solid;border-bottom-style: solid;border-width: 1px;padding-top: 0.75rem;padding-bottom: 0.75rem;padding-left: 0.5rem;padding-right: 0.5rem;">
                <div>
                    <table class="w-full table-auto	" style="width: 100%;table-layout: auto;">
                        <tr>
                            <td class="text-md">ID Tiket</td>
                            <td class="text-md px-3">:</td>
                            <td class="text-md">{{$mailData['id_tiket']}}</td>
                        </tr>
                        <tr>
                            <td class="text-md">Nama</td>
                            <td class="text-md px-3">:</td>
                            <td class="text-md">{{$mailData['nama']}}</td>
                        </tr>
                        <tr>
                            <td class="text-md">Email</td>
                            <td class="text-md px-3">:</td>
                            <td class="text-md">{{$mailData['email']}}</td>
                        </tr>
                        <tr>
                            <td class="text-md">No. HP</td>
                            <td class="text-md px-3">:</td>
                            <td class="text-md">{{$mailData['no_hp']}}</td>
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
                            <td class="text-md">{{$mailData['total_pembayaran']}}</td>
                        </tr>
                        <tr>
                            <td class="text-md">Metode Pembayaran</td>
                            <td class="text-md px-3">:</td>
                            <td class="text-md">{{$mailData['metode_pembayaran']}}</td>
                        </tr>
                        <tr>
                            <td class="text-md">Status Tiket</td>
                            <td class="text-md px-3">:</td>
                            <td class="text-md">{{$mailData['status_tiket']}}</td>
                        </tr>
                    </table>
                </div>

            </div>
            <div class="flex justify-center">
                <svg id="id_tiket"></svg>
            </div>
            <div class="flex justify-center"
            style="display: flex;justify-content: center;">
                <p>2023 @ PT Maju Bersama Kreatif</p>
            </div>
        </div>
    </div>
</body>
<script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"></script>
<script>
    const id_tiket = document.getElementById("token").innerHTML;
    JsBarcode("#id_tiket", id_tiket);
</script>

</html>
