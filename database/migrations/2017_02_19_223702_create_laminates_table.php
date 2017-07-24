<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLaminatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('laminates', function (Blueprint $table) {
            $table->integer('id_product')->unsigned();
            $table->foreign('id_product')->references('id_product')->on('products')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->integer('number_in_package')->nullable(); //Кількість плиток в пачці
            $table->float('total_area')->nullable(); //Загальна площа в пачці
            $table->integer('length');
            $table->integer('width');
            $table->integer('thickness')->nullable();
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
        Schema::dropIfExists('laminates');
    }
}
