<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInternalDoorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('internal_doors', function (Blueprint $table) {
            $table->integer('id_product')->unsigned();
            $table->foreign('id_product')->references('id_product')->on('products')
                  ->onDelete('cascade')
                  ->onUpdate('cascade');
            $table->string('type', 20); //Вид дверей (шпоновані, дубові і т.п.)
            $table->boolean('size_60');
            $table->boolean('size_70');
            $table->boolean('size_80');
            $table->boolean('size_90');
            $table->integer('height');
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
        Schema::dropIfExists('internal_doors');
    }
}
