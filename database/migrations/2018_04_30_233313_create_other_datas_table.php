<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOtherDatasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('other_datas', function (Blueprint $table) {
            $table->increments('id_data');
            $table->integer('id_product')->unsigned()->references('id_product')->on('products')->onDelete('cascade')->onUpdate('cascade');
            $table->text('name', 30);
            $table->text('value', 100);
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
        Schema::dropIfExists('other_datas');
    }
}
