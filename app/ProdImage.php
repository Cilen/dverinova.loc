<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProdImage extends Model
{
    protected $primaryKey = 'id_image';
    protected $fillable = ['id_product', 'uuid'];
    public function product()
    {
        return $this->belongsTo('App\Product','id_product', 'id_product');
    }

}