<ul>
    @if($data['producer'])
        <li>
            <b>Виробник: </b> "{{$data['producer']}}"
        </li>
    @endif
    @if($data['length'])
        <li>
            <b>Висота: </b> {{$data['length']}} мм
        </li>
    @endif
    @if($data['width'])
        <li>
            <b>Ширина: </b> {{$data['width']}} мм
        </li>
    @endif
    @if($data['thickness'])
        <li>
            <b>Товщина: </b> {{$data['thickness']}} мм
        </li>
    @endif
    @if($data['number_in_package'])
        <li>
            <b>Кількість в упаковці: </b> {{$data['number_in_package']}} шт.
        </li>
    @endif
    @if($data['total_area'])
        <li>
            <b>Загальна площа в упаковці: </b> {{$data['total_area']}} кв.м
        </li>
    @endif
    @if($data['description'])
        <li>
            {{$data['description']}}
        </li>
    @endif
</ul>