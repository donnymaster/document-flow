<?php

namespace App\Http\Controllers\Document;

use App\Contracts\FileStorageContract;
use App\Http\Controllers\Controller;
use App\Http\Requests\DocumentTemplate\CreateDocumentTemplateRequest;
use App\Http\Resources\Document\DocumentTemplateResource;
use App\Models\DocumentTemplate;
use App\Models\GeneratedDocument;
use App\Models\TemplateVariable;
use Illuminate\Http\Request;
use PhpOffice\PhpWord\TemplateProcessor;

class DocumentTemplateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return DocumentTemplateResource::collection(DocumentTemplate::paginate());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  App\Http\Requests\DocumentTemplate\CreateDocumentTemplateRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateDocumentTemplateRequest $request)
    {
        $data = collect($request->validated());
        $documentTemplate = DocumentTemplate::create([
            'name' => $data['name'],
            'version' => $data['version'],
            'file_path' => $data['file_path'],
        ]);

        foreach ($data['variables'] as $variable) {
            $dates = [
                'document_template_id' => $documentTemplate->id,
                'name' => $variable['name'],
                'key' => $variable['key']
            ];
            if (isset($variable['description'])) {
                $dates = array_merge($dates, ['description' => $variable['description']]);
            }

            TemplateVariable::create($dates);
        }

        return response()->json([
            'message' => __('messages.template_create')
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\DocumentTemplate  $documentTemplate
     * @return \Illuminate\Http\Response
     */
    public function show(DocumentTemplate $documentTemplate)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\DocumentTemplate  $documentTemplate
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, DocumentTemplate $documentTemplate)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\DocumentTemplate  $documentTemplate
     * @return \Illuminate\Http\Response
     */
    public function destroy(DocumentTemplate $documentTemplate)
    {
        //
    }

    public function load(Request $request)
    {
        $name = $request->input('q') ?? '';

        $templates = DocumentTemplate::where('name', 'like', '%' . $name . '%')->limit(30)->get();

        return response()->json([
            'data' => DocumentTemplateResource::collection($templates),
        ]);
    }

    public function createDocument(Request $request, $documentId, $templateId)
    {
        $variable = $request->variables;
        $document = GeneratedDocument::where('id', $documentId)->firstOrFail();
        $template = DocumentTemplate::where('id', $templateId)->firstOrFail();

        list($date, $fileName) = explode('/', $template->file_path);

        $templateProcessor = new TemplateProcessor(storage_path('app/' . $template->file_path));

        $templateProcessor->setValues($variable);

        $fileNameSave = md5($fileName) . '.docx';
        $filePath = 'documents/' . $fileNameSave;

        $templateProcessor->saveAs(storage_path('app\documents\\' . $fileNameSave));

        $document->cached_path = $filePath;
        $document->cached = true;
        $document->save();

        return response()->json([
            'doc' => $document,
            'tem' => $template,
            'variables' => $request->variables,
        ]);
    }
}
