<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EditTeamsToOne extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('players', function (Blueprint $table) {
            $table->integer('team_id')->index();
        });
        Schema::dropIfExists('players_teams');
        Schema::table('teams', function (Blueprint $table) {
            $table->string('logo');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::create('players_teams', function (Blueprint $table) {
            $table->increments('id')->index();
            $table->boolean('is_current')->nullable();
            $table->integer('player_id');
            $table->integer('team_id');
        });
        Schema::table('players', function (Blueprint $table) {
            $table->dropColumn('team_id');
        });
        Schema::table('teams', function (Blueprint $table) {
            $table->dropColumn('logo');
        });
    }
}
