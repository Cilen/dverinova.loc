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
                                </div>
                            </div>
                            <div class="col-lg-3 col-sm-3 col-xs-4">
                                <div class="total-info">
                                    @if ($data['availability'])
                                        <div class="availability">Є в наявності</div>
                                    @else
                                        <div class="no-availability">Товар закінчився</div>
                                    @endif
                                    <div class="item-id">Код: {{str_pad($data['id_product'], 4, "0", STR_PAD_LEFT)}}</div>
                                    @if ($data['category'] == 'internalDoor')
                                        <div class="item-price-detail">Ціна за полотно: <span v-cloak>@{{polotnoPrice}}</span> грн</div>
                                        <div class="item-price-detail">Погонаж: <span v-cloak>@{{pohonazhPrice}}</span> грн</div>
                                        <div class="item-price-detail">Ціна комплекту: <span class="item-price-total" v-cloak>@{{totalPrice}}</span> грн</div>
                                    @else
                                        <div class="item-price-detail">{{$data['price']}} грн</div>
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
            $('.slider-nav').slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                touchMove: false,
                asNavFor: '.slider-for',
                infinite: false,
                dots: false,
                focusOnSelect: true,
            });
        });
    </script>

@endsection