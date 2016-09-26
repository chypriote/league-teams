<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePlayersTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('players', function (Blueprint $table) {
			$table->increments('id');
			$table->integer('riot_id')->unique();

			$table->string('name');
			$table->string('summoner_name');
			$table->string('position');

			$table->string('tier');
			$table->integer('division');
			$table->text('comment')->nullable();

			// $table->string('highest_tier');
			// $table->integer('highest_division');
			// $table->dateTimeTz('highest_date');
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
	  Schema::drop('players');
	}
}
