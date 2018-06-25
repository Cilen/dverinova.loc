@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row">
            {!! Breadcrumbs::render(Route::currentRouteName(), $data) !!}
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-lg-3 col-sm-3">
                <div class="logo-block">
                    @if ($images)
                        <div class="slider slider-for">
                            @foreach($images as $image)
                                <div><img src="/storage/images/medium/{{$image['uuid']}}.jpg" alt=""></div>
                            @endforeach
                        </div>
                        <div class="slider slider-nav">
                            @foreach($images as $image)
                                <div><img src="/storage/images/small/{{$image['uuid']}}.jpg" alt=""></div>
                            @endforeach
                        </div>
                    @else
                        <div class="slider slider-for">
                            <div><img src="/images/no-image.png" alt=""></div>
                        </div>
                    @endif
                </div>
            </div>
            <div class="col-lg-9 col-sm-9">
                <div class="container">
                    <div class="item-info">
                        <div class="row">
                            <div class="col-lg-9 col-sm-9">
                                <div class="item-info">
                                    <h1>{{$data['name']}}</h1>
                                    <hr>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-6 col-sm-6 col-xs-8">
                                <div class="item-info">
                                    @include('layouts/'.$data['category'])

                                    <h4>Характеристики:</h4>
                                    <table class="table table-striped">
                                        @if(isset($data['producer']))
                                            <tr>
                                                <td><b>Виробник:</b></td>
                                                <td>{{$data['producer']}}</td>
                                            </tr>
                                        @endif

                                        @if(isset($data['height']))
                                            <tr>
                                                <td><b>Висота, мм:</b></td>
                                                <td>{{$data['height']}}</td>
                                            </tr>
                                        @endif

                                        @if(isset($data['length']))
                                            <tr>
                                                <td><b>Довжина, мм:</b></td>
                                                <td>{{$data['length']}}</td>
                                            </tr>
                                        @endif

                                        @if(isset($data['width']))
                                            <tr>
                                                <td><b>Ширина, мм:</b></td>
                                                <td>{{$data['width']}}</td>
                                            </tr>
                                        @endif

                                        @if(isset($data['total_area']))
                                            <tr>
                                                <td><b>Площа в упаковці, м.кв.:</b></td>
                                                <td>{{$data['total_area']}}</td>
                                            </tr>
                                        @endif

                                        @if(isset($data['thickness']))
                                            <tr>
                                                <td><b>Товщина, мм:</b></td>
                                                <td>{{$data['thickness']}}</td>
                                            </tr>
                                        @endif

                                        @if(isset($data['number_in_package']))
                                            <tr>
                                                <td><b>Кількість в упаковці:</b></td>
                                                <td>{{$data['number_in_package']}}</td>
                                            </tr>
                                        @endif

                                        @if (isset($data['otherData']))
                                            @foreach($data['otherData'] as $item)
                                                    <tr>
                                                        <td><b>{{ $item['name'] }}:</b></td>
                                                        <td>{{ $item['value'] }}</td>
                                                    </tr>
                                            @endforeach
                                        @endif
                                    </table>

                                    <h4>Опис:</h4>
                                    @if($data['description'])
                                        @foreach($data['description'] as $out)
                                        <p>{{$out}}</p>
                                        @endforeach
                                    @endif
                                </div>
                            </div>
                            <div class="col-lg-3 col-sm-3 col-xs-4">
                                <div id="total-info" class="total-info">
                                    @if ($data['availability'])
                                        <div class="availability">Є в наявності</div>
                                    @else
                                        <div class="no-availability">Товар закінчився</div>
                                    @endif
                                    <div class="item-id">Код: {{str_pad($data['id_product'], 4, "0", STR_PAD_LEFT)}}</div>
                                    @if ($data['category'] == 'internalDoor')
                                        <div class="item-price-detail">Ціна за полотно: <span v-cloak>@{{prices.itemPrice}}</span> грн</div>
                                        <div class="item-price-detail">Погонаж: <span v-cloak>@{{prices.accessoriesPrice}}</span> грн</div>
                                        <div class="item-price-detail">Ціна комплекту: <span class="item-price-total" v-cloak>@{{prices.totalPrice}}</span> грн</div>
                                    @elseif ($data['category'] == 'externalDoor')
                                            <div class="item-price-detail">Ціна дверей: <span v-cloak>@{{prices.itemPrice}}</span> грн</div>
                                            <div class="item-price-detail">Комплектуючі: <span v-cloak>@{{prices.accessoriesPrice}}</span> грн</div>
                                            <div class="item-price-detail">Ціна комплекту: <span class="item-price-total" v-cloak>@{{prices.totalPrice}}</span> грн</div>
                                    @elseif ($data['category'] == 'tile' || $data['category'] == 'laminate')
                                            <div class="item-price-detail">Ціна: <span class="item-price-total" v-cloak>@{{prices.totalPrice}}</span> грн/кв.м.</div>
                                    @else
                                            <div class="item-price-detail">Ціна: <span class="item-price-total" v-cloak>@{{prices.totalPrice}}</span> грн</div>
                                    @endif

                                    <a href="#" class="btn btn-success btn-block btn-lg active" role="button" data-toggle="modal" data-target=".bayModal">Купити</a>
                                    <a href="#" class="btn btn-success btn-block btn-lg active" role="button" data-toggle="modal" data-target=".feedbackModal">Передзвоніть мені</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    @include('layouts.orderModal')


