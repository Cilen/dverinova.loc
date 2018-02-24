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
                                 <a href="#" class="btn btn-success btn-block btn-lg active" role="button"  data-toggle="modal" data-target=".feedbackModal">Подзвони мені</a>

                            </div>
                        </div>
                    </div>

                </div>


            </div>

        </div>
    </div>
    @include('layouts.feedbackModal')
    @include('layouts.orderModal')


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