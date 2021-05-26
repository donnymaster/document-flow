<?php

use App\Models\Permission;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class InsertPermissionCreateGeneratedDocument extends Migration
{
    private $permission = [
        'name' => 'generated-documents.create',
        'title' => 'Создание документа'
    ];
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Permission::create($this->permission);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
