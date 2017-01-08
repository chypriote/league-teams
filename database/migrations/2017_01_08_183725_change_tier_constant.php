<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeTierConstant extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('players')
            ->where('tier', 'CHALLENGER')
            ->update(['tier' => '10_challenger']);
        DB::table('players')
            ->where('tier', 'MASTER')
            ->update(['tier' => '20_master']);
        DB::table('players')
            ->where('tier', 'DIAMOND')
            ->update(['tier' => '30_diamond']);
        DB::table('players')
            ->where('tier', 'PLATINUM')
            ->update(['tier' => '40_platinum']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('players')
            ->where('tier', '10_challenger')
            ->update(['tier' => 'CHALLENGER']);
        DB::table('players')
            ->where('tier', '20_master')
            ->update(['tier' => 'MASTER']);
        DB::table('players')
            ->where('tier', '30_diamond')
            ->update(['tier' => 'DIAMOND']);
        DB::table('players')
            ->where('tier', '40_platinum')
            ->update(['tier' => 'PLATINUM']);
    }
}
