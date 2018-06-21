<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id_product');
            $table->string('name', 200);
            $table->string('category', 20);
            $table->boolean('availability'); //Наявність
            $table->boolean('top'); //Хіт продаж
            $table->integer('price')->default(0);
            $table->text('description')->nullable(); //Опис
            $table->integer('id_producer')->nullable()
                ->references('id_producer')->on('producers')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->string('uuid')->nullable();
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
        Schema::dropIfExists('products');
    }
}
