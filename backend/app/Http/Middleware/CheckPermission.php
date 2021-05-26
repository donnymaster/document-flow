<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CheckPermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $action = $request->route()->getName();
        if ($action && !auth()->user()->hasPermissionTo($action)) {
            abort(Response::HTTP_FORBIDDEN, __('messages.not_access'));
        }

        return $next($request);
    }
}
