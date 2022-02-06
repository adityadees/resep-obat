<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Obatalkes_m extends Model
{
    use HasFactory;

    protected $table = 'obatalkes_m';
    protected $primaryKey = 'obatalkes_id';
    const UPDATED_AT = 'last_modified_date';
}
