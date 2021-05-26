<?php

namespace App\Services;

use App\Models\DocumentTemplate;
use PhpOffice\PhpWord\TemplateProcessor;

class CreateDocumentService
{
    /**
     * Contains an instance of the TemplateProcessor class.
     *
     * @var PhpOffice\PhpWord\TemplateProcessor|null
     */
    private $templateEngine = null;

    /**
     * Contains an instance of the DocumentTemplate model.
     *
     * @var App\Models\DocumentTemplate|null
     */
    private $template = null;

    /**
     * Stores an array with variables.
     *
     * @var array
     */
    private $variables = [];

    /**
     * Sets the template variable.
     *
     * @param App\Models\DocumentTemplate $template
     *
     * @return App\Services\CreateDocumentService
     */
    public function setTemplate(DocumentTemplate $template)
    {
        if ($template != null) {
            $this->template = $template;
        }

        return $this;
    }

    /**
     * @param array $variables
     *
     * @return App\Services\CreateDocumentService
     */
    public function loadVariables(array $variables)
    {
        if (!empty($variables)) {
            $this->variables = $variables;
        }
        return $this;
    }

    protected function build()
    {
        if ($this->templateEngine == null || $this->template == null) {
            // error
        }

        $this->templateEngine->setValues($this->variables);
    }

    public function run()
    {
        $this->templateEngine = new TemplateProcessor($this->document->path);
    }
}
