<?php

namespace App\Services\Auth;

use App\Services\User\Role;
use Illuminate\Support\Facades\Auth;
use App\Models\Place;

class Access
{
    /**
     * Filter for coordinator
     *
     * @return Builder
     */
    public static function filterRegistrationsForCoordinator($query)
    {
        $user = Auth::user();

        if ($user && $user->hasRole(Role::ROLE_COORDINATOR)) {

            if (count($user->sports) > 0) {

                $query->whereIn('registrations.sport_id', $user->sports->pluck('id'));
            }

            if (count($user->counties) > 0) {
                $places = Place::whereIn('county_id', $user->counties->pluck('id'));

                $query->whereIn('registrations.place_id', $places->pluck('id'));
            }
        }

        return $query;
    }

    /**
     * Filter for coordinator
     *
     * @return Builder
     */
    public static function filterFinalistsForCoordinator($query)
    {
        $user = Auth::user();

        if ($user && $user->hasRole(Role::ROLE_COORDINATOR)) {

            if (count($user->sports) > 0) {

                $query->whereIn('finalists.sport_id', $user->sports->pluck('id'));
            }

            if (count($user->counties) > 0) {
                $places = Place::whereIn('county_id', $user->counties->pluck('id'));

                $query->whereIn('finalists.place_id', $places->pluck('id'));
            }
        }

        return $query;
    }

    /**
     * Filter for coordinator
     *
     * @return Builder
     */
    public static function filterInterstatesForCoordinator($query)
    {
        $user = Auth::user();

        if ($user && $user->hasRole(Role::ROLE_COORDINATOR)) {

            if (count($user->sports) > 0) {

                $query->whereIn('interstates.sport_id', $user->sports->pluck('id'));
            }

            if (count($user->counties) > 0) {
                $places = Place::whereIn('county_id', $user->counties->pluck('id'));

                $query->whereIn('interstates.place_id', $places->pluck('id'));
            }
        }

        return $query;
    }

    /**
     * Filter sports by a coordinator
     *
     * @return Builder
     */
    public static function filterSportsForCoordinator($query)
    {
        $user = Auth::user();

        if ($user && $user->hasRole(Role::ROLE_COORDINATOR)) {

            if (count($user->sports) > 0) {

                $query->whereIn('id', $user->sports->pluck('id'));
            }
        }

        return $query;
    }

    /**
     * Filter places for coordinator
     *
     * @return Builder
     */
    public static function filterPlacesForCoordinator($query)
    {
        $user = Auth::user();

        if ($user && $user->hasRole(Role::ROLE_COORDINATOR)) {

            if (count($user->counties) > 0) {

                $query->whereIn('county_id', $user->counties->pluck('id'));
            }
        }

        return $query;
    }

    /**
     * Filter counties by a coordinator
     *
     * @return Builder
     */
    public static function filterCountiesForCoordinator($query)
    {
        $user = Auth::user();

        if ($user && $user->hasRole(Role::ROLE_COORDINATOR)) {

            if (count($user->counties) > 0) {

                $query->whereIn('id', $user->counties->pluck('id'));
            }
        }

        return $query;
    }
}
