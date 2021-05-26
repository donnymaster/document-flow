<?php

namespace App\Contracts;

interface DocumentHandlerContract
{
    public function addVariable($key, $value);

    public function addVariables($variables);

    public function load();
}
