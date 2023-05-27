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
        Schema::create('ticket_discounts', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedInteger('stock');
            $table->unsignedInteger('amount');
            $table->enum('type', ['percentage', 'fixed']);
            $table->unsignedInteger('minimum_buy');
            $table->foreignId('ticket_type_id')->constrained()->onDelete('cascade')->onUpdate('cascade');
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
        Schema::dropIfExists('ticket_discounts');
    }
};
