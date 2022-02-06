<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resep_detail_m extends Model
{
    use HasFactory;

    protected $table = 'resep_detail';
    protected $primaryKey = 'rd_id';
}
