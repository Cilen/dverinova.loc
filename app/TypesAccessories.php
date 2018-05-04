<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TypesAccessories extends Model
{
    protected $primaryKey = 'id_type_accessories';
    protected $fillable = ['category', 'name'];
    public $timestamps = false;
    public function accessories(){
        return $this->hasMany('App\Accessories', 'id_type_accessories');
    }
}
