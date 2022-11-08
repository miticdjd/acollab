<?php

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
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('address_id')->constrained();
            $table->string('name');
            $table->string('name_business');
            $table->string('name_short');
            $table->date('incorporation_date');
            $table->string('email');
            $table->string('company_id');
            $table->string('vat_id');
            $table->boolean('in_vat');
            $table->integer('vat');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('companies');
    }
};
