<?php

namespace App\Console\Commands;

use App\Exceptions\User\UserEmailException;
use App\Exceptions\User\UserEmptyInfoException;
use App\Models\Role;
use App\Services\UserService;
use Illuminate\Support\Str;
use Illuminate\Console\Command;

class CreateSecretary extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = "user:secretary {email} {user}";

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'This command creates a secretary and sends him an email with login information.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @param App\Services\UserService $service
     *
     * @return int
     */
    public function handle(UserService $service)
    {
        $user = $this->argument('user');
        $email = $this->argument('email');

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new UserEmailException('Invalid mail format');
        }

        try {
            list($name, $surname, $patronymic) = explode(' ', $user);
        } catch (\Throwable $th) {
            $this->error('You have not provided all user information.');
            return 1;
        }

        if ($name == '' || $surname == '' || $patronymic == '') {
            throw new UserEmptyInfoException('You have not provided all user information.');
        }

        $password = Str::random(15);

        $service->create([
            'name' => $name,
            'email' => $email,
            'surname' => $surname,
            'password' => $password,
            'patronymic' => $patronymic,
        ], [Role::SECRETARY], true);

        $this->info('A secretary has been created.');
        $this->table(
            ['login', 'password', 'send email'],
            [[$email, $password, 'true']]
        );

        return 0;
    }
}
