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
                <div class="category-title">
                    <h2>{{trans("localization.". $page['title'])}}</h2>
                    <hr>
                </div>
            </div>

        </div>
        <div class="row">
            <div class="col-md-12">
                <section>

                    <div class="row">

                        @foreach($data as $item)
                            <div class="category-item">
                                <div class="col-sm-4 col-md-3">

                                    <a href="{{url()->current().'/'.$item['id_product']}}">
                                        <div class="thumbnail">
                                            <div class="category-item-img">
                                                @if ($item['uuid'])
                                                    <img src="/storage/images/medium/{{$item['uuid'] }}.jpg" alt="">
                                                @else
                                                    <img src="/images/no-image.png" alt="">
                                                @endif
                                            </div>

                                            <div class="caption">
                                                <h4>{{$item['name']}}</h4>
                                                <p class="item-price-total">{{$item['total_price']}} грн</p>
                                            </div>
                                        </div>
                                    </a>
                                    @if ($item['discount']>0)
                                        <div class="stiker-discount">
                                            -{{$item['discount']}}%
                                        </div>
                                    @endif
                                </div>

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


    </script>
@endsection

