<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Mail;
use App\Mail\User\UserCreateMail;

class UserService
{
    const PHONE_NUMBER_PATTERN = '/^\+?3?8?(0\d{9})$/';

    /**
     * Create user and send mail if isSendEmail variable is true.
     *
     * @param array $data
     * @param array $roles
     * @param bool $isSendEmail
     *
     * @return App\Models\User
     */
    public function create(array $data, array $roles = [], bool $isSendEmail = false)
    {
        $user = new User;
        $user->name = $data['name'];
        $user->surname = $data['surname'];
        $user->patronymic = $data['patronymic'];
        $user->email = $data['email'];
        $user->password = bcrypt($data['password']);

        $user->phone_number = $data['phone_number'] ?? null;

        $user->save();

        if ($roles && !empty($roles)) {
            $user->assignRole($roles);
        }

        if ($isSendEmail) {
            Mail::to($user->email)->send(new UserCreateMail($user->full_name, $user->email, $data['password']));
        }

        return $user;
    }
}
