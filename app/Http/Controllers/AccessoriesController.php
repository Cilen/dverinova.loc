<?php

namespace App\Http\Controllers;

use App\Accessories;
use App\Producer;
use App\TypesAccessories;
use Illuminate\Http\Request;

class AccessoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $page['title'] = "Комплектуючі";
        return view('admin.accessories')->with("page", $page);
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
        $id_producer = $request->input('id_producer');
        $id_type_accessories = $request->input('id_type_accessories');
        $name = $request->input('name');
        $price = $request ->input('price');
        $accessories = Producer::find($id_producer)->accessories();
        $accessories = $accessories->create([
            "id_type_accessories" => $id_type_accessories,
            "name" => $name,
            "price" => $price
        ]);
        return $accessories;

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

    }
    public function debug(Request $request){
        $request->merge(["category" => "internalDoor", "id_producer" => 1]);
        $data = $this->getAccessories($request);
        dd($data);
    }

    public function getAccessories(Request $request){
        $category = $request->input('category');
        $id_producer = $request->input('id_producer');
        $types = TypesAccessories::where('category', $category)
            ->get()->sortBy('id_type_accessories')->toArray();
        $accessories = Producer::find($id_producer)->accessories()->get()->groupBy('id_type_accessories')->toArray();
        $keys = array_column($types, 'id_type_accessories');
        foreach ($keys as $key){
            $empty_accesoories = array(
                'id_producer' => $id_producer,
                'id_type_accessories' => $key
            );
            if (isset($accessories[$key])) {
                array_push($accessories[$key], $empty_accesoories);
            } else {
                $accessories += array($key => array($empty_accesoories));
            }
        }
        return ['types' => $types, 'accessories' => $accessories];
    }
    //    Отримати типи комплектуючих конкретної категорії
    public function getTypeAccessoriesByCategory ($category){
        $data = TypesAccessories::where('category', $category)
            ->orderBy('full_name', 'desc')
            ->get();
        return $data;
    }
    public function getAccessoriesByProducer($id_producer){
        $data = Producer::find($id_producer)->accessories()->get()->groupBy('id_type_accessories');
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
        return "edit";
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
        $price = $request->input('price');
        $name = $request->input('name');
        $accessories = Accessories::find($id);
        $accessories->price = $price;
        $accessories->name = $name;
        $accessories->save();
        return $accessories;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Accessories::find($id)->forceDelete();
        return "OtherData was removed";
    }
}
