<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTypesAccessoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('types_accessories', function (Blueprint $table) {
            $table->increments('id_type_accessories');
            $table->string('category', 20);
            $table->string('name', 20);
            $table->string('full_name', 30);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('types_accessories');
    }
}
