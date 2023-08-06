<!DOCTYPE html>
<html>

<head>
    <title>LoketMBC.com - SmileFest2023</title>

</head>
<style>
    html,
    body {
        margin: 0 auto !important;
        padding: 0 !important;
        height: 100% !important;
        width: 100% !important;
        background-color: rgb(75 85 99 / var(--tw-bg-opacity));
    }

    .div-satu {
        display: flex;
        justify-content: center;
        --tw-bg-opacity: 1;
        padding-left: 6rem;
        padding-right: 6rem;
        padding-top: 2.5rem;
        padding-bottom: 2.5rem;
        height: 100vh;
        background-color: rgb(75 85 99 / var(--tw-bg-opacity));
    }

    .div-dua {
        --tw-bg-opacity: 1;
        background-color: rgb(255 255 255 / var(--tw-bg-opacity));
        border-radius: 0.5rem;
        border-radius: 0.5rem;
        max-width: 80rem;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
        padding: 1.25rem;
    }

    .div-tiga {
        display: flex;
        justify-content: center;
        padding: 0.75rem;
        background-color: rgb(107 114 128 / var(--tw-bg-opacity));
    }

    .img-satu {
        --tw-bg-opacity: 1;
        padding: 0.75rem;
        border-radius: 0.5rem;
        width: 10rem;
    }

    .mt-5 {
        margin-top: 1.25rem
            /* 20px */
        ;
    }

    .text-md {
        font-size: 1rem;
        /* 16px */
        line-height: 1.5rem;
        /* 24px */
    }

    .div-empat {
        --tw-border-opacity: 1;
        border-top-color: rgb(23 23 23 / var(--tw-border-opacity));
        border-bottom-color: rgb(23 23 23 / var(--tw-border-opacity));
        border-top-style: solid;
        border-bottom-style: solid;
        border-width: 1px;
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
    }

    .table {
        width: 100%;
        table-layout: auto;
    }

    .div-lima {
        display: flex;
        justify-content: center;
        margin-left: 0.75rem;
        margin-right: 0.75rem;
    }
</style>

<body>
    <div class="div-satu">
        <div class="div-dua">
            <div class="div-tiga">
                <img src="https://loketmbc.com/assets/images/MBC_HD.jpg"
                    style="width: 10rem; height: 3.5rem; margin-left: 0.75rem;margin-right: 0.75rem;" />
            </div>

            <div class="text-md mt-5">
                Selamat, pembayaran tiketmu telah berhasil!, berikut data detail untuk tiketmu yang dapat di-redeem
                ketika
                konser akan berlangsung.
            </div>
            <div class="text-md mt-5">
                <a href="{{asset('storage/barcode_ticket/'.$mailData['id_tiket'].'.jpg')}}">Klik disini untuk melihat
                    barcode tiketmu.</a>
            </div>

            <div class="div-empat">
                <div>
                    <table style="width: 100%;table-layout: auto;">
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
                            <td class="text-md">Status Pembayaran</td>
                            <td class="text-md px-3">:</td>
                            <td class="text-md">{{$mailData['status_pembayaran']}}</td>
                        </tr>
                    </table>
                </div>

            </div>
            <div class="div-lima">
                <!-- nanti gambar barcodenya ditaro disini ya , ganti aja tag SVGnya-->
                <img src="http://loketmbc.com/storage/barcode_ticket/2202367943223.jpg" height="75" />
            </div>
            <div class="div-lima">
                <p>2023 @ PT Maju Bersama Kreatif</p>
            </div>
        </div>
    </div>
</body>

</html>
