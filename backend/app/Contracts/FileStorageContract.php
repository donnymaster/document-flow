<?php

namespace App\Contracts;

interface FileStorageContract
{
    public function save();

    public function saveManyFiles();
}
