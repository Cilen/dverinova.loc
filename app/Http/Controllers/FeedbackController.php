<?php

namespace App\Http\Controllers;

use App\Feedback;
use App\Http\Requests\FeedbackRequest;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{
    //Переглянути всі нові замовлення в Адмін-таблиці
    public function index()
    {
        $data = Feedback::where('viewed', '0')->with('product')->orderBy('id_feedback', 'asc')->get();
        return view('admin.feedback')->with('data', $data);
    }

    //Переглянути старі замовлення в Адмін-таблиці
    public function oldFeedback()
    {
        $data = Feedback::where('viewed', '1')->with('product')->orderBy('id_feedback', 'desc')->get();
        return view('admin.feedback')->with('data', $data);
    }
    //Редагувати дані за допомогою Адмін-таблиці
    public function update (FeedbackUpdateRequest $request, $idFeedback)
    {
        if ($idFeedback != $request->input('id_feedback')) return false;
        $viewed = $request->input('viewed');
        Feedback::find($idFeedback)->update(['viewed' => $viewed]);
        $answer = Feedback::find($idFeedback);
        return  json_encode($answer);
    }
    //Видалити дані за допомогою Адмін-таблиці
    public function delete ()
    {

    }
    //Отримання даних з форми (за допомогою AJAX запиту) і створення моделі
    public function story (FeedbackRequest $request)
    {
        $idProduct = $request->input('idProduct');
        $userName = $request->input('userName');
        $phone = $request->input('phone') ;
        $feedback = Feedback::create([
            'id_product' => $idProduct,
            'user_name' => $userName,
            'phone' => $phone,
            'viewed' => 0
        ]);
        return "Success";
    }
}
