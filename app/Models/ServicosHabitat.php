<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class ServicosHabitat extends Model
{
    use HasFactory, Notifiable, SoftDeletes;

     /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
     protected $fillable = [ 
        'HabitatId',
        'ServicosId',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     *
     */
    protected $hidden = [ 
        'remember_token',
        'updated_at',
        'created_at',
        'deleted_at',
    ];
 
    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            //'email_verified_at' => 'datetime',
            //'senha' => 'hashed',
        ];
    }

    public function Habitat(){ 
        return $this->belongsTo(Habitat::class, 'habitatId');
    }

    public function Servicos(){ 
        return $this->belongsTo(Servicos::class, 'servicosId');
    }

}