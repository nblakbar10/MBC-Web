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
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->string('external_id');
            $table->string('ticket_id');
            $table->string('ticket_name');
            $table->string('email');
            $table->string('phone_number');
            $table->string('payment_method');
            $table->integer('ticket_qty');
            $table->string('ticket_category');
            $table->string('ticket_status');
            $table->string('ticket_barcode')->nullable();
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
        Schema::dropIfExists('tickets');
    }
};
