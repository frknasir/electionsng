<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateIncidentTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    { 
        Schema::create('incident_types', function (Blueprint $table) {
            $table->increments('id');
            /**
             * Assault, Harrassment or libel
             * Vote or Turnout buying
             * Misrecording of Votes
             * Misuse of Proxy Votes
             * EVM Tampering
             * Destruction Or Invalidation Of Ballots
             */
            $table->string('name');
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
        Schema::dropIfExists('incident_types');
    }
}
