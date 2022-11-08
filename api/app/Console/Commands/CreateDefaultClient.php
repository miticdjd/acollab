<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Laravel\Passport\ClientRepository;

class CreateDefaultClient extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'passport:client:default';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create default personal client that we will use';

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
     * @return mixed
     */
    public function handle()
    {
        $clientRepository = new ClientRepository();
        $clientRepository->createPersonalAccessClient(
            null, 'Default Personal Access Client', 'http://localhost:8000'
        );
    }
}
