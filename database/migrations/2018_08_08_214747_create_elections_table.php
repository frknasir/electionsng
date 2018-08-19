<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateElectionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('elections', function (Blueprint $table) {
            $table->uuid('id');
            $table->string('title');
            $table->unsignedInteger('election_type_id');
            $table->unsignedInteger('state_id');
            $table->bigInteger('registered_voters')->nullable();
            $table->bigInteger('accredited_voters')->nullable();
            $table->bigInteger('votes_cast')->nullable();
            $table->bigInteger('valid_votes')->nullable();
            $table->bigInteger('rejected_votes')->nullable();
            $table->timestamp('date');
            $table->unsignedInteger('added_by');
            $table->unsignedInteger('updated_by');
            $table->timestamps(); 

            $table->primary('id');
            $table->foreign('election_type_id')->references('id')->on('election_types');
            $table->foreign('state_id')->references('id')->on('states');
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
        Schema::dropIfExists('elections');
    }
}
