<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resep_m extends Model
{
    use HasFactory;

    protected $table = 'resep';
    protected $primaryKey = 'resep_id';
}
