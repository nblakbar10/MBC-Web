<!DOCTYPE html>
<html>

<head>
    <title>LoketMBC.com - SmileFest2023</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet">

</head>

<body>
    <div class="flex justify-center bg-gray-600 h-screen py-10 px-24">
        <div class="bg-white rounded-lg max-w-7xl h-full flex flex-col gap-5 p-5">
            <div class="flex justify-center p-3">
                <img src="./MBC_HD.png" class="w-40 bg-gray-500 p-3 rounded-lg" />
            </div>

            <div class="text-md mt-5">
            Hallo, {{$mailData['to']}}
            </div>
            <div class="text-md mt-5">
            Proses booking tiket anda telah berhasil! Anda akan menerima bukti konfirmasi pembelian tiket
            ketika pembayaran anda telah kami terima.
            </div>
            <div class="text-md mt-5">
            Berikut detail data pemesanan anda yang kami terima:
            </div>
            <!-- <div class="text-md mt-5">
                Jika kamu tidak menerima email, silahkan cek folder spam atau masuk ke halaman <a
                    href="https://loketmbc.com/cek-pesanan">cek pesanan</a> untuk mendapatkan tiket yang telah kamu
                pesan.
            </div> -->
            <!-- <div id="token" hidden>
                {{$mailData['id_tiket']}}
            </div> -->

            <div class="border-y-neutral-900 border flex py-3 px-2">
                <div>
                    <table class="w-full table-auto	">
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
                </div>

            </div>
            <!-- <div class="flex justify-center">
                <svg id="id_tiket"></svg>
            </div> -->
            <div class="flex justify-center">
                <p>2023 @ PT Maju Bersama Kreatif</p>
            </div>
        </div>
    </div>
</body>
<!-- <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js"></script>
<script>
    const id_tiket = document.getElementById("token").innerHTML;
    JsBarcode("#id_tiket", id_tiket);
</script> -->

</html>
