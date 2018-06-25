@extends('layouts.admin-tpl')
@section('content')

    @include('layouts/fine-product')

    <link href="/vendor/fine-uploader/fine-uploader-gallery.css" rel="stylesheet">
    <div class="container">
        <div class="row">
            @if (count($errors) > 0)
                <div class="alert alert-danger">
                    <ul>
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif
            <div class="col-sm-2">
                <a href="{{action('ProductController@index')}}" class="btn btn-warning"
                   title="Повернутись до таблиці товарів">
                    <span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span>
                </a>
                <a href="{{action('ProductController@create')}}" class="btn btn-primary"
                   title="Додати новий товар">
                    <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                </a>
            </div>
            <div class="col-sm-10">
                <form id="addItemForm" method="post" action="{{url('admin/product/'.(empty($data['id_product']) ? "" : $data['id_product']))}}"
                      class="form-horizontal" id="add-product-form">
                    @if (isset($data['update']))
                        <input type="hidden" name="_method" value="PUT">
                    @endif
                    {{ csrf_field() }}
                    <div class="form-group" data-block="category">
                        <label for="category" class="col-sm-4 text-right">Категорія товару</label>
                        <div class="col-sm-4">
                            <input type="hidden" name="category" v-model="formData.category" v-if="formData.update == true">
                            <select class="form-control" id="category" name="category" v-model="formData.category"
                                    @click="getProducersFromCategory" :disabled="formData.update == true">
                                <option v-for="(category, index) in build.categories" v-bind:value="index"
                                        v-text="category"></option>
                            </select>
                        </div>
                    </div>
                    <template v-if="formData.category != ''">
                        <div class="form-group" data-block="name">
                            <label for="name" class="col-sm-4 text-right">Назва товару</label>
                            <div class="col-sm-4">
                                <input type="text" class="form-control" maxlength="100" required name="name" id="name"
                                       v-model="formData.name">
                            </div>
                        </div>
                    </template>

                    <template v-if="formData.category != ''">
                        <div class="form-group" data-block="producer">
                            <label for="producer" class="col-sm-4 text-right">Виробник</label>
                            <div class="col-sm-4">
                                <select class="form-control" id="id_producer" name="id_producer"
                                        v-model="formData.id_producer">
                                    <option v-for="item in build.producers" v-bind:value="item.id_producer"
                                            v-text="item.producer"></option>
                                </select>
                            </div>
                        </div>
                    </template>
                    <template v-if="formData.category == 'internalDoor'">
                        <div class="form-group" data-block="type">
                            <label for="type" class="col-sm-4 text-right">Тип вхідних дверей</label>
                            <div class="col-sm-4">
                                <select class="form-control" id="type" name="type" v-model="formData.type">
                                    <option v-for="(type, index) in build.types" v-bind:value="index"
                                            v-text="type"></option>
                                </select>
                            </div>
                        </div>
                    </template>
                    <template v-if="formData.category == 'internalDoor'">
                        <div class="form-group" data-block="size">
                            <label for="size" class="col-sm-4 text-right">Доступна ширина дверного полотна</label>
                            <div class="col-sm-1">
                                <label class="checkbox-inline">
                                    <input type="hidden" name="size_60" value="0">
                                    <input type="checkbox" id="size_60" name="size_60" v-model.lazy="formData.size_60"
                                           value="1">60
                                </label>
                            </div>
                            <div class="col-sm-1">
                                <label class="checkbox-inline">
                                    <input type="hidden" name="size_70" value="0">
                                    <input type="checkbox" id="size_70" name="size_70" v-model.lazy="formData.size_70"
                                           value="1">70
                                </label>
                            </div>
                            <div class="col-sm-1">
                                <label class="checkbox-inline">
                                    <input type="hidden" name="size_80" value="0">
                                    <input type="checkbox" id="size_80" name="size_80" v-model.lazy="formData.size_80"
                                           value="1">80
                                </label>
                            </div>
                            <div class="col-sm-1">
                                <label class="checkbox-inline">
                                    <input type="hidden" name="size_90" value="0">
                                    <input type="checkbox" id="size_90" name="size_90" v-model.lazy="formData.size_90"
                                           value="1">90
                                </label>
                            </div>
                        </div>
                    </template>
                    <template v-if="formData.category == 'internalDoor' || formData.category == 'externalDoor'">
                        <div class="form-group" data-block="height">
                            <label for="height" class="col-sm-4 text-right">Висота, мм</label>
                            <div class="col-sm-4">
                                <input type="number" class="form-control" v-model="formData.height" min="0"
                                       name="height"
                                       id="height">
                            </div>
                        </div>
                    </template>
                    <template v-if="formData.category == 'laminate' || formData.category == 'tile'">
                        <div class="form-group" data-block="length">
                            <label for="length" class="col-sm-4 text-right">Довжина, мм</label>
                            <div class="col-sm-4">
                                <input type="number" class="form-control" v-model="formData.length" min="0"
                                       name="length"
                                       id="length">
                            </div>
                        </div>
                    </template>
                    <template
                            v-if="formData.category == 'laminate' || formData.category == 'tile' || formData.category == 'externalDoor'">
                        <div class="form-group" data-block="width">
                            <label for="width" class="col-sm-4 text-right">Ширина, мм</label>
                            <div class="col-sm-4">
                                <input type="number" class="form-control" v-model="formData.width" min="0" name="width"
                                       id="width">
                            </div>
                        </div>
                    </template>
                    <template v-if="formData.category == 'laminate' || formData.category == 'tile'">
                        <div class="form-group" data-block="thickness">
                            <label for="thickness" class="col-sm-4 text-right">Товщина, мм</label>
                            <div class="col-sm-4">
                                <input type="number" class="form-control" v-model="formData.thickness" min="0"
                                       name="thickness" id="thickness">
                            </div>
                        </div>
                    </template>
                    <template v-if="formData.category == 'laminate' || formData.category == 'tile'">
                        <div class="form-group" data-block="number_in_package">
                            <label for="number_in_package" class="col-sm-4 text-right">Кількість в упаковці, шт</label>
                            <div class="col-sm-4">
                                <input type="number" class="form-control" v-model="formData.number_in_package" min="0"
                                       name="number_in_package" id="number_in_package">
                            </div>
                        </div>
                    </template>
                    <template v-if="formData.category == 'laminate' || formData.category == 'tile'">
                        <div class="form-group" data-block="total_area">
                            <label for="total_area" class="col-sm-4 text-right">Загальна площа в упаковці, м.кв.</label>
                            <div class="col-sm-4">
                                <input type="number" step="0.001" class="form-control" v-model="formData.total_area"
                                       min="0"
                                       name="total_area" id="total_area">
                            </div>
                        </div>
                    </template>
                    <template v-if="formData.category != ''">
                        <div class="form-group" data-block="availability">
                            <label for="availability" class="col-sm-4 text-right">Наявність</label>

                            <div class="col-sm-4">
                                <select class="form-control" id="availability" name="availability"
                                        v-model="formData.availability">
                                    <option v-for="(item, index) in build.availability" v-bind:value="index"
                                            v-text="item"></option>
                                </select>
                            </div>
                        </div>
                    </template>

                    <template v-if="formData.category != ''">
                        <div class="form-group" data-block="price">
                            <label for="price" class="col-sm-4 text-right">Ціна, грн</label>
                            <div class="col-sm-4">
                                <input type="number" class="form-control"  v-model="formData.price" v-on:input="toInt" min="0"
                                       name="price" id="price">
                            </div>
                        </div>
                    </template>
                    <template v-if="formData.category != ''">
                        <input type="hidden" name="numberOtherData" v-model="formData.numberOtherData">
                    </template>
                    <template v-if="formData.category != ''" v-for="(item, index) in formData.otherData">
                        <div class="form-group">
                            <input type="hidden" :name="'id_data_'+index" v-if="item.id_data" v-model="item.id_data">
                            <div class="col-sm-4">
                                <input type="text" class="form-control col-sm-4" maxlength="30"
                                       placeholder="Назва додаткового параметру" :name="'otherDataName_'+index"
                                       v-model="item.name">
                            </div>
                            <div class="col-sm-4">
                                <input type="text" class="form-control col-sm-4" maxlength="100"
                                       :name="'otherDataValue_'+index"
                                       v-model="item.value">
                            </div>
                            <button type="button" class="btn btn-danger" title="Видалити цей параметр"
                                    @click="removeOtherData(index, item.id_data)"
                                    v-if="formData.numberOtherData > 1 && index != formData.numberOtherData - 1">
                                <span class="glyphicon glyphicon-glyphicon glyphicon-remove"
                                      aria-hidden="true"></span>
                            </button>
                            <button type="button" class="btn btn-success" title="Додати ще один додатковий параметр"
                                    @click="addOtherData" v-if="index == (formData.numberOtherData -1)">
                                <span class="glyphicon glyphicon-plus"
                                      aria-hidden="true"></span>
                            </button>
                        </div>
                    </template>
                    <template v-if="formData.category != ''">
                        <div class="form-group" data-block="description">
                            <label for="description" class="col-sm-4 text-right">Опис</label>
                            <div class="col-sm-8">
                                <textarea class="form-control" maxlength="2000" v-model="formData.description"
                                          name="description" id="description" rows="5"></textarea>
                            </div>
                        </div>
                    </template>
                    <template v-if="formData.category != ''">
                        <div class="col-sm-offset-4 col-sm-4">
                            <div class="form-inline" data-block="submit">
                                <button type="submit" class="btn btn-success btn-lg">Зберегти</button>
                                @if (isset($data['update']))
                                    <button type="button" class="btn btn-danger btn-lg" data-toggle="modal"
                                            data-target=".bs-example-modal-sm">Видалити
                                    </button>
                                @endif
                            </div>
                        </div>
                    </template>
                    <br><br>
                </form>
            </div>


        </div>
        <div id="fine-uploader-gallery">
        </div>
    </div>
    {{--Модальне вікно--}}
    <div class="modal fade bs-example-modal-sm" role="dialog" tabindex="-1" aria-labelledby="mySmallModalLabel"
         style="display: none;">
        <div class="modal-dialog modal-sm" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">×</span></button>
                    <h4 class="modal-title" id="mySmallModalLabel">Увага</h4>
                </div>
                <div class="modal-body">
                    <p>Ви дійсно бажаєте видалити даний товар із бази даних?</p>
                </div>
                <div class="modal-footer">
                    <form method="post" action="{{url('admin/product/'.(isset($data['id_product']) ? $data['id_product'] : ""))}}" class="form-horizontal">
                        {{ csrf_field() }}
                        <input type="hidden" name="_method" value="delete">
                        <button type="button" class="btn btn-success" data-dismiss="modal">Ні</button>
                        <button type="submit" class="btn btn-danger" data-toggle="modal"
                                data-target=".bs-example-modal-sm">Видалити
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>


