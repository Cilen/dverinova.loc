<?php

namespace App\Helpers;
use Illuminate\Support\Facades\Mail;

class SendMail
{
    public function orderMail($userName, $phone, $idProduct, $category, $totalPrice){
        $time = date('d-m-Y H:i:s');
        Mail::send('emails.order', array('userName' => $userName, 'phone' => $phone, 'idProduct' => $idProduct, 'category' => $category, 'time' => $time, 'totalPrice' => $totalPrice), function($message)
        {
            $message->from('emails@dveri.loc', 'Robot')->subject('Нове замовлення');
            $message->to(env('MAIL_RECIPIENT'));
        });
    }

    //Зворотній звязок
    public function feedbackMail($userName, $phone){
        $time = date('d-m-Y H:i:s');
        Mail::send('emails.feedback', array('userName' => $userName, 'phone' => $phone, 'time' => $time), function($message)
        {
            $message->from('emails@dveri.loc', 'Robot')->subject('Зворотній зв\'язок');
            $message->to(env('MAIL_RECIPIENT'));
        });
    }
}