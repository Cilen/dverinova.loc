@extends('layouts.admin-tpl')
@section('content')

    @include('layouts/fine-product')
    <div class="container">
        <div class="row">
            <h2>Комплектуючі</h2>
            <hr>
        </div>
        <div class="row">
            <form id="accessoriesForm" method="post" action="{{url('admin/product/accessories')}}"
                  class="form-horizontal" id="add-product-form">
                {{ csrf_field() }}
                <div class="col-sm-3">
                    <div class="form-group" data-block="category">
                        <label for="category" class="">Категорія товару</label>
                        <select class="form-control" id="category" name="category" v-model="formData.category">
                            <option v-for="(category, index) in build.categories" v-bind:value="index"
                                    v-text="category"></option>
                        </select>
                    </div>
                    <template v-if="formData.category != ''">
                        <div class="form-group" data-block="producer">
                            <label for="producer" class="">Виробник</label>
                            <select class="form-control" id="producer" name="producer" v-model="formData.producer">
                                <option v-for="(producer, index) in build.producers" v-bind:value="index"
                                        v-text="producer"></option>
                            </select>
                        </div>
                    </template>
                    <template>
                        <div class="form-group">
                            <button class="form-control btn btn-sm btn-primary btn-block" type="button"
                                    data-toggle="modal"
                                    data-target=".edit-producer-modal">Редагувати назву виробника
                            </button>
                            <button class="form-control btn btn-sm btn-danger btn-block" type="button"
                                    data-toggle="modal"
                                    data-target=".delete-producer-modal">Видалити виробника
                            </button>
                        </div>
                    </template>
                </div>

                <div class="col-sm-8 col-sm-offset-1">
                        <div class="form-group" data-block="accessories">
                            <label for="accessories" class="">Тип комплектуючих</label>
                            <select class="form-control" id="type-accessories" name="type-accessories" v-model="formData.accessories">
                                <option v-for="(item, index) in build.accessories" v-bind:value="index"
                                        v-text="item"></option>
                            </select>
                        </div>


                </div>
            </form>
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
                formData: [],
                build: {
                    categories: {
                        internalDoor: 'Міжкімнатні двері',
                        externalDoor: 'Вхідні двері',
                        laminate: 'Ламінат',
                        tile: 'Плитка',
                    },
                    producers: {
                        1: "ТМ «Ваш Стиль»",
                        2: "ТМ «Хвоя»",
                        4: "ТМ Новий Стиль",
                        5: "ТМ «Status Doors»"
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
                    accessories: {
                        box: "Дверна коробка",
                        doorstep: "Поріг",
                        lishtva: "Лиштва",
                        dobir: "Добірна дошка",
                        planka: "Притворна планка"
                    }
                },

            },
            created: function () {

            }
        })
    </script>


@endsection