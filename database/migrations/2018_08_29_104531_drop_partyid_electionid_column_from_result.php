<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DropPartyidElectionidColumnFromResult extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('results', function (Blueprint $table) {
            $table->dropForeign(['political_party_id', 'election_id']);
            $table->dropUnique('results_political_party_id_election_id_unique');
            $table->dropColumn('political_party_id');
            $table->dropColumn('election_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->unsignedInteger('political_party_id');
            $table->uuid('election_id');

            $table->foreign('political_party_id')->references('id')->on('political_parties');
            $table->foreign('election_id')->references('id')->on('elections');
        });
    }
}
