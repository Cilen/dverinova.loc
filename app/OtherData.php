<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OtherData extends Model
{
    protected $primaryKey = 'id_data';
    protected $fillable = ['name', 'value'];
    public function product (){
        return $this->belongsTo('App\Product','id_product');
    }
}
