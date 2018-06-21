<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            //Загальні правила
            'category' => 'required|in:internalDoor,externalDoor,laminate,tile',
            'name' => 'required|max:100',
            'availability' => 'boolean',
            'id_producer' => 'integer|nullable',
            'price' => 'integer|nullable|min:0|max:999999',
            'top' => 'boolean',
            'description' => 'max:2000',
            //Міжкімнатні двері
            'type' => 'required_if:category,internalDoor|in:shponovani,ekoshpon,emal,sosna,vilkha, dub',
            'size_60' => 'boolean',
            'size_70' => 'boolean',
            'size_80' => 'boolean',
            'size_90' => 'boolean',
            //Вхідні двері
            'height' => 'required_if:category,externalDoor|nullable|integer|min:0',
            'width' => 'required_if:category,externalDoor|nullable|integer|min:0',
            //Ламінат, плитка
            'length' => 'required_if:category,laminate,tile|nullable|integer|min:0',
            'width' => 'required_if:category,laminate,tile|nullable|integer|min:0',
            'thickness' => 'integer|nullable|min:0',
            'number_in_package' => 'integer|nullable|min:0',
            'total_area' => 'numeric|nullable|min:0',

        ];
    }
}