@endsection
@section('scripts')
    <script>
        var incomingData = {!! json_encode($data) !!};


        var addItemForm = new Vue({
            el: "#addItemForm",
            data: {
                formData: incomingData,
                build: {
                    categories: {
                        internalDoor: 'Міжкімнатні двері',
                        externalDoor: 'Вхідні двері',
                        laminate: 'Ламінат',
                        tile: 'Плитка',
                    },
                    types: {
                        shponovani: 'Шпоновані',
                        ekoshpon: 'Екошпон',
                        emal: 'Емаль',
                        sosna: 'З масиву сосни',
                        dub: 'З масиву дуба',
                        vilkha: 'З масиву вільхи',
                    },
                    availability: {
                        1: 'Є в наявності',
                        0: 'Товар закінчився'
                    },
                    producers: {},
                },

            },
            created: function () {
                if (this.formData.update == true) {
                    this.getProducersFromCategory();
                }
            },
            methods: {
                toInt(){
                    this.formData.price = parseInt(this.formData.price, 10);
                },
                getProducersFromCategory: function () {
                    url = '{{ url("/admin/producers") }}' + '/' + this.formData.category;
                    axios({
                        method: 'get',
                        url: url,
                    })
                        .then(response => {
                            this.build.producers = response.data
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                },
                addOtherData: function () {
                    //Затримка часу на повторний запит
                    if(this.wait){
                        return
                    }
                    this.wait = true
                    setTimeout(() => this.wait = false, 1000);

                    this.formData.otherData.push({name: '', value: ''});
                    this.formData.numberOtherData += 1;
                },
                removeOtherData: function (index, id_data) {
                    //Затримка часу на повторний запит
                    if(this.wait){
                        return
                    }
                    this.wait = true
                    setTimeout(() => this.wait = false, 1000);

                    if (id_data){
                        url = '{{ url("/admin/product/remove-other-data") }}' + '/' + id_data;
                        axios({
                            method: 'get',
                            url: url,
                        })
                            .then(response => {
                                runToastmessage('Параметр успішно видалений з бази даних');
                            })
                            .catch(function (error) {
                                return (console.log(error));
                            });
                    }
                    this.formData.otherData.splice(index, 1);
                    this.formData.numberOtherData -= 1;
                }
            }
        })
    </script>

    {{--galleryUploader--}}
    <script src="/vendor/fine-uploader/fine-uploader.js"></script>
    <script>
        var galleryUploader = new qq.FineUploader({
            element: document.getElementById("fine-uploader-gallery"),
            template: 'qq-template-gallery',
            extraButtons: {
                element: $('.add-to-favorite'),
            },
            autoUpload: true,
            retry: {
                enableAuto: true
            },
            request: {
                endpoint: '{{url('admin/images/uploads')}}',
                params: {
                    '_token': '{{ csrf_token() }}',
                    'id_product': '{{ (isset($data['id_product']) ? $data['id_product'] : "") }}',
                }
            },
            session: {
                endpoint: '{{url('admin/images/get')}}',
                params: {
                    'id_product': '{{ (isset($data['id_product']) ? $data['id_product'] : "") }}',
                }

            },
            deleteFile: {
                enabled: true,
                endpoint: '{{url('admin/images/delete')}}',
                method: 'POST',
                params: {
                    '_token': '{{ csrf_token() }}',
                },
            },
            validation: {
                allowedExtensions: ['jpeg', 'jpg', 'gif', 'png']
            },
            scaling: {
                hideScaled: true,
                defaultType: "image/png"
            },
        });
        $.ajaxSetup({
            data: {
                '_token': '{{ csrf_token() }}',
                'id_product': '{{ (isset($data['id_product']) ? $data['id_product'] : "") }}'
            },
        });

        function hhh(e) {
            var idImage = galleryUploader.getId(e);
            var uuid = galleryUploader.getUuid(idImage);
            $.ajax({
                type: "POST",
                url: '{{url('admin/images/logo')}}',
                data: {'uuid': uuid},
                success: function (msg) {

                }
            });
        }
    </script>

@endsection