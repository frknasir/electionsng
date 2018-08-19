<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLiveUpdatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    { 
        Schema::create('live_updates', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->text('description');
            $table->uuid('election_id');
            /**
             * location_id is either a state, localgov, 
             * registration area or a polling unit id
             */
            $table->unsignedInteger('location_id');
            /**
             * location_type contains the class name 
             * of the location: State, LocalGovernment, 
             * RegistrationArea or PollingUnit
             */
            $table->string('location_type');
            $table->unsignedInteger('added_by');
            $table->unsignedInteger('updated_by');
            $table->timestamps(); 

            $table->foreign('election_id')->references('id')->on('elections');
            $table->foreign('added_by')->references('id')->on('users');
            $table->foreign('updated_by')->references('id')->on('users');

            $table->engine = 'InnoDB';
            $table->charset = 'utf8';
            $table->collation = 'utf8_bin';
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('live_updates');
    }
}
