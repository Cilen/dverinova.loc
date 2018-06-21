@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <section>
                    <h2>Хіт продаж</h2>
                    <hr>
                    <div class="slider">
                        @foreach($top as $item)
                            <div class="category-item">
                                <a href="{{route('item', ['category' => $item['category'], 'idProduct' => $item['id_product']])}}">
                                    <div class="category-item-img">
                                        @if ($item['uuid'])
                                            <img src="/storage/images/medium/{{$item['uuid'] }}.jpg" alt="">
                                        @else
                                            <img src="/images/no-image.png" alt="">
                                        @endif
                                    </div>

                                    <div class="caption">
                                        <h4>{{trans("localization.".$item['category'])." ". $item['name']}}</h4>
                                        <p class="item-price-total">{{$item['price']}} грн</p>
                                    </div>
                                </a>
                            </div>
                        @endforeach
                    </div>
                </section>

            </div>

        </div>
    </div>
@endsection
@section('scripts')
    <script>
        $('.slider').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            dots: true,
            infinite: false,
            swipeToSlide: true,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]

        });

    </script>
@endsection
