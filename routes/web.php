<?php

Route::get('/', 'ProductController@main')->name('main');
Route::get('category/{category}', 'ProductController@getCategory')->name('category');
Route::get('category/{category}/type/{type}', 'ProductController@getCategory')->name('type');
Route::get('category/{category}/{idProduct}', 'ProductController@getItem')->name('item');
Route::get('category/{category}/type/{type}/{idProduct}', 'ProductController@getItem')->name('itemWithType')
    ->where('id', '[0-9]+');

Route::get('contacts', function () {
    return view('contacts');
})->name('contacts');

Route::post('neworder', 'OrderController@story')->name('neworder');
Route::post('newfeedback', 'FeedbackController@story')->name('newfeedback');


Auth::routes();
Route::group(['prefix' => 'admin'], function () {
    Route::get('/', 'HomeController@index');

    Route::post('product/updateAjaxData', 'ProductController@updateAjaxData');
    Route::get('product/remove-other-data/{id_data}', 'ProductController@removeOtherData');
    Route::resource('product', 'ProductController');

    Route::get('accessories/debug', 'AccessoriesController@debug');
    Route::post('accessories/get-accessories', 'AccessoriesController@getAccessories');
    Route::get('accessories/producer/{id_producer}', 'AccessoriesController@getAccessoriesByProducer');
    Route::resource('accessories', 'AccessoriesController');

    Route::get('producers/{category}', 'ProducerController@getProducersFromCategory');
    Route::resource('producers', 'ProducerController');

    Route::get('orders', 'OrderController@index');
    Route::get('orders/{idOrder}', 'OrderController@show');
    Route::patch('orders/{idOrder}', 'OrderController@update');
    Route::get('oldOrders', 'OrderController@oldOrders');

    Route::get('feedback', 'FeedbackController@index');
    Route::patch('feedback/{idFeedback}', 'FeedbackController@update');
    Route::get('oldFeedback', 'FeedbackController@oldFeedback');

    Route::post('images/uploads', 'ImageController@uploads');
    Route::delete('images/delete', 'ImageController@delete');
    Route::get('images/get', 'ImageController@getInitialFiles');
    Route::post('images/logo', 'ImageController@setLogo');

});
