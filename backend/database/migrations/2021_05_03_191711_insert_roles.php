<?php

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Migrations\Migration;

class InsertRoles extends Migration
{
    private $roles = [
        Role::SECRETARY => 'Секретарь',
        Role::MEMBER_GEC => 'Член ГЭК\'а',
        Role::HEAD_DEPARTMENT => 'Заведующий кафедры',
    ];

    private $permissions = [
        'roles.index' => 'Просмотр ролей',
        'roles.store' => 'Добавление роли',
        'roles.show' => 'Просмотр роли',
        'roles.update' => 'Обновление роли',
        'roles.destroy' => 'Удаление роли',
        'users.index' => 'Просмотр пользователей',
        'users.store' => 'Добавить пользователя',
        'users.show' => 'Просмотр пользователя',
        'users.update' => 'Обновление пользователя',
        'users.destroy' => 'Удаление пользователя',
        'permissions.index' => 'Просмотр разрешений',
        'permissions.store' => 'Создание разрешения',
        'permissions.show' => 'ПРосмотр разрешения',
        'permissions.update' => 'Обновление разрешения',
        'permissions.destroy' => 'Удаления разрешения',
        'faculties.index' => 'Просмотр факультетов',
        'faculties.store' => 'Создания факультета',
        'faculties.show' => 'Просмотр факультета',
        'faculties.update' => 'Обновления факультета',
        'faculties.destroy' => 'Удаления факультета',
        'departments.index' => 'Просмотр кафедр',
        'departments.store' => 'Создание кафедры',
        'departments.show' => 'Просмотр кафедры',
        'departments.update' => 'Обновление кафедры',
        'departments.destroy' => 'Удаление кафедры',
        'department-groups.index' => 'Просмотр групп',
        'department-groups.store' => 'Создание группы',
        'department-groups.show' => 'Просмотр группы',
        'department-groups.update' => 'Обновление группы',
        'department-groups.destroy' => 'Удаление группы',
        'lecturers.index' => 'Просмотр преподавателей',
        'lecturers.store' => 'Создание преподавателя',
        'lecturers.show' => 'Просмотр преподавателя',
        'lecturers.update' => 'Обновление преподавателя',
        'lecturers.destroy' => 'Удаление преподавателя',
        'students.index' => 'Просмотр студентов',
        'students.store' => 'Создание студента',
        'students.show' => 'Просмотр студента',
        'students.update' => 'Обновление студента',
        'students.destroy' => 'Удаление студента',
        'document-templates.index' => 'Просмотр шаблонов документов',
        'document-templates.store' => 'Создания шаблона документа',
        'document-templates.show' => 'Просмотр шаблона документа',
        'document-templates.update' => 'Обновление шаблона документа',
        'document-templates.destroy' => 'Удаление шаблона документа',
        'role.assign.permission' => 'Назначение разрешения на роль',
        'role.revoke.permission' => 'Снятие с роли разрешения',
        'user.assign.role' => 'Назначение роли на пользователя',
        'user.revoke.role' => 'Снятие роли с пользователя',
        'user.assign.permission' => 'Назначение разрешения на пользователя',
        'user.revoke.permission' => 'Снятие разрешения с пользователя',
        'department.assign.faculty' => 'Установка на кафедру факультета',
        'lecturers.mass.filling' => 'Массове заполнение Преподавателей',
    ];

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        foreach ($this->roles as $name => $title) {
            Role::create([
                'name' => $name,
                'title' => $title
            ]);
        }

        foreach ($this->permissions as $name => $title) {
            Permission::create([
                'name' => $name,
                'title' => $title,
            ]);
        }

        $secretary = Role::where('name', Role::SECRETARY)->firstOrFail();
        $secretary->givePermissionTo(array_keys($this->permissions));
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Role::whereIn('name', array_keys($this->roles))->delete();
    }
}
