<body>
<p>Нове замовлення</p><br>
<p>Ім'я: <b>{{$userName}}</b></p>
<p>Номер телефону: <b>{{$phone}}</b></p>
<p>Товар: <a href="{{env('APP_URL')}}/category/{{$category}}/{{$idProduct}}">ссилка</a></p>
<p>Ціна комплекту: <b>{{$totalPrice}}</b> грн.</p>
<p>---------------------------------------------------</p>
<p>{{$time}}</p>
</body>