<?php

use Illuminate\Database\Seeder;


class TypesAccessoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $typesList = array(
            [
                'category' => 'internalDoor',
                'name' => "box",
                'full_name' => 'Дверна коробка',
            ],
            [
                'category' => 'internalDoor',
                'name' => "doorstep",
                'full_name' => 'Поріг',
            ],
            [
                'category' => 'internalDoor',
                'name' => "lishtva",
                'full_name' => 'Лиштва',
            ],
            [
                'category' => 'internalDoor',
                'name' => "dobir",
                'full_name' => 'Добірна дошка',
            ],
            [
                'category' => 'internalDoor',
                'name' => "planka",
                'full_name' => 'Притворна планка',
            ]
        );
        \App\TypesAccessories::insert($typesList);
    }
}
