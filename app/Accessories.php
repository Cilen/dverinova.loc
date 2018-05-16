<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Accessories extends Model
{
    protected $primaryKey = 'id_accessories';
    protected $fillable = ['id_type_accessories','name', 'price'];
    public function producer()
    {
        return $this->belongsTo('App\Producer','id_accessories', 'id_accessories');
    }
    public function typeAccessories()
    {
        return $this->belongsTo('App\typeAccessories','id_accessories', 'id_accessories');
    }
}
