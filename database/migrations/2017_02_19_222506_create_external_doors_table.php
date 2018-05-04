<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExternalDoorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('external_doors', function (Blueprint $table) {
            $table->integer('id_product')->unsigned();
            $table->foreign('id_product')->references('id_product')->on('products')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->integer('height');
            $table->integer('width');
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
        Schema::dropIfExists('external_doors');
    }
}
