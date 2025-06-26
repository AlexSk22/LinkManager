<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    public $timestamps = false;
    protected $primaryKey = 'tagname';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = ['tagname', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function links()
    {
        return $this->belongsToMany(Link::class, 'link_tags', 'tagname', 'link_id')
            ->withPivot('user_id');
    }
}
