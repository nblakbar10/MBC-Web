<?php

namespace Database\Factories;

use App\Models\Transaction;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            "ticket_type_id" => $this->faker->numberBetween(1, 3),
            "name" => $this->faker->name(),
            "email" => $this->faker->unique()->safeEmail(),
            "phone_number" => $this->faker->phoneNumber(),
            "ticket_amount" => $this->faker->numberBetween(1, 5),
            "total_price" => $this->faker->numberBetween(10000, 5000000),
            "base_price" => $this->faker->numberBetween(10000, 5000000),
            "city" => $this->faker->city(),
            "buy_date" => $this->faker->dateTimeBetween('-10 days', 'now'),
            "pay_date" => $this->faker->dateTimeBetween('-10 days', 'now'),
            "payment_method" => $this->faker->randomElement(['Transfer Bank (VA)', 'QRIS', 'DANA']),
            "payment_status" => $this->faker->randomElement(['PAID', 'PENDING', 'EXPIRED']),
            "payment_link" => $this->faker->url(),
            "external_id" => $this->faker->uuid(),
            "ticket_id" => '',
            "ticket_status" => 'WAITING FOR PAYMENTS',
            "ticket_barcode_url" => '',
            "redeemed_amount" => 0,
        ];
    }
}
