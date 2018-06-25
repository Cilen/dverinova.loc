<?php

namespace App\Http\Controllers;

use App\Producer;
use Illuminate\Http\Request;

class ProducerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Producer::all();
        $page['title'] = "Виробники";
        return view('admin.producers')->with(['data' => $data, 'page' => $page]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        echo "999";
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $producer = Producer::create([
            'producer' => $request->input('producer'),
            'category' => $request->input('category')
        ]);
        $data = Producer::all();
        return $data;
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
    }
    //    Отримати виробників конкретної категорії
    public function getProducersFromCategory ($category){
        $data = Producer::where('category', $category)
            ->orderBy('producer', 'desc')
            ->get();
        return $data;
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
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id, Request $request)
    {
        $deleteWithProducts = $request->input('deleteWithProducts');
        if ($deleteWithProducts){
            $deleteRows = Producer::find($id)->product();
            $deleteRows -> delete();
        };
        Producer::find($id)->forceDelete();
        $data = Producer::all();
        return $data;
    }
}
