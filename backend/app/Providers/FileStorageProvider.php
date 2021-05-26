<?php

namespace App\Providers;

use App\Contracts\FileStorageContract;
use App\Services\LocalFileStorageService;
use Illuminate\Support\ServiceProvider;

class FileStorageProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(FileStorageContract::class, function () {
            return new LocalFileStorageService();
        });
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
