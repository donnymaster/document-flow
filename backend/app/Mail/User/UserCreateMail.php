<?php

namespace App\Mail\User;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class UserCreateMail extends Mailable
{
    use Queueable, SerializesModels;


    /**
     * user's full name and surname.
     *
     * @var string|null
     */
    public $user_full = null;

    /**
     * User mail.
     *
     * @var string|null
     */
    public $email = null;

    /**
     *  User password.
     *
     * @var string|null
     */
    public $password = null;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($user_full, $email, $password)
    {
        $this->user_full = $user_full;
        $this->email = $email;
        $this->password = $password;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Реєстрація в системі Document Flow.')->view('emails.user.create');
    }
}
