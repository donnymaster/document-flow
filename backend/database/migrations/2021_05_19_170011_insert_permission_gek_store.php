<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Permission;

class InsertPermissionGekStore extends Migration
{
    private $permission = [
        'name' => 'info-gek.store',
        'title' => 'Создания вопроса члена ГЭК\'а'
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
