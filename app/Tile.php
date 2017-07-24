<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tile extends Model
{
    protected $primaryKey = 'id_product';
    public $incrementing = false;
    protected $fillable = ['number_in_package','total_area','length','width','thickness'];
    public function product()
    {
        return $this->belongsTo('App\Product','id_product');
    }
}
