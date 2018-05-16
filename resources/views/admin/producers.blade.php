@extends('layouts.admin-tpl')
@section('content')
    <div id="producersForm">
        <div class="container">
            <div class="row">
                <h2>Комплектуючі</h2>
                <hr>
            </div>
            <div class="row">
                <div class="col-sm-4">
                    <h4>Додати виробника в БД</h4><br>
                    <div class="form-group" data-block="category">
                        <label for="category" class="">Категорія товару</label>
                        <select class="form-control" id="category" name="category" v-model="category">
                            <option v-for="(item, index) in build.categories" v-bind:value="index"
                                    v-text="item"></option>
                        </select>
                    </div>
                    <template v-if="category != ''">
                        <div class="form-group" data-block="producer">
                            <label for="producer" class="">Назва виробника</label>
                            <input type="text" class="form-control" v-model="producer" maxlength="30" name="producer"
                                   id="producer">
                        </div>
                    </template>
                    <div class="form-group">
                        <button class="form-control btn btn-sm btn-primary btn-block" type="button"
                                v-on:click="createNewProducer">Додати
                        </button>
                    </div>
                </div>
                <div class="col-sm-8">
                    <table class="table table-striped">
                        <tr>
                            <th><a>#</a></th>
                            <th><a>Виробник</a></th>
                            <th><a>Категорія</a></th>
                            <th></th>
                        </tr>
                        <tr v-for="(item, index) in incomingData" :key="item.id_producer">
                            <td v-text="item.id_producer"></td>
                            <td v-text="item.producer"></td>
                            <td v-text="build.categories[item.category]"></td>
                            <td class="text-right">
                                <div class="">
                                    {{--Кнопка РЕДАГУВАТИ--}}
                                    <button class="btn btn-xs btn-primary" type="button"
                                            data-toggle="modal" title="Редагувати"
                                            data-target=".edit-producer-modal"><span class="glyphicon glyphicon-edit"
                                                                                     aria-hidden="true"></span>
                                    </button>
                                    {{--Кнопка ВИДАЛИТИ--}}
                                    <button class="btn btn-xs btn-danger " type="button"
                                            data-toggle="modal" title="Видалити"
                                            @click="selectProducerDelete(item.id_producer, item.producer, item.category)"
                                            data-target=".delete-producer-modal"><span
                                                class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>

            </div>

        </div>

        {{--Модальне вікно "Видалити виробника"--}}
        <div class="modal fade delete-producer-modal" role="dialog" tabindex="-1" style="display: none;">
            <div class="modal-dialog" role="document">
                <div class="modal-content panel-danger">
                    <div class="modal-header panel-heading">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                    aria-hidden="true">×</span></button>
                        <h4 class="modal-title">Увага</h4>
                    </div>
                    <div class="modal-body">
                        <p>Ви дійсно бажаєте видалити цього виробника із бази даних?</p>
                        <p>Виробник: <b>@{{ producerDelete.producer }}</b></p>
                        <p>Категорія: <b>@{{ build.categories[producerDelete.category] }}</b></p>
                        <div class="has-error">
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" value="1"
                                           v-model="producerDelete.deleteWithProducts">
                                    Також видалити <b>ВСІ ТОВАРИ</b> даного виробника
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        {{ csrf_field() }}
                        <input type="hidden" name="_method" value="delete">
                        <button type="button" class="btn btn-success" data-dismiss="modal">Ні</button>
                        <button type="button" class="btn btn-danger" data-toggle="modal"
                                data-target=".delete-producer-modal"
                                @click="deleteProducerWithProducts(producerDelete.id_producer, producerDelete.deleteWithProducts)">
                            Видалити
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>


@endsection
@section('scripts')
    <script>
        axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        var producersForm = new Vue({
            el: "#producersForm",
            data: {
                build: {
                    categories: {
                        internalDoor: 'Міжкімнатні двері',
                        externalDoor: 'Вхідні двері',
                        laminate: 'Ламінат',
                        tile: 'Плитка',
                    },
                },
                incomingData: {!! $data !!},
                category: "",
                producer: "",
                _token: '{{ csrf_token() }}',
                producerDelete: {
                    id_producer: "",
                    producer: "",
                    category: "",
                    deleteWithProducts: ""
                },
                producerUpdate: {
                    id_producer: "",
                    producer: "",
                    category: ""
                }
            },
            methods: {
                createNewProducer: function () {
                    if (this.category == "" || this.producer == "") return (console.log('Незаповнені поля'));
                    axios({
                        method: 'post',
                        url: '/admin/producers',
                        data: {
                            category: this.category,
                            producer: this.producer,
                        },
                        responseType: 'text'
                    })
                        .then(response => {
                            this.incomingData = response.data;
                            runToastmessage('Виробник успішно внесений в базу даних');
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                    this.category = "";
                    this.producer = "";
                },
                selectProducerDelete: function (id_producer, producer, category) {
                    this.producerDelete.id_producer = id_producer;
                    this.producerDelete.producer = producer;
                    this.producerDelete.category = category;
                },
                deleteProducerWithProducts: function (id_producer, deleteWithProducts) {
                    url = '{{url("admin/producers")}}' + '/' + id_producer;
                    axios({
                        method: 'post',
                        url: url,
                        data: {
                            _method: 'delete',
                            id_producer,
                            deleteWithProducts,
                        }
                    })
                        .then(response => {
                            this.incomingData = response.data;
                            runToastmessage('Виробник успішно видалений із бази даних');
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }

            },

        })
    </script>


@endsection