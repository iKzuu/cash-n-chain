<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BlockchainRecord extends Model
{
    protected $fillable = [
        'transaction_id',
        'data_hash',
        'blockchain_tx_hash',
        'block_number',
        'blockchain_timestamp',
        'status',
    ];

    protected $casts = [
        'block_number' => 'integer',
        'blockchain_timestamp' => 'integer',
    ];

    public function transaction(): BelongsTo
    {
        return $this->belongsTo(Transaction::class);
    }
}
