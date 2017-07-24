<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $primaryKey = 'id_product';
    protected $fillable = ['name','category','availability', 'top', 'price','description','producer','discount','total_price'];

    public function internalDoor(){
        return $this->hasOne('App\InternalDoor', 'id_product');
    }

    public function externalDoor(){
        return $this->hasOne('App\ExternalDoor', 'id_product');
    }

    public function laminate(){
        return $this->hasOne('App\Laminate', 'id_product');
    }

    public function tile(){
        return $this->hasOne('App\Tile', 'id_product');
    }
    public function prodImage(){
        return $this->hasMany('App\ProdImage', 'id_product');
    }
    public function order(){
        return $this->hasMany('App\Order', 'id_product');
    }
}
