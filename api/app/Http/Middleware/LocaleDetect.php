<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class LocaleDetect
{
    /**
     * Detect client that is sending a request
     *
     * @param Request $request
     * @param Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $locale = $request->headers->get('SIM-Locale', config('app.fallback_locale'));
        App::setLocale($locale);

        return $next($request);
    }
}
