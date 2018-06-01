<?php

namespace App\Http\Controllers;
use App\ProdImage;
use App\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;


class ImageController extends Controller
{
    public function uploads(Request $request)
    {
        $id_product = $request->input('id_product');
        $uuid = $request->input('qquuid');
        $file = $request->file('qqfile');
        $kof = Image::make($file)->width()/Image::make($file)->height();
        if ($kof > 0.8){
            Image::make($file)->widen(60)->encode('jpg', 75)->save('storage/images/small/' . $uuid . '.jpg');
            Image::make($file)->widen(180)->encode('jpg', 75)->save('storage/images/medium/' . $uuid . '.jpg');
            Image::make($file)->widen(450)->encode('jpg', 75)->save('storage/images/large/' . $uuid . '.jpg');
        } elseif ($kof <= 0.8) {
            Image::make($file)->heighten(75)->encode('jpg', 75)->save('storage/images/small/' . $uuid . '.jpg');
            Image::make($file)->heighten(225)->encode('jpg', 75)->save('storage/images/medium/' . $uuid . '.jpg');
            Image::make($file)->heighten(560)->encode('jpg', 75)->save('storage/images/large/' . $uuid . '.jpg');
        } else {
            return response()->json([
                'success' => false,
                'resp' => $kof,
            ]);
        }
        $res = ProdImage::create(['id_product' => $id_product, 'uuid' => $uuid]);
        return response()->json([
            'success' => true,
            'resp' => $res,
        ]);
    }

    public function delete(Request $request) {
        $uuid = $request->input('qquuid');
        ProdImage::where('uuid', $uuid)->delete();
        $data = Storage::delete(["images/small/$uuid.jpg", "images/large/$uuid.jpg", "images/medium/$uuid.jpg", ]);
        return response()->json([
            'success' => true,
            'uuid' => $uuid,
            'data' => $data,
        ]);

    }
    public static function deleteId($id) {
        $images = ProdImage::where('id_product', $id)->get();
        foreach ($images as $image) {
            $uuid = $image->uuid;
            $data = Storage::delete(["images/small/$uuid.jpg", "images/large/$uuid.jpg", "images/medium/$uuid.jpg", ]);
        }
        return true;
    }
    public function getInitialFiles(Request $request) {
        $images = ProdImage::where('id_product', $request->input('id_product'))->get();
        $initialFiles = array();
        foreach ($images as $image){
            array_push ($initialFiles, array("name" => 'image'.$image['id_image'], "uuid" => $image['uuid'], "thumbnailUrl" => "/storage/images/small/".$image['uuid'].'.jpg'));
        }
        return $initialFiles;
    }
    public function setLogo(Request $request) {
        $uuid = $request->input('uuid');
        $id_product = $request->input('id_product');
        ProdImage::where('uuid', $uuid)->where('id_product', $id_product)->firstOrFail(); //Перевірка, чи існує це зображення
        $product = Product::find($id_product);
        $product->uuid = $uuid;
        $product->save();
        return response()->json([
            'success' => true,
            'uuid' => $uuid
        ]);
    }

}
