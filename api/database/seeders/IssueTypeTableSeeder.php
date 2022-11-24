<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class IssueTypeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $issueIssueType = new \App\Models\IssueType();
        $issueIssueType->name = 'Issue';
        $issueIssueType->save();

        $bugIssueType = new \App\Models\IssueType();
        $bugIssueType->name = 'Bug';
        $bugIssueType->save();

        $improvementIssueType = new \App\Models\IssueType();
        $improvementIssueType->name = 'Improvement';
        $improvementIssueType->save();
    }
}
