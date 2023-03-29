<?php

namespace App\Http\Controllers;

use App\Models\Research\ResearchType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ResearchTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $research_types = ResearchType::all();
        return Inertia::render('Admin/ResearchType/Index', [
            'research_types' => $research_types
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
        return Inertia::render('Admin/ResearchType/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
        ]);
        ResearchType::create($request->all());
        return redirect()->route('research-type.index')->with('success', 'Research Type created successfully.');
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
        $research_type = ResearchType::with('researches')->find($id);
        return Inertia::render('Admin/ResearchType/Show', [
            'research_type' => $research_type
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
        //
        $research_type = ResearchType::findOrFail($id);
        return Inertia::render('Admin/ResearchType/Edit', [
            'research_type' => $research_type
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
        //
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
        ]);
        $research_type = ResearchType::findOrFail($id);
        $research_type->update($request->all());
        return redirect()->route('research-type.index')->with('success', 'Research Type updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $research_type = ResearchType::findOrFail($id);
        $research_type->delete();
        return redirect()->route('research-type.index')->with('success', 'Research Type deleted successfully.');
    }
}
