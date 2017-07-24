<?php

Route::get('/', 'ProductController@main')->name('main');
Route::get('category/{category}', 'ProductController@getCategory')->name('category');
Route::get('category/{category}/type/{type}', 'ProductController@getCategory')->name('type');
Route::get('category/{category}/{idProduct}', 'ProductController@getItem')->name('item');
Route::get('category/{category}/type/{type}/{idProduct}', 'ProductController@getItem')->name('itemWithType')
    ->where('id', '[0-9]+');

Route::get('contacts', function () {
    return "contacts";
})->name('contacts');

Route::post('neworder', 'OrderController@story')->name('neworder');


Auth::routes();
Route::group(['prefix' => 'admin'], function () {
    Route::get('/', 'HomeController@index');
    Route::post('product/updateAjaxData', 'ProductController@updateAjaxData');
    Route::resource('product', 'ProductController');

    Route::get('orders', 'OrderController@index');
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

