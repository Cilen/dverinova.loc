<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class InternalDoor extends Model
{
    protected $primaryKey = 'id_product';
    public $incrementing = false;
    protected $fillable = ['type', 'height', 'size_60','size_70','size_80','size_90'];
    public function product()
    {
        return $this->belongsTo('App\Product','id_product');
    }
}
