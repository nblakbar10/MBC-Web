<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    // public function up()
    // {
    //     Schema::table('transaction', function (Blueprint $table) {
    //         // $table->integer('promo_id');
    //         $table->integer('promo_id')->nullable();
    //     });
    // }

    // /**
    //  * Reverse the migrations.
    //  *
    //  * @return void
    //  */
    // public function down()
    // {
    //     Schema::table('transaction', function (Blueprint $table) {
    //         $table->dropColumn('promo_id');
    //     });
    // }
    public function up()
    {
        Schema::table('transaction', function (Blueprint $table) {
            // $table->integer('promo_id');
            $table->integer('redeem_amount')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    // public function down()
    // {
    //     Schema::table('transaction', function (Blueprint $table) {
    //         $table->dropColumn('redeem_amount');
    //     });
    // }
};
