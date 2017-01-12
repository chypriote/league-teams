<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeRoleConstants extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('players', function (Blueprint $table) {
					DB::table('players')
						->where('position', 'top')
						->update(['position' => '10_top']);
					DB::table('players')
						->where('position', 'jungle')
						->update(['position' => '20_jungle']);
					DB::table('players')
						->where('position', 'mid')
						->update(['position' => '30_mid']);
					DB::table('players')
						->where('position', 'adc')
						->update(['position' => '40_adc']);
					DB::table('players')
						->where('position', 'support')
						->update(['position' => '50_support']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('players', function (Blueprint $table) {
					DB::table('players')
						->where('position', '10_top')
						->update(['position' => 'top']);
					DB::table('players')
						->where('position', '20_jungle')
						->update(['position' => 'jungle']);
					DB::table('players')
						->where('position', '30_mid')
						->update(['position' => 'mid']);
					DB::table('players')
						->where('position', '40_adc')
						->update(['position' => 'adc']);
					DB::table('players')
						->where('position', '50_support')
						->update(['position' => 'support']);
        });
    }
}