@endsection
@section('scripts')
    <script>
    var itemData = {!! json_encode($data) !!}
    </script>
    @yield('item-scripts')
    <script>
        $(document).ready(function(){
            $('.slider-for').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                asNavFor: '.slider-nav'
            });
            if($('.slider-nav div').length > 1) {
                $('.slider-nav').show();
                $('.slider-nav').slick({
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    touchMove: false,
                    asNavFor: '.slider-for',
                    infinite: false,
                    dots: false,
                    focusOnSelect: true,
                });
            } else {
                $('.slider-nav').hide();
            }

        });
        var totalInfo = new Vue({
            el: '#total-info',
            store,
            data: {
            },
            computed: {
                prices() {
                    return this.$store.getters.getPrices;
                },
            },
            created: function(){
                if (this.prices.totalPrice == undefined) this.prices.totalPrice = itemData.price;
                if (this.prices.itemPrice == undefined) this.prices.itemPrice = 0;
                if (this.prices.accessoriesPrice == undefined) this.prices.accessoriesPrice = 0;
            },
            methods: {
            }
        });

        var bayModal = new Vue({
            el: '#bay-modal',
            store,
            data: {
                userName: "",
                phone: ""
            },
            computed: {
                accessories() {
                    return this.$store.getters.getAccessories;
                },
                parameters() {
                    return this.$store.getters.getParameters;
                },
                prices() {
                    return this.$store.getters.getPrices;
                },
            },
            created: function(){
                if (this.prices.totalPrice == undefined) this.prices.totalPrice = itemData.price;
            },
            methods: {
                bayProduct: function () {
                    $('.bayModal').modal('hide');
                    url = "{{ url("/neworder") }}";
                    axios({
                        method: 'post',
                        url: url,
                        data: {
                            userName: this.userName,
                            phone: this.phone,
                            idProduct: "{!! $data['id_product'] !!}",
                            category: "{!! $data['category'] !!}",
                            accessories: JSON.stringify(this.accessories),
                            parameters: JSON.stringify(this.parameters),
                            totalPrice: this.prices.totalPrice
                        }
                    })
                        .then(response => {
                            $('.baySuccess').modal('show');
                            console.log(response.data)
                        })
                        .catch(function (error) {
                            $('.bayError').modal('show');
                            console.log(error);
                        });
                },
            }
        });

    </script>

@endsection