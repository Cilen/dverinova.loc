<ul>
    @if($data['producer'])
        <li>
            <b>Виробник: </b> "{{$data['producer']}}"
        </li>
    @endif
        <li>
        <b>Доступна ширина: </b> {{$data['size_60']}},{{$data['size_70']}},{{$data['size_80']}},{{$data['size_90']}}
        </li>
        <li>
            <b>Висота: </b> 200 см
        </li>
    @if($data['description'])
        <li>
            {{$data['description']}}
        </li>
    @endif
</ul>