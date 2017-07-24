<ul>
    @if($data['producer'])
    <li>
        <b>Виробник: </b> "{{$data['producer']}}"
    </li>
    @endif
    @if($data['height'])
    <li>
        <b>Висота: </b> {{$data['height']}}
    </li>
    @endif
    @if($data['width'])
    <li>
        <b>Ширина: </b> {{$data['width']}}
    </li>
    @endif
    @if($data['thickness'])
    <li>
        <b>Товщина: </b> {{$data['thickness']}}
    </li>
    @endif
    @if($data['lock'])
    <li>
        <b>Кількість замків: </b> {{$data['lock']}}
    </li>
    @endif
    @if($data['filler'])
    <li>
        <b>Наповнювач: </b> {{$data['filler']}}
    </li>
    @endif
    @if($data['covering'])
    <li>
        <b>Покриття: </b> {{$data['covering']}}
    </li>
    @endif
    @if($data['description'])
    <li>
        {{$data['description']}}
    </li>
    @endif
</ul>