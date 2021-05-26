<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

abstract class ModelResource extends JsonResource
{
    public Request $request;
    public $identifier = true;
    public $timestamps = true;

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $this->request = $request;

        return array_merge(
            [
                $this->mergeWhen($this->identifier, [
                    'id' => $this->id,
                ]),
            ],
            $this->transformTo(),
            [
                $this->mergeWhen($this->timestamps, [
                    'created_at' => $this->created_at->format('Y-m-d H:i:s'),
                    'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
                ]),
            ]
        );
    }

    abstract public function transformTo(): array;
}
