<?php

namespace App\Http\Controllers;

use App\Helpers\SendMail;
use App\Http\Requests\OrderUpdateRequest;
use App\Http\Requests\OrderRequest;
use App\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    //Переглянути всі нові замовлення в Адмін-таблиці
    public function index()
    {
        $data = Order::where('viewed', '0')->with('product')->orderBy('id_order', 'asc')->get();
        return view('admin.orders')->with('data', $data);
    }

    //Переглянути старі замовлення в Адмін-таблиці
    public function oldOrders()
    {
        $data = Order::where('viewed', '1')->with('product')->orderBy('id_order', 'desc')->get();
        return view('admin.orders')->with('data', $data);
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
        $phone = $request->input('phone');
        $category = $request->input('category');
        $order = Order::create([
            'id_product' => $idProduct,
            'user_name' => $userName,
            'phone' => $phone,
            'viewed' => 0
        ]);
        $mail->orderMail($userName, $phone, $idProduct, $category);
        return "Success";
    }


}
