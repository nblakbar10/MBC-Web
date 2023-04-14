<?php

namespace App\Http\Controllers;

use App\Models\Discount;
use App\Models\Transaction;
use App\Models\Ticket;
use App\Models\Promo;
use Illuminate\Http\Request;
use Inertia\Inertia;


class DiscountController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //list all tiket
        $discounts = Discount::all();
        return Inertia::render('Admin/Discount/Index', [
            'discounts' => $discounts,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        $promos = Promo::all();
        return Inertia::render('Admin/Discount/Create', [
            'promos' => $promos,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Discount::create([
            'promo_id' => $request->promo_id,
            'name' => $request->name,
            'minimum_order' => $request->minimum_order,
            'type' => $request->type,
            'deduction' => $request->deduction,
            'quota' => $request->quota
        ]);
        return redirect()->route('discount.index')->banner('New discount Created Successfully'); 
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Discount  $discount
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $discount = Discount::find($id);
        return Inertia::render('Admin/Discount/Show', [
            'discount' => $discount,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Discount  $discount
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $discount = Discount::find($id);
        $promos = Promo::all();
        return Inertia::render('Admin/Discount/Edit', [
            'discount' => $discount,
            'promos' => $promos,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Discount  $discount
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $discount = Discount::where('id', $id)->first();
        $discount->update([
            'promo_id' => $request->promo_id,
            'name' => $request->name,
            'minimum_order' => $request->minimum_order,
            'type' => $request->type,
            'deduction' => $request->deduction,
            'quota' => $request->quota
        ]);
        return redirect()->route('discount.index')->banner('Discount Updated Successfully');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Discount  $discount
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $discount = Discount::find($id);
        $discount->delete();
        return redirect()->route('discount.index')->banner('Discount Deleted Successfully');
    }

    // public function check_discount(Request $request)
    // {
    //     $check_discount = 
    // }
}
