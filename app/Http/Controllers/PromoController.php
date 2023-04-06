<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Promo;
use Illuminate\Support\Facades\URL;

class PromoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $all_promo = Promo::orderBy('id', 'desc')->get();

        // dd($all_promo->pluck('stocks'));
        // if ($all_promo->pluck('stocks') == 0){
        //     return 'Tiket dah abis';
        // }

        // $tickets_stock_left = Promo::orderBy('id', 'desc')->get()->pluck('stocks');
        // if ($tickets_stock_left != 0)
        // {
        //     $all_promo = Promo::orderBy('id', 'desc')->get();
        // }else{
        //     return 'Tiket abis';
        // }
        
        return Inertia::render('Admin/Event/Promo/Index', [
            'promos' => $all_promo,
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
        return Inertia::render('Admin/Event/Promo/Create', [
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
        $promo = Promo::create([
            'promo_name' => $request->promo_name,
            'stocks' => $request->stocks,
            'description' => $request->description,
            'price' => $request->price,
        ]);
        $promo->save();
        return redirect()->route('promo.index')->banner('New Promo Created Successfully');    
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $promo = Promo::find($id);
        return Inertia::render('Admin/Event/Promo/Show', [
            'promo' => $promo,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {

        $promo = Promo::find($id);
        return Inertia::render('Admin/Event/Promo/Edit', [
            'promo' => $promo,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $promo = Promo::where('id', $id)->first();
        $promo->update([
            'promo_name' => $request->promo_name,
            'stocks' => $request->stocks,
            'description' => $request->description,
            'price' => $request->price,
        ]);
        return redirect()->route('promo.index')->banner('Promo Updated Successfully');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $promo = Promo::where('id', $id)->first();
        $promo->delete();
        return redirect()->route('promo.index')->banner('Promo Deleted Successfully');    
    }
}
