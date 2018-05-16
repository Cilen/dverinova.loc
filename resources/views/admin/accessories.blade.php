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
                    <h5 for="category" class="">Категорія товару</h5>
                    <select class="form-control" id="category" name="category" v-model="formData.category"
                            @click="getProducersByCategory">
                        <option v-for="(item, index) in build.categories" v-bind:value="index"
                                v-text="item"></option>
                    </select>
                </div>
                <template v-if='build.producers != null'>
                    <div class="form-group" data-block="producer">
                        <h5 for="producer" class="">Виробник</h5>
                        <select class="form-control" id="producer" name="producer"
                                v-model="formData.idProducer"
                                @click="getAccessories(formData.category, formData.idProducer)">
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
                            <h5 class="accessories-name" v-text="typeAccessories.full_name"></h5>
                        </div>
                        <template v-for="(item, index) in formData.accessories[typeAccessories.id_type_accessories]">
                            <div class="col-sm-8">
                                <input type="text" class="form-control" maxlength="30"
                                       placeholder="Назва" v-model="item.name"
                                       v-on:input="setUpdatedProperty(item.id_type_accessories, index)">
                            </div>
                            <div class="col-sm-2">
                                <input type="number" class="form-control price" min="0" max="99999" step="0.01"
                                       placeholder="Ціна, грн" v-bind:value="item.price | toFix"
                                       v-on:click="setUpdatedProperty(item.id_type_accessories, index)"
                                       v-on:input="item.price = $event.target.value">
                            </div>
                            <div class="col-sm-2">
                                <button type="button" class="btn btn-danger" title="Видалити цей параметр"
                                        @click="removeAccessories(item.id_accessories)"
                                        v-if="item.id_accessories != null">
                                <span class="glyphicon glyphicon-remove"
                                      aria-hidden="true"></span>
                                </button>
                                <button type="button" class="btn btn-primary" title="Обновити цей параметр"
                                        @click="updateAccessories(item.id_type_accessories, index)"
                                        v-if="item.updated == true">
                                <span class="glyphicon glyphicon-ok"
                                      aria-hidden="true"></span>
                                </button>
                                <button type="button" class="btn btn-success" title="Додати параметр"
                                        @click="addAccessories(item.id_type_accessories, index)"
                                        v-if="item.id_accessories == null">
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
                wait: false,
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
                    this.formData.idProducer = null;
                    this.build.typeAccessories = null;
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
                getAccessories: function (category, idProducer) {
                    url = '{{ url("/admin/accessories/get-accessories") }}';
                    axios({
                        method: 'post',
                        url: url,
                        data: {
                            category: category,
                            id_producer: idProducer
                        }
                    })
                        .then(response => {
                            if (response.data.length != 0) {
                                this.formData.accessories = response.data.accessories;
                                this.build.typeAccessories = response.data.types;
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                },
                removeAccessories: function (idAccessories) {
                    if(this.wait){
                        return
                    }
                    this.wait = true
                    setTimeout(() => this.wait = false, 1000);
                    url = '{{ url("/admin/accessories/") }}' + '/' + idAccessories;
                    axios({
                        method: 'delete',
                        url: url,
                    })
                        .then(response => {
                            if (response.data.length != 0) {
                                this.getAccessories(this.formData.category, this.formData.idProducer)
                                runToastmessage("Комплектуючі успішно видалені з бази даних");
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                },
                addAccessories: function (idTypeAccessories, index) {
                    if(this.wait){
                        return
                    }
                    this.wait = true
                    setTimeout(() => this.wait = false, 1000);
                    var name = this.formData.accessories[idTypeAccessories][index].name;
                    var price = this.formData.accessories[idTypeAccessories][index].price || 0;
                    if (typeof name !== 'undefined' && name.length != 0) {
                        url = '{{ url("/admin/accessories") }}';
                        axios({
                            method: 'post',
                            url: url,
                            data: {
                                id_producer: this.formData.idProducer,
                                id_type_accessories: idTypeAccessories,
                                name: name,
                                price: price
                            }
                        })
                            .then(response => {
                                if (response.data.length != 0) {
                                    this.getAccessories(this.formData.category, this.formData.idProducer)
                                    runToastmessage("Комплектуючі успішно внесені в базу даних");
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    } else {
                        runToastmessage("Введіть назву комплектуючого", "error");
                        console.log('Введіть назву комплектуючого')
                    }
                },
                setUpdatedProperty: function (idTypeAccessories, index) {
                    var accessory = this.formData.accessories[idTypeAccessories][index];
                    if (typeof accessory.id_accessories !== 'undefined') {
                        accessory.updated = true;
                    }
                },
                updateAccessories: function (idTypeAccessories, index) {
                    var name = this.formData.accessories[idTypeAccessories][index].name;
                    var price = this.formData.accessories[idTypeAccessories][index].price || 0;
                    var idAccessories = this.formData.accessories[idTypeAccessories][index].id_accessories;
                    if (typeof name !== 'undefined' && name.length != 0) {
                        url = '{{ url("/admin/accessories") }}' + "/" + idAccessories;
                        axios({
                            method: 'post',
                            url: url,
                            data: {
                                _method: 'PUT',
                                price: price,
                                name: name
                            }
                        })
                            .then(response => {
                                if (response.data.length != 0) {
                                    this.getAccessories(this.formData.category, this.formData.idProducer)
                                    runToastmessage("Зміни успішно внесені в базу даних");
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    } else {
                        runToastmessage("Введіть назву комплектуючого", "error");
                    }
                },
            },
            filters: {
                toFix: function (value) {
                    if (typeof value !== 'undefined') {
                        value = parseFloat(value);
                        return value.toFixed(2);
                    }
                }
            }
        })
    </script>
@endsection