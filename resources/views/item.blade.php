@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row">
            {!! Breadcrumbs::render(Route::currentRouteName(), $data) !!}
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-lg-4 col-sm-6">
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
            <div class="col-lg-8 col-sm-6">
                <div class="container">
                    <div class="item-info">
                        <div class="row">
                            <div class="col-lg-8 col-sm-6">
                                <div class="item-info">
                                    <h1>{{$data['name']}}</h1>
                                    <hr>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-6 col-sm-4 col-xs-8">
                                <div class="item-info">
                                    @include('layouts/'.$data['category'])
                                </div>
                            </div>
                            <div class="col-lg-2 col-sm-2 col-xs-4">
                                @if ($data['availability'])
                                    <div class="availability">Є в наявності</div>
                                @else
                                    <div class="no-availability">Товар закінчився</div>
                                @endif
                                <div class="item-id">Код: {{str_pad($data['id_product'], 4, "0", STR_PAD_LEFT)}}</div>
                                @if ($data['discount'])
                                    <div class="item-price-without-discount">{{$data['price']}}, грн</div>
                                    <div class="item-price-total">{{$data['total_price']}}, грн</div>
                                @else
                                <div class="item-price">{{$data['price']}}, грн</div>
                                @endif

                                 <a href="#" class="btn btn-success btn-block btn-lg active" role="button"  data-toggle="modal" data-target=".bayModal">Купити</a>

                            </div>
                        </div>
                    </div>

                </div>


            </div>

        </div>
    </div>
    {{--Модальне вікно bayModal--}}
    <div class="modal fade bayModal" role="dialog" tabindex="-1" aria-labelledby="bayModalLabel" style="display: none;">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header alert-success">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">×</span></button>
                    <h4 class="modal-title" id="bayModalLabel">Купити в один клік</h4>
                </div>
                <div class="modal-body">
                    <form method="post" id="buyProduct" action="{{url('admin/product/'.$data['id_product'])}}">
                        {{ csrf_field() }}
                        <input type="hidden" name="idProduct" value="{{$data['id_product']}}">
                        <p>Залиште свої контактні дані, і ми зв’яжемось з Вами у найкоротший термін</p>
                        <div class="form-group">
                            <label for="userName">Ім'я</label>
                            <input required type="text" name="userName" class="form-control" id="userName">
                        </div>
                        <div class="form-group">
                            <label for="phone">Номер телефону</label>
                            <input required type="tel" name="phone" pattern="(\+38)?0[0-9]{9}" title="Наприклад, +380912345678 або 0912345678" class="form-control" id="phone">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button id="buyProductButton" type="submit" form="buyProduct" class="btn btn-success">Виконати замовлення</button>
                </div>
            </div>
        </div>
    </div>

    {{--Модальне вікно baySuccess--}}
    <div class="modal fade baySuccess" tabindex="-1" role="dialog" aria-labelledby="baySuccessLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header alert-success">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">×</span></button>
                    <h4 class="modal-title" id="baySuccessLabel">Купити в один клік</h4>
                </div>
                <div class="modal-body">
                    <p>Ваше замовлення прийняте</p>
                    <p>Ми зв’яжемось з Вами у найкоротший термін </p>
                </div>
            </div>
        </div>
    </div>

    {{--Модальне вікно bayError--}}
    <div class="modal fade bayError" tabindex="-1" role="dialog" aria-labelledby="bayErrorLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header alert-danger">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">×</span></button>
                    <h4 class="modal-title" id="bayErrorLabel">Купити в один клік</h4>
                </div>
                <div class="modal-body">
                    <p>При виконанні замовлення виникла помилка!</p>
                    <p>Будь-ласка, повторіть замовлення або зв'яжіться з нами по телефону</p>
                </div>
            </div>
        </div>
    </div>


@endsection
@section('scripts')
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