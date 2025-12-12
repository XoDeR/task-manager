<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    // Possible values for status attribute
    public const STATUS_TODO = 0;
    public const STATUS_IN_PROGRESS = 1;
    public const STATUS_DONE = 2;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'description',
        'status',
    ];
}
