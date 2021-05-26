<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Services\UserService;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run(UserService $service)
    {
        $service->create([
            'name' => 'Александр',
            'email' => 'alekss.yaremko@gmail.com',
            'surname' => 'Николаевич',
            'password' => 'sasha123',
            'patronymic' => 'Яремко',
        ], [Role::SECRETARY]);
    }
}
