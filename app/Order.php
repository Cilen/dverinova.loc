<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $primaryKey = 'id_order';
    protected $fillable = ['id_product','user_name','phone', 'viewed'];

    public function product()
    {
        return $this->belongsTo('App\Product','id_product');
    }

}
