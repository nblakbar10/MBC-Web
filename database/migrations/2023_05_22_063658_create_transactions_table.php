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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('phone_number');
            $table->unsignedInteger('ticket_amount');
            $table->unsignedDouble('total_price');
            $table->unsignedDouble('base_price');
            $table->foreignId('ticket_type_id')->constrained()->onDelete('cascade')->onUpdate('cascade');
            $table->dateTime('buy_date');
            $table->string('pay_date')->nullable();
            $table->string('city');
            $table->string('payment_method');
            $table->string('payment_status');
            $table->string('payment_link');
            $table->string('external_id'); 
            $table->string('ticket_id');
            $table->string('ticket_status');
            $table->string('ticket_barcode_url');
            $table->unsignedInteger('redeemed_amount');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transactions');
    }
};
