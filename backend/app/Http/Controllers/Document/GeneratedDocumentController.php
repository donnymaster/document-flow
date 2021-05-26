<?php

namespace App\Http\Controllers\Document;

use App\Http\Controllers\Controller;
use App\Http\Requests\Document\GeneratedDocumentRequest;
use App\Http\Resources\Document\GeneratedDocumentResource;
use App\Models\GeneratedDocument;
use Illuminate\Http\Request;

class GeneratedDocumentController extends Controller
{
    public function index(Request $request)
    {
        return GeneratedDocumentResource::collection(GeneratedDocument::with('documentTemplate')->paginate());
    }

    public function store(GeneratedDocumentRequest $request)
    {
        $data = $request->validated();
        GeneratedDocument::create([
            'name' => $data['name'],
            'document_template_id' => $data['template_id'],
        ]);
        return response()->json(['message' => 'created']);
    }

    public function show($id)
    {
        $document = GeneratedDocument::where('id', $id)->with('documentTemplate.templateVariables')->firstOrFail();
        return response([
            'data' => new GeneratedDocumentResource($document),
        ]);
    }
}
