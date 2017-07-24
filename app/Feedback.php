<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    protected $primaryKey = 'id_feedback';
    protected $fillable = ['user_name','phone', 'viewed'];
}
