@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row">
            {!! Breadcrumbs::render() !!}
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <div class="contacts-title">
                    <h2>Адреси магазинів</h2>
                    <hr>
                </div>
            </div>
            <div class="col-xs-6">
                <h3>м.Новий Розділ, прсп. Шевченка 31</h3>
                <p><strong>Режим роботи:</strong></p>
                <p>ПН.-ПТ. 09.00 - 20.00</p>
                <p>СБ. 10.00 - 15.00</p>
                <p>НД.- вихідний</p>
            </div>
            <div class="col-xs-6">
                <iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d648.1908245231973!2d24.1498181!3d49.470087!3m2!1i1024!2i768!4f13.1!5e0!3m2!1suk!2sua!4v1503697967655" width="100%" height="400px" frameborder="0" style="border:0" allowfullscreen></iframe>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <div class="contacts-img-slider">
                    <a href="http://lorempixel.com/1050/450" data-lightbox="roadtrip">
                        <div class="contacts-img">
                            <img src="http://lorempixel.com/350/150/people" alt="">
                        </div>
                        <a href="http://lorempixel.com/1050/450" data-lightbox="roadtrip">
                            <div class="contacts-img">
                                <img src="http://lorempixel.com/350/150/transport" alt="">
                            </div>
                        </a>
                        <a href="http://lorempixel.com/1050/450" data-lightbox="roadtrip">
                            <div class="contacts-img">
                                <img src="http://lorempixel.com/350/150/nature" alt="">
                            </div>
                        </a>
                        <a href="http://lorempixel.com/1050/450" data-lightbox="roadtrip">
                            <div class="contacts-img">
                                <img src="http://lorempixel.com/350/150/sports" alt="">
                            </div>
                        </a>
                        <a href="http://lorempixel.com/1050/450" data-lightbox="roadtrip">
                            <div class="contacts-img">
                                <img src="http://lorempixel.com/350/150/technics" alt="">
                            </div>
                        </a>
                        <a href="http://lorempixel.com/1050/450" data-lightbox="roadtrip">
                            <div class="contacts-img">
                                <img src="http://lorempixel.com/350/150/fashion" alt="">
                            </div>
                        </a>
                    </a>
                </div>
            </div>

        </div>

        <div class="row">
            <div class="col-xs-12">
                <br><hr>
            </div>
            <div class="col-xs-6">
                <h3>м.Новий Розділ, прсп. Шевченка 31</h3>
                <p><strong>Режим роботи:</strong></p>
                <p>ПН.-ПТ. 09.00 - 20.00</p>
                <p>СБ. 10.00 - 15.00</p>
                <p>НД.- вихідний</p>
            </div>
            <div class="col-xs-6">
                <iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d648.1908245231973!2d24.1498181!3d49.470087!3m2!1i1024!2i768!4f13.1!5e0!3m2!1suk!2sua!4v1503697967655" width="100%" height="300px" frameborder="0" style="border:0" allowfullscreen></iframe>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <div class="contacts-img-slider">
                    <a href="http://lorempixel.com/1050/450" data-lightbox="roadtrip">
                        <div class="contacts-img">
                            <img src="http://lorempixel.com/350/150/people" alt="">
                        </div>
                        <a href="http://lorempixel.com/1050/450" data-lightbox="roadtrip">
                            <div class="contacts-img">
                                <img src="http://lorempixel.com/350/150/transport" alt="">
                            </div>
                        </a>
                        <a href="http://lorempixel.com/1050/450" data-lightbox="roadtrip">
                            <div class="contacts-img">
                                <img src="http://lorempixel.com/350/150/nature" alt="">
                            </div>
                        </a>
                        <a href="http://lorempixel.com/1050/450" data-lightbox="roadtrip">
                            <div class="contacts-img">
                                <img src="http://lorempixel.com/350/150/sports" alt="">
                            </div>
                        </a>
                        <a href="http://lorempixel.com/1050/450" data-lightbox="roadtrip">
                            <div class="contacts-img">
                                <img src="http://lorempixel.com/350/150/technics" alt="">
                            </div>
                        </a>
                        <a href="http://lorempixel.com/1050/450" data-lightbox="roadtrip">
                            <div class="contacts-img">
                                <img src="http://lorempixel.com/350/150/fashion" alt="">
                            </div>
                        </a>
                    </a>
                </div>
            </div>

        </div>
    </div>
@endsection
@section('scripts')
    <script>
        $('.contacts-img-slider').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            dots: false,
            infinite: false,
            touchMove: true,
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
    <script>
        lightbox.option({
            'albumLabel': 	"Зображення %1 із %2",
            'fadeDuration': 300,
            'resizeDuration': 300,

        })
    </script>

@endsection
