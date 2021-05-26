<?php

namespace App\Services;

use App\Contracts\DocumentHandlerContract;

class DocumentService implements DocumentHandlerContract
{
    /**
     * Contains a document object.
     *
     * @var null
     */
    private $document = null;

    /**
     * An array of variables to be inserted into the document.
     *
     * @var array
     */
    private $variables = [];

    /**
     * Adds a value by key to an array of variables.
     *
     * @param string $key
     * @param mixed $value
     *
     * @return void
     */
    public function addVariable($key, $value)
    {
    }


    /**
     * Sets the passed object to the document variable.
     *
     * @param mixed $document
     *
     * @return App\Services\DocumentService
     */
    public function setDocument($document)
    {
        if ($document != null) {
            $this->document = $document;
        }

        return $this;
    }

    /**
     * Concatenates the passed array of variables to the array of the object.
     *
     * @param array $variables
     *
     * @return void
     */
    public function addVariables($variables)
    {
    }

    /**
     * Performs the process of loading or creating a document.
     *
     * @return string
     */
    public function load()
    {
    }
}
