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
                Pesananmu telah berhasil di proses, silahkan cek email kamu untuk mendapatkan tiket yang telah kamu
                pesan.
            </div>
            <div class="text-md mt-5">
                Jika kamu tidak menerima email, silahkan cek folder spam atau masuk ke halaman <a
                    href="https://loketmbc.com/cek-pesanan">cek pesanan</a> untuk mendapatkan tiket yang telah kamu
                pesan.
            </div>

            <div class="border-y-neutral-900 border flex py-3 px-2">
                <div>
                    <table class="w-full table-auto	">
                        <!-- <tr>
                            <td class="text-md">mailData['to']</td>
                            <td class="text-md px-3">:</td>
                            <td class="text-md">mailData['to']</td>
                        </tr> -->
                        <!-- <tr>
                            <td class="text-md">mailData['p1']</td>
                            <td class="text-md px-3">:</td>
                            <td class="text-md">mailData['p1']</td>
                        </tr> -->
                        <tr>
                            <td class="text-md">Nama</td>
                            <td class="text-md px-3">:</td>
                            <td class="text-md">{{$mailData['data1']}}</td>
                        </tr>
                        <tr>
                            <td class="text-md">No. HP</td>
                            <td class="text-md px-3">:</td>
                            <td class="text-md">{{$mailData['data2']}}</td>
                        </tr>
                        <tr>
                            <td class="text-md">Jumlah Tiket</td>
                            <td class="text-md px-3">:</td>
                            <td class="text-md">{{$mailData['data3']}}</td>
                        </tr>
                        <tr>
                            <td class="text-md">Kategori Tiket</td>
                            <td class="text-md px-3">:</td>
                            <td class="text-md">{{$mailData['data4']}}</td>
                        </tr>
                        <tr>
                            <td class="text-md">Total Pembayaran</td>
                            <td class="text-md px-3">:</td>
                            <td class="text-md">{{$mailData['data5']}}</td>
                        </tr>
                        <tr>
                            <td class="text-md">Metode Pembayaran</td>
                            <td class="text-md px-3">:</td>
                            <td class="text-md">{{$mailData['data6']}}</td>
                        </tr>
                        <tr>
                            <td class="text-md">Link untuk pembayaran</td>
                            <td class="text-md px-3">:</td>
                            <td class="text-md">{{$mailData['link']}}</td>
                        </tr>
                    </table>
                </div>

            </div>
            <div class="flex justify-center">
                <svg id="barcode"></svg>
            </div>
            <div class="flex justify-end">
                <p>2023 @ PT Maju Bersama Kreatif</p>
            </div>
        </div>
    </div>
</body>

</html>

<!-- <h4> mailData['to']</h4>
<h4> mailData['p1']</h4>
<h4> mailData['data1']</h4>
<p >mailData['data2']</p>
<p> mailData['data3']</p>
<p> mailData['data4']</p>
<p> mailData['data5']</p>
<p> mailData['data6']</p>
<h4> mailData['p2']</h4>
<h4> mailData['p3'] </h4>
<h2> mailData['link'] </h2> -->



<!-- <h4>{{ $mailData['to'] }}</h4>
<h4>{{$mailData['p1'] }}</h4>
<h4>{{ $mailData['data1'] }}</h4>
<p>{{ $mailData['data2'] }}</p>
<p>{{ $mailData['data3'] }}</p>
<p>{{ $mailData['data4'] }}</p>
<p>{{ $mailData['data5'] }}</p>
<p>{{ $mailData['data6'] }}</p>
<h4>{{ $mailData['p2'] }}</h4>
<h4>{{ $mailData['p3'] }}</h4>
<h2>{{ $mailData['link'] }}</h2> -->