@extends('layouts.admin-tpl')

@section('content')
    <div class="container" id="order-form">
        <div class="row">
            <div class="col-sm-2">
                <a href="{{action('OrderController@index')}}" class="btn btn-warning"
                   title="Повернутись до таблиці замовлень">
                    <span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span>
                </a>
                <template v-if="viewed == 0">
                    <button class="btn btn-success" v-on:click="setViewedOrder"
                       title="Позначити замовлення, як оброблене">
                        <span class="glyphicon glyphicon-check" aria-hidden="true"></span>
                    </button>
                </template>
                <template v-if="viewed == 1">
                    <button class="btn btn-primary" v-on:click="setViewedOrder" title="Позначити замовлення, як не оброблене">
                        <span class="glyphicon glyphicon-unchecked" aria-hidden="true"></span>
                    </button>
                </template>


            </div>
            <div class="col-sm-6">
                            <h4>Характеристики:</h4>
                            <table class="table table-striped">
                                    <tr>
                                        <td><b>№ замовлення:</b></td>
                                        <td v-cloak>@{{id_order}}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Код товару</b></td>
                                        <td v-cloak>{{str_pad($data['id_product'], 4, "0", STR_PAD_LEFT)}}</td>
                                    <tr>
                                        <td><b>Назва товару</b></td>
                                        <td v-cloak><a href="{{route('item', ['category' => $data['product']['category'], 'idProduct' => $data['id_product'] ])}}">@{{ product.name }}</a> </td>
                                    </tr>
                                    <tr>
                                        <td><b>Категорія</b></td>
                                        <td v-cloak>@{{category_loc}}</td>
                                    </tr>
                                    </tr>
                                    <tr>
                                        <td><b>Ім'я клієнта</b></td>
                                        <td v-cloak>@{{user_name}}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Номер телефону</b></td>
                                        <td v-cloak>@{{phone}}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Загальна ціна</b></td>
                                        <td v-cloak>@{{total_price}} грн</td>
                                    </tr>
                                    <template v-if="product.category == 'internalDoor'">
                                        <tr>
                                            <td><b><u>В комплекті:</u></b></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td><b>Полотно #1</b></td>
                                            <td v-cloak>Розмір "@{{ parameters.sizeDoor1Name }}", (+@{{ product.price }} грн)</td>
                                        </tr>
                                        <tr v-if="parameters.checkedType == 2">
                                            <td><b>Полотно #2</b></td>
                                            <td v-cloak>Розмір "@{{ parameters.sizeDoor2Name }}", (+@{{ product.price }} грн)</td>
                                        </tr>
                                    </template>
                                    <template v-if="product.category == 'externalDoor'">
                                    </template>
                                    <template v-if="product.category == 'laminate'">
                                    </template>
                                    <template v-if="product.category == 'tile'">
                                    </template>

                                <template v-if="item.name !== undefined" v-for="item in accessories">
                                        <tr>
                                            <td><b>@{{item.type_accessories}}</b></td>
                                            <td>@{{item.name}}, (+@{{ item.price }} грн)</td>
                                        </tr>
                                    </template>

                                    {{--<tr>--}}
                                        {{--<td><b></b></td>--}}
                                        {{--<td>@{{}}</td>--}}
                                    {{--</tr>--}}
                            </table>
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
                    <form method="post" action="{{url('admin/product/'.$data['id_product'])}}" class="form-horizontal">
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
        var data = {!! json_encode($data) !!};
        var totalInfo = new Vue({
            el: '#order-form',
            data: data,
            computed: {
                prices() {
                    return 0;
                },
            },
            methods: {
                setViewedOrder: function () {
                    var viewed = this.viewed == 0 ? 1 : 0;
                    url = "{{ url("/admin/orders/".$data->id_order) }}";
                    axios({
                        method: 'post',
                        url: url,
                        data:{
                            _method: "PATCH",
                            id_order: this.id_order,
                            viewed: viewed
                        }
                    })
                        .then(response => {
                            console.log(response.data);
                            this.viewed = response.data.viewed;
                            runToastmessage("Зміни успішно внесені в базу даних");
                        })
                        .catch(function (error) {
                            console.log(error);
                            runToastmessage("При зверненні до бази даних, виникла помилка", "error");
                        });
                },
            }
        });

    </script>

@endsection