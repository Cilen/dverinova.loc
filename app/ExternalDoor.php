<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ExternalDoor extends Model
{
    protected $primaryKey = 'id_product';
    public $incrementing = false;
    protected $fillable = ['height','width'];
    public function product()
    {
        return $this->belongsTo('App\Product','id_product');
    }
}
