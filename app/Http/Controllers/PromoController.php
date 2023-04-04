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

        
        $tickets_stock_left = Promo::orderBy('id', 'desc')->get()->pluck('stocks');
        // if ($tickets_stock_left != 0)
        // {
        //     $all_promo = Promo::orderBy('id', 'desc')->get();
        // }else{
        //     return 'Tiket abis';
        // }
        
        return view('formulir.pendaftaran', compact('all_promo'));
        // return Inertia::render('Admin/User/Show', [
        //     'user' => $user,
        // ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
        return redirect('/db-instruktur-profil-instruktur');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        // return Inertia::render('Admin/Event/EventPromo/Show', [
        //     'promo' => [
        //         'id' => 1,
        //         'name' => 'Promo 1',
        //         'event' => [
        //             'id' => 1,
        //             'name' => 'Event 1',
        //         ],
        //     ]
        // ]);
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
        $action = URL::route('promo.update', ['id' => $id]);
        return view('promo.index', compact('promo'));
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
        return redirect()->back()->with('success', compact('promo'));
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
        // return redirect()->back()->with('success', "Berhasil menghapus instruktur!");
    }
}
