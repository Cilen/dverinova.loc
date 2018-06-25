<?php

namespace App\Http\Controllers;

use App\Helpers\SendMail;
use App\Http\Requests\OrderUpdateRequest;
use App\Http\Requests\OrderRequest;
use App\Order;
use App\TypesAccessories;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    //Переглянути всі нові замовлення в Адмін-таблиці
    public function index()
    {
        $data = Order::where('viewed', '0')->with('product')->orderBy('id_order', 'asc')->get();
        $page['title'] = 'Нові замовлення';
        return view('admin.orders')->with(['data' => $data, 'page' => $page]);
    }
    //Переглянути детально конкретне замовлення
    public function show($idOrder){
        $data = Order::find($idOrder);
        $data['product'] = $data->product()->first();
        $data['accessories'] = json_decode($data['accessories']);
        foreach ($data['accessories'] as $accessory){
            if (isset($accessory->id_type_accessories)){
                $accessory->type_accessories = TypesAccessories::where('id_type_accessories', $accessory->id_type_accessories)->value('full_name');
            }
        }
        $data->category_loc = trans("localization.".$data->product->category);
        $page['title'] = "Замовлення №".$data->id_order;
        return view('admin.order-details')->with(['data' => $data, 'page' => $page]) ;
    }

    //Переглянути старі замовлення в Адмін-таблиці
    public function oldOrders()
    {
        $page['title']="Оброблені замовлення";
        $data = Order::where('viewed', '1')->with('product')->orderBy('id_order', 'desc')->get();
        return view('admin.orders')->with(['data' => $data, 'page' => $page]);
    }
    //Редагувати дані за допомогою Адмін-таблиці
    public function update (OrderUpdateRequest $request, $idOrder)
    {
        if ($idOrder != $request->input('id_order')) return false;
        $viewed = $request->input('viewed');
        Order::find($idOrder)->update(['viewed' => $viewed]);
        $answer = Order::find($idOrder);
        return  json_encode($answer);
    }
    //Видалити дані за допомогою Адмін-таблиці
    public function delete ()
    {

    }
    //Отримання даних з форми (за допомогою AJAX запиту) і створення моделі
    public function story (OrderRequest $request, SendMail $mail)
    {
        $idProduct = $request->input('idProduct');
        $userName = $request->input('userName');
        $phone = str_replace_first("+380", "0", $request->input('phone')) ;
        $category = $request->input('category');
        $accessories = $request->input('accessories');
        $parameters = $request->input('parameters');
        $totalPrice = intval($request->input('totalPrice'));
        $order = Order::create([
            'id_product' => $idProduct,
            'user_name' => $userName,
            'phone' => $phone,
            'viewed' => 0,
            'accessories' => $accessories,
            'parameters' => $parameters,
            'total_price' => $totalPrice
        ]);
        $mail->orderMail($userName, $phone, $idProduct, $category, $totalPrice);
        return "Success";
    }


}
