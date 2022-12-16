<?php

namespace App\Console\Commands;

use App\Models\Issue;
use App\Models\Project;
use Illuminate\Console\Command;

class CreateDefaultData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'seed:default:data';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create default testing data';

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
        Project::newFactory()->count(10)->create();
        Issue::newFactory()->count(20)->create();
    }
}
