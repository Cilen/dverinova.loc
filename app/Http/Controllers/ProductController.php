<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Http\Requests\ProductUpdateRequest;
use App\InternalDoor;
use App\Product;
use App\ProdImage;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    //Дефолтні значення параметру $data
    public $data = array(
        "title" => "",
        "id_product" =>"",
        "update" => false,
        "category" => "",
        "name" => "",
        "availability" => "1",
        "producer" => "",
        "price" => "0",
        "discount" => "0",
        "total_price" => "0",
        "description" => "",
        "type" => "",
        "size_60" => "0",
        "size_70" => "0",
        "size_80" => "0",
        "size_90" => "0",
        "height" => "0",
        "width" => "0",
        "thickness" => "0",
        "lock" => "0",
        "filler" => "",
        "covering" => "",
        "length" => "0",
        "number_in_package" => "0",
        "total_area" => "0",
    );
    //Перегляд всіх товарів в Адмін-таблиці
    public function index()
    {
        $data = Product::all();
        return view('admin.show-products')->with('data', $data);
    }
    // Головна сторінка сайту
    public function main(){
        $top = Product::where('top', '1')->get()->toArray();
        $discount = Product::where('discount', '>', '0')->get()->toArray();
        return view('main')->with(['top' => $top, 'discount' => $discount]);
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

        $data['title'] = 'Додати новий товар';
        return view('admin.add-product')->with("data", $this->data);
    }
    //Отримання даних з форми і створення моделі
    public function store(ProductRequest $request)
    {
        $product = Product::create([
            'name' => $request->input('name'),
            'category' => $request->input('category'),
            'availability' => $request->input('availability'),
            'price' => $request->input('price'),
            'discount' => $request->input('discount'),
            'total_price' => ($request->input('price') * (100 - $request->input('discount') ) / 100 ),
            'description' => $request->input('description'),
            'producer' => $request->input('producer'),
            'top' => 0
        ]);
        switch ($request->input('category')) {
            case 'internalDoor':
                $product->internalDoor()->create([
                    'type' => $request->input('type'),
                    'size_60' => $request->input('size_60'),
                    'size_70' => $request->input('size_70'),
                    'size_80' => $request->input('size_80'),
                    'size_90' => $request->input('size_90'),
                ]);
                break;

            case 'externalDoor';
                $product->externalDoor()->create([
                    'height' => $request->input('height'),
                    'width' => $request->input('width'),
                    'thickness' => $request->input('thickness'),
                    'lock' => $request->input('lock'),
                    'filler' => $request->input('filler'),
                    'covering' => $request->input('covering'),
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
        return redirect('admin/product/'.$product->id_product.'/edit');
    }
    //Сторінка конкретного продукту
    public function getItem(Request $request)
    {
        $idProduct = $request->route('idProduct');
        $category = $request->route('category');
        $type = $request->route('type');
        $product = Product::find($idProduct);
        $model = $product->$category()->first()->toArray();
        $product = $product->toArray();
        $data = array_replace($this->data, $product, $model);
        $images = ProdImage::where('id_product', $idProduct)->get()->toArray();
        return view('item')->with(['data' => $data, 'images' => $images]);
    }
    //Форма редагування даних товару
    public function edit($id)
    {
        $product = Product::find($id);
        $category = $product->category;
        $model = $product->$category()->first()->toArray();
        $product = $product->toArray();
        $data = array_replace($this->data, $product, $model);
        $data['title'] = 'Редагувати товар';
        $data['update'] = true;
        return view('admin.add-product')->with("data", $data);
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
            'discount' => $request->input('discount'),
            'total_price' => ($request->input('price') * (100 - $request->input('discount') ) / 100 ),
            'description' => $request->input('description'),
            'producer' => $request->input('producer'),
        ]);
        switch ($request->input('category')) {
            case 'internalDoor':
                $product->internalDoor()->update([
                    'type' => $request->input('type'),
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
                    'thickness' => $request->input('thickness'),
                    'lock' => $request->input('lock'),
                    'filler' => $request->input('filler'),
                    'covering' => $request->input('covering'),
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
}
