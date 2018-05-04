<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Producer extends Model
{
    protected $primaryKey = 'id_producer';
    protected $fillable = ['category','producer'];
    public $timestamps = false;

    public function product(){
        return $this->hasMany('App\Product', 'id_producer', 'id_producer');
    }

    public function accessories(){
        return $this->hasMany('App\Accessories', 'id_producer');
    }
}
