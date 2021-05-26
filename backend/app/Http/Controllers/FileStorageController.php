<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileStorageController extends Controller
{
    public function save(Request $request)
    {
        $file = $request->file('file');
        $path = $request->input('folder');

        $folderPath = $path . '/' . date('Y-m-d');
        $path = $file->store($folderPath);
        return response()->json(['path' => $path]);
    }

    public function download($filePath)
    {
        if (Storage::exists('documents/' . $filePath)) {
            return Storage::download('documents/' . $filePath);
        }
        return Storage::download($filePath);
    }
}
