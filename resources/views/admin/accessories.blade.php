@extends('layouts.admin-tpl')
@section('content')

    @include('layouts/fine-product')
    <div class="container">

        <div class="row">
            <h2>Комплектуючі</h2>
            <hr>
        </div>
        <div class="row" id="accessoriesForm">
            <div class="col-sm-4">
                <div class="form-group" data-block="category">
                    <label for="category" class="">Категорія товару</label>
                    <select class="form-control" id="category" name="category" v-model="formData.category"
                            @click="getProducersByCategory">
                        <option v-for="(item, index) in build.categories" v-bind:value="index"
                                v-text="item"></option>
                    </select>
                </div>
                <template v-if='build.producers != null'>
                    <div class="form-group" data-block="producer">
                        <label for="producer" class="">Виробник</label>
                        <select class="form-control" id="producer" name="producer"
                                v-model="formData.idProducer"
                                @click="getAccessoriesByProducer(), getTypeAccessoriesByCategory()">
                            <option v-for="item in build.producers" v-bind:value="item.id_producer"
                                    v-text="item.producer"></option>
                        </select>
                    </div>
                </template>
            </div>
            <div class="col-sm-8">
                <div class="row">

                    <template v-if="build.typeAccessories != null" v-for="typeAccessories in build.typeAccessories">
                        <div class="col-sm-9">
                            <p class="accessories-name" v-text="typeAccessories.full_name"></p>
                        </div>
                        <template v-for="(item, index) in formData.accessories[typeAccessories.id_type_accessories]">
                            <div class="col-sm-8">
                                <input type="text" class="form-control col-sm-4" maxlength="30"
                                       placeholder="Назва" v-model="item.name">
                            </div>
                            <div class="col-sm-2">
                                <input type="number" class="form-control col-sm-4" min="0" max="10000" step="0.01"
                                       placeholder="Ціна, грн" v-model="item.price">
                            </div>
                            <div class="col-sm-2">
                                <button type="button" class="btn btn-danger" title="Видалити цей параметр"
                                        @click="removeAccessories(index, item.id_data)">
                                <span class="glyphicon glyphicon-glyphicon glyphicon-remove"
                                      aria-hidden="true"></span>
                                </button>
                                <button type="button" class="btn btn-success" title="Додати ще один додатковий параметр"
                                        @click="addRowAccessories(item.id_type_accessories)">
                                <span class="glyphicon glyphicon-plus"
                                      aria-hidden="true"></span>
                                </button>
                            </div>
                        </template>
                    </template>
                </div>
            </div>
        </div>
    </div>


    {{--Модальне вікно "Видалити виробника"--}}
    <div class="modal fade delete-producer-modal" role="dialog" tabindex="-1" style="display: none;">
        <div class="modal-dialog modal-sm" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">×</span></button>
                    <h4 class="modal-title">Увага</h4>
                </div>
                <div class="modal-body">
                    <p>Ви дійсно бажаєте видалити цього виробника із бази даних?</p>
                </div>
                <div class="modal-footer">
                    <form method="post" action="{{url('admin/product/')}}" class="form-horizontal">
                        {{ csrf_field() }}
                        <input type="hidden" name="_method" value="delete">
                        <button type="button" class="btn btn-success" data-dismiss="modal">Ні</button>
                        <button type="submit" class="btn btn-danger" data-toggle="modal"
                                data-target=".delete-producer-modal">Видалити
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    {{--Модальне вікно "Редагувати назву виробника"--}}
    <div class="modal fade edit-producer-modal" role="dialog" tabindex="-1" style="display: none;">
        <div class="modal-dialog modal-sm" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">×</span></button>
                    <h4 class="modal-title">Увага</h4>
                </div>
                <div class="modal-body">
                    <p>Редагувати назву виробника</p>
                </div>
                <div class="modal-footer">
                    <form method="post" action="{{url('admin/product/')}}" class="form-horizontal">
                        {{ csrf_field() }}
                        <input type="hidden" name="_method" value="delete">
                        <button type="button" class="btn btn-success" data-dismiss="modal">Ні</button>
                        <button type="submit" class="btn btn-danger" data-toggle="modal"
                                data-target=".edit-producer-modal">Видалити
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>


@endsection
@section('scripts')
    <script>


        var addItemFonm = new Vue({
            el: "#accessoriesForm",
            data: {
                formData: {
                    category: null,
                    idProducer: null,
                    accessories: {
                        0: ""
                    }
                },
                build: {
                    categories: {
                        internalDoor: 'Міжкімнатні двері',
                        externalDoor: 'Вхідні двері',
                        laminate: 'Ламінат',
                        tile: 'Плитка',
                    },
                    typeAccessories: null,
                    producers: null,
                },

            },
            created: function () {
            },
            methods: {
                getProducersByCategory: function () {
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
                getAccessoriesByProducer: function () {
                    url = '{{ url("/admin/accessories/producer") }}' + '/' + this.formData.idProducer;
                    axios({
                        method: 'get',
                        url: url,
                    })
                        .then(response => {
                            if (response.data.length != 0) {
                                this.formData.accessories = response.data;
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                },
                getTypeAccessoriesByCategory: function () {
                    url = '{{ url("/admin/accessories/type") }}' + '/' + this.formData.category;
                    axios({
                        method: 'get',
                        url: url,
                    })
                        .then(response => {
                            this.build.typeAccessories = response.data;
                            var data = response.data
                            console.log ();
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                },
                removeAccessories: function (index, id_data) {
                    console.log(index + ' ' + id_data);
                },
                addRowAccessories: function (idTypeAccessories) {
                    $data = this.getEmptyAccessories(idTypeAccessories)
                    this.formData.accessories[idTypeAccessories].push($data);
                },
                getEmptyAccessories: function (idTypeAccessories) {
                    var emptyAccessories = {
                        id_accessories: "",
                        id_producer: this.formData.idProducer,
                        id_type_accessories: idTypeAccessories,
                        name: null,
                        price: null,
                    };
                    return emptyAccessories;
                },
            },
        })
    </script>
@endsection