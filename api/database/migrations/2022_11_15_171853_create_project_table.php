<?php

use App\Services\Project\UserType;
use App\Services\Project\Status;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('code');
            $table->text('description');
            $table->enum('status', Status::all());
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('project_user', function(Blueprint $table) {
            $table->foreignId('user_id')->constrained();
            $table->foreignId('project_id')->constrained();
            $table->enum('type', UserType::all());
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('project');
    }
};
