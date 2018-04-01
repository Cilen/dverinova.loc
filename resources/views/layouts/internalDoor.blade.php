<div class="row">
    <div class="col-sm-6">
        <input type="radio" name="door-type" id="single" value="single">
        <label for="single"><img src="/images/door1.png">Одинарні</label>
    </div>
    <div class="col-sm-6">
        <input type="radio" name="door-type" id="double" value="double">
        <label for="double"><img src="/images/door2.png">Подвійні</label>
    </div>
</div>
<div class="row">
    <div class="col-sm-6">
        <span>Розмір полотна</span>
        <div>
            <input type="radio" name="size-door1" value="60">
            <label>60 x 200</label>
        </div>
        <div>
            <input type="radio" name="size-door1" value="70">
            <label>70 x 200</label>
        </div>
        <div>
            <input type="radio" name="size-door1" value="80">
            <label>80 x 200</label>
        </div>
        <div>
            <input type="radio" name="size-door1" value="90">
            <label>90 x 200</label>
        </div>
    </div>
    <div class="col-sm-6">
        <span>Розмір 2-го полотна</span>
        <div>
            <input type="radio" name="size-door2" value="60">
            <label>60 x 200</label>
        </div>
        <div>
            <input type="radio" name="size-door2" value="70">
            <label>70 x 200</label>
        </div>
        <div>
            <input type="radio" name="size-door2" value="80">
            <label>80 x 200</label>
        </div>
        <div>
            <input type="radio" name="size-door2" value="90">
            <label>90 x 200</label>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-sm-6">
        <span>Коробка</span>
        <div>
            <input type="radio" name="doorstep" value="0">
            <label>Без порога</label>
        </div>
        <div>
            <input type="radio" name="doorstep" value="1">
            <label>З порогом</label>
        </div>
    </div>
    <div class="col-sm-6">
        <span>Лиштва</span>
        <div>
            <input type="radio" name="lishtva" value="1">
            <label>На одну сторону</label>
        </div>
        <div>
            <input type="radio" name="lishtva" value="2">
            <label>На дві сторони</label>
        </div>
    </div>
    <div class="col-sm-6">
        <span>Добірна дошка</span>
        <div>
            <input type="radio" name="dobir" value="1">
            <label>Добірна дошка 12 см</label>
        </div>
        <div>
            <input type="radio" name="dobir" value="2">
            <label>Добірна дошка 15 см</label>
        </div>
        <div>
            <input type="radio" name="dobir" value="3">
            <label>Добірна дошка 25 см</label>
        </div>
    </div>
</div>




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