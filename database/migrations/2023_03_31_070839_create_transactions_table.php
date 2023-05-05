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
    public function up()
    {
        Schema::create('transaction', function (Blueprint $table) {
            $table->id();
            // $table->integer('user_id');
            $table->string('external_id');
            $table->integer('promo_id');
            $table->string('name');
            $table->string('email');
            $table->string('phone_number');
            $table->integer('total_tickets');
            $table->string('tickets_category');
            $table->integer('total_amount');
            $table->string('payment_method');
            $table->string('payment_status');
            $table->string('payment_link');
            $table->string('ticket_id')->nullable();
            $table->string('ticket_status')->nullable();
            $table->string('ticket_barcode')->nullable();
            $table->string('reedem_amount')->nullable();
            $table->timestamps(); //date
            // $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transaction');
    }
};
