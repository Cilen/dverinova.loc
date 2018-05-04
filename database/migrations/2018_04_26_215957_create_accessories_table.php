<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAccessoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('accessories', function (Blueprint $table) {
            $table->increments('id_accessories');
            $table->integer('id_producer')->unsigned()->references('id_producer')->on('producers')->onDelete('cascade')->onUpdate('cascade');
            $table->integer('id_type_accessories')->unsigned()->references('id_type_accessories')->on('type_accessories')->onDelete('cascade')->onUpdate('cascade');
            $table->string('name', 30);
            $table->float('price')->default(0);
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
        Schema::dropIfExists('accessories');
    }
}
