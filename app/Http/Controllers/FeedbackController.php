<?php

namespace App\Http\Controllers;

use App\Feedback;
use App\Http\Requests\FeedbackRequest;
use Illuminate\Http\Request;
use App\Helpers\SendMail;

class FeedbackController extends Controller
{
    //Переглянути всі нові замовлення в Адмін-таблиці
    public function index()
    {
        $data = Feedback::where('viewed', '0')->orderBy('id_feedback', 'asc')->get();
        $page['title'] = 'Зворотній зв\'язок: нові запити';
        return view('admin.feedback')->with(['data' => $data, 'page' => $page]);
    }

    //Переглянути старі замовлення в Адмін-таблиці
    public function oldFeedback()
    {
        $data = Feedback::where('viewed', '1')->orderBy('id_feedback', 'desc')->get();
        $page['title'] = 'Зворотній зв\'язок: оброблені запити';
        return view('admin.feedback')->with(['data' => $data, 'page' => $page]);
    }
    //Редагувати дані за допомогою Адмін-таблиці
    public function update (Request $request, $idFeedback)
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
    //Отримання даних з форми (за допомогою AJAX запиту), створення моделі і відправка повідомлення на пошту
    public function story (FeedbackRequest $request, SendMail $mail)
    {
        $userName = $request->input('userName');
        $phone = str_replace_first("+380", "0", $request->input('phone')) ;
        $feedback = Feedback::create([
            'user_name' => $userName,
            'phone' => $phone,
            'viewed' => 0
        ]);
        $mail->feedbackMail($userName, $phone);
        return "Success";
    }
}
