<?php

namespace App\Console\Commands;

use App\Models\User;
use App\Services\User\User as UserService;
use Illuminate\Console\Command;

class UserRebuildAvatars extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'users:rebuild:avatars';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Rebuild user avatars';

    /**
     * User service
     * @var UserService
     */
    private UserService $userService;

    /**
     * Create a new command instance.
     *
     * @param UserService $userService
     */
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;

        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $users = User::all();

        foreach ($users as $user) {
            $user->avatar_url = $this->userService->generateAvatar($user->id, $user->first_name . ' ' . $user->last_name);
            $user->save();
        }
    }
}
