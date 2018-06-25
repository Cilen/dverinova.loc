<?php

namespace App\Http\Controllers;


use App\Http\Requests\ProductRequest;
use App\Http\Requests\ProductUpdateRequest;
use App\InternalDoor;
use App\OtherData;
use App\Product;
use App\ProdImage;
use App\TypesAccessories;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    //Перегляд всіх товарів в Адмін-таблиці
    public function index()
    {
        $data = Product::with('producer')->get();
        foreach ($data as $row){
            $row->category_loc = trans("localization.".$row->category);
            $row->producer_name = $row->producer->producer;
        };
        $page['title'] = "Переглянути всі товари";
        return view('admin.show-products')->with(['data' => $data, 'page' => $page]);
    }
    // Головна сторінка сайту
    public function main(){
        $top = Product::where('top', '1')->get()->toArray();
        return view('main')->with(['top' => $top]);
    }
    //Отримати товари конкретної категорії
    public function getCategory($category, $type = null){
        if ($type){
            $data = InternalDoor::where('type', $type)->with('product')->get()->toArray();
            $data = array_pluck($data, 'product');
            $page['title'] = $type;

        } else {
            $data = Product::where('category', $category)->get()->toArray();
            $page['title'] = $category;
        }
        return view('category')->with(['data' => $data, 'page' => $page]) ;
    }
    //Форма створення нового продукту
    public function create()
    {
        $page['title'] = "Додати новий товар";
        $data = array();
        return view('admin.add-product')->with(["data" => $data, "page" => $page]);
    }
    //Отримання даних з форми і створення моделі
    public function store(ProductRequest $request)
    {
        $product = Product::create([
            'name' => e($request->input('name')),
            'category' => $request->input('category'),
            'availability' => $request->input('availability'),
            'price' => $request->input('price'),
            'description' => $request->input('description'),
            'id_producer' => $request->input('id_producer'),
            'top' => 0
        ]);
        switch ($request->input('category')) {
            case 'internalDoor':
                $product->internalDoor()->create([
                    'type' => $request->input('type'),
                    'height' => $request->input('height'),
                    'size_60' => $request->input('size_60'),
                    'size_70' => $request->input('size_70'),
                    'size_80' => $request->input('size_80'),
                    'size_90' => $request->input('size_90'),
                ]);
                break;

            case 'externalDoor';
                $product->externalDoor()->create([
                    'height' => $request->input('height'),
                    'width' => $request->input('width')
                ]);
                break;
            case 'laminate':
                $product->laminate()->create([
                    'number_in_package' => $request->input('number_in_package'),
                    'total_area' => $request->input('total_area'),
                    'length' => $request->input('length'),
                    'width' => $request->input('width'),
                    'thickness' => $request->input('thickness'),
                ]);
                break;
            case 'tile':
                $product->tile()->create([
                    'number_in_package' => $request->input('number_in_package'),
                    'total_area' => $request->input('total_area'),
                    'length' => $request->input('length'),
                    'width' => $request->input('width'),
                    'thickness' => $request->input('thickness'),
                ]);
                break;
            default:
                return 'Error: Unknown category';
        }
        $numberOtherData = $request->input('numberOtherData');
        for($i = 0; $i < $numberOtherData; $i++) {
            $name = $request->input('otherDataName_'.$i);
            $value = $request->input('otherDataValue_'.$i);
            if ($name != null && $value != null) {
                $product->otherData()->create([
                    'name' => $name,
                    'value' => $value,
                ]);
            };
        }
        return redirect('admin/product/'.$product->id_product.'/edit');
    }
    //Сторінка конкретного продукту
    public function getItem(Request $request)
    {
        $accessories = array();
        $idProduct = $request->route('idProduct');
        $category = $request->route('category');
        $product = Product::find($idProduct);
        $model = $product->$category()->first()->toArray();
        $producer = $product->producer()->select('id_producer','producer')->first();
        $otherData = array();
        $otherData = $product -> otherData()->select('id_data','name', 'value')->get()->toArray();
        $typesAccessories = TypesAccessories::where('category', $category)->select('id_type_accessories','name', 'full_name')->get()->toArray();
        $accessoriesList = $producer->accessories()->select('id_accessories', 'id_type_accessories','name', 'price')->get()->groupBy('id_type_accessories')->toArray();
        $accessories = array();
        if (isset($accessoriesList)) {
            foreach ($typesAccessories as $type){
                $accessories[$type['name']] = $type;
                if(isset($accessoriesList[$type['id_type_accessories']])) {
                    $accessories[$type['name']]['data'] = $accessoriesList[$type['id_type_accessories']];
                }
            };
        }else{
            $accessories = array();
        }
        $data = array_merge(
            $product->toArray(),
            $model, $producer->toArray(),
            ["accessories" => $accessories],
            ["otherData" => $otherData]
        );
        $data['description'] = explode("\r\n", $data['description']);
        $images = ProdImage::where('id_product', $idProduct)->get()->toArray();
        return view('item')->with(['data' => $data, 'images' => $images]);
    }
    //Форма редагування даних товару
    public function edit($id)
    {
        $product = Product::find($id);
        if ($product == null) return abort(404);
        $category = $product->category;
        $model = $product->$category()->first()->toArray();
        $producer = $product -> producer()->first()->toArray();
        $otherData = $product -> otherData()->select('id_data','name', 'value')->get()->toArray();
        $product = $product->toArray();
        $otherData = array('otherData' => $otherData);
        $data = array_merge($product, $model, $producer, $otherData);
        $page['title'] = 'Редагувати товар';
        $data['update'] = true;
        $data['otherData'][] = array("name" => "", "value" => "");
        $data['numberOtherData'] = count($data['otherData']);
        return view('admin.add-product')->with(['data' => $data, 'page' => $page]);
    }
    //Виконати редагування даних за допомогою форми редагування даних
    public function update(ProductRequest $request, $id)
    {
        $product = Product::find($id);
        $product->update([
            'name' => $request->input('name'),
            'category' => $request->input('category'),
            'availability' => $request->input('availability'),
            'price' => $request->input('price'),
            'description' => $request->input('description'),
            'id_producer' => $request->input('id_producer'),
        ]);
        switch ($request->input('category')) {
            case 'internalDoor':
                $product->internalDoor()->update([
                    'type' => $request->input('type'),
                    'height' => $request->input('height'),
                    'size_60' => $request->input('size_60'),
                    'size_70' => $request->input('size_70'),
                    'size_80' => $request->input('size_80'),
                    'size_90' => $request->input('size_90'),
                ]);
                break;

            case 'externalDoor';
                $product->externalDoor()->update([
                    'height' => $request->input('height'),
                    'width' => $request->input('width'),
                ]);
                break;
            case 'laminate':
                $product->laminate()->update([
                    'number_in_package' => $request->input('number_in_package'),
                    'total_area' => $request->input('total_area'),
                    'length' => $request->input('length'),
                    'width' => $request->input('width'),
                    'thickness' => $request->input('thickness'),
                ]);
                break;
            case 'tile':
                $product->tile()->update([
                    'number_in_package' => $request->input('number_in_package'),
                    'total_area' => $request->input('total_area'),
                    'length' => $request->input('length'),
                    'width' => $request->input('width'),
                    'thickness' => $request->input('thickness'),
                ]);
                break;
            default:
                return 'Error: Unknown category';
        }
        $numberOtherData = $request->input('numberOtherData');
        for($i = 0; $i < $numberOtherData; $i++) {
            $id_data = $request->input('id_data_'.$i);
            $name = $request->input('otherDataName_'.$i);
            $value = $request->input('otherDataValue_'.$i);
            if ($name != null && !empty($id_data)) {
                $product->otherData()->where('id_data', $id_data)->update([
                    'name' => $name,
                    'value' => $value,
                ]);
            } elseif ($name != null) {
                $product->otherData()->create([
                    'name' => $name,
                    'value' => $value,
                ]);
            } elseif (empty($name) && !empty($id_data)) {
                $this->removeOtherData($id_data);
            };
        }
        return redirect()->action('ProductController@edit', ['id' => $id]);
    }
    //Виконати редагування даних за допомогою таблиці
    public function updateAjaxData(ProductUpdateRequest $request)
    {
        Product::find($request->input('id_product'))->update($request->all());
        $answer = Product::find($request->input('id_product'));
        return  json_encode($answer);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        ImageController::deleteId($id);
        Product::find($id)->forceDelete();
        return redirect()->action('ProductController@index');
    }
    public function removeOtherData($id_data){
        OtherData::find($id_data)->forceDelete();
        return "OtherData was removed";
    }
}
