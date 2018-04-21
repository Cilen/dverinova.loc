<div class="row">
    <div class="door-type">
        <div class="col-sm-6">
            <input type="radio" name="door-type" id="single" value="1" v-model.number="checkedType" checked>
            <label for="single"><img src="/images/door1.png"> Одинарні</label>
        </div>
        <div class="col-sm-6">
            <input type="radio" name="door-type" id="double" value="2" v-model.number="checkedType">
            <label for="double"><img src="/images/door2.png"> Подвійні</label>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-sm-6">
        <h5>Розмір полотна</h5>
        <template v-for="(availability, name, index) in itemData.polotno" v-if="availability == 1">
            <div>
                <label>
                    <input type="radio" name="size-door1" v-bind:value="index" v-model="sizeDoor1">
                    @{{name}}
                    <span class="addition-price" v-if="price.polotno[index] != 0"> (+@{{ price.polotno[index] }} грн)</span>
                </label>
            </div>
        </template>
    </div>
    <div class="col-sm-6">
        <template v-if="checkedType == 2">
            <h5>Розмір 2-го полотна</h5>
            <template v-for="(availability, name, index) in itemData.polotno" v-if="availability == 1">
                <div>
                    <label>
                        <input type="radio" name="size-door2" v-bind:value="index" v-model="sizeDoor2">
                        @{{name}}
                        <span class="addition-price" v-if="price.polotno[index] != 0"> (+@{{ price.polotno[index] }} грн)</span>
                    </label>
                </div>
            </template>
        </template>
    </div>
</div>
<div class="row">
    <div class="col-sm-6">
        <h5>Дверна коробка</h5>
        <template v-for="(availability, name, index) in itemData.box" v-if="availability == 1">
            <div>
                <label>
                    <input type="radio" name="box" v-bind:value="index" v-model="box">
                    @{{ name }}
                    <span class="addition-price" v-if="price.box[index] != 0"> (+@{{ price.box[index] }} грн)</span>
                </label>
            </div>
        </template>
    </div>
    <div class="col-sm-6">
        <template v-if="(box != null) && (itemData.doorstep.length != 0)">
            <h5>Поріг</h5>
            <template v-for="(availability, name, index) in itemData.doorstep" v-if="availability == 1">
                <div>
                    <label>
                        <input type="radio" name="doorstep" v-bind:value="index" v-model="doorstep">
                        @{{ name }}
                        <span class="addition-price" v-if="price.doorstep[index] != 0"> (+@{{ price.doorstep[index] }} грн)</span>
                    </label>
                </div>
            </template>
        </template>
    </div>
</div>
<div class="row">
    <div class="col-sm-6">
        <h5>Лиштва</h5>
        <template v-for="(availability, name, index) in itemData.lishtva" v-if="availability == 1">
            <div>
                <label>
                    <input type="radio" name="lishtva" v-bind:value="index" v-model="lishtva">
                    @{{name}}
                    <span class="addition-price" v-if="price.lishtva[index] != 0">(+@{{ price.lishtva[index] }} грн)</span>
                </label>
            </div>
        </template>
    </div>
    <div class="col-sm-6">
        <h5>Добірна дошка</h5>
        <template v-for="(availability, name, index) in itemData.dobir" v-if="availability == 1">
            <div>
                <label>
                    <input type="radio" name="dobir" v-bind:value="index" v-model="dobir">
                    @{{name}}
                    <span class="addition-price" v-if="price.dobir[index] != 0"> (+@{{ price.dobir[index] }} грн)</span>
                </label>
            </div>
        </template>
    </div>
</div>
<div class="row">
    <div class="col-sm-6">
        <template v-if="checkedType == 2">
            <h5>Притворна планка</h5>
            <template v-for="(availability, name, index) in itemData.planka" v-if="availability == 1">
                <div>
                    <label>
                        <input type="radio" name="planka" v-bind:value="index" v-model="planka">
                        @{{name}}
                        <span class="addition-price" v-if="price.planka[index] != 0"> (+@{{ price.planka[index] }} грн)</span>
                    </label>
                </div>
            </template>
        </template>
    </div>
</div>


<ul>

    @if($data['producer'])
        <li>
            <b>Виробник: </b> "{{$data['producer']}}"
        </li>
    @endif
    <li>
        <b>Висота: </b> 200 см
    </li>
    @if($data['description'])
        <li>
            {{$data['description']}}
        </li>
    @endif
</ul>

@section('item-scripts')
    <script>
        var itemData = {
            polotno: {
                "60 x 200": 1,
                "70 x 200": 1,
                "80 x 200": 1,
                "90 x 200": 1
            },
            dobir: {
                "Без добірної дошки": 1,
                "Добірна дошка 10 см": 1,
                "Добірна дошка 15 см": 1,
                "Добірна дошка 20 см": 0
            },
            box: {
                'Без дверної коробки': 1,
                'Деревяна 80 мм': 1,
                'Деревяна 100 мм': 1
            },
            lishtva: {
                'Без лиштви': 1,
                'На одну сторону': 1,
                'На дві сторони': 1
            },
            planka: {
                "Без притворної планки": 1,
                "Притворною планка": 1
            },
            doorstep: {
                "Без порога": 1,
                "З порогом": 1
            },
            priceSingle: {
                polotno: [4580, 4580, 4580, 5580],
                dobir: [0, 137, 267, 0],
                box: [0, 307, 405],
                lishtva: [0, 265, 530],
                planka: [0, 74],
                doorstep: [0, 153]
            },
            priceDouble: {
                polotno: [4580, 4580, 4580, 5580],
                dobir: [0, 237, 367, 0],
                box: [0, 307, 405],
                lishtva: [0, 265, 530],
                planka: [0, 74],
                doorstep: [0, 153]
            },
        }

        var itemForm = new Vue({
            el: '#app',
            data: {
                itemData: itemData,
                checkedType: 1,
                box: 0,
                doorstep: 0,
                dobir: 0,
                lishtva: 0,
                planka: 0,
                sizeDoor1: 0,
                sizeDoor2: 0,
            },
            computed: {
                pohonazhPrice: function () {
                    if (this.checkedType == 1) {
                        return (this.price.box[this.box]
                            + this.price.doorstep[this.doorstep]
                            + this.price.dobir[this.dobir]
                            + this.price.lishtva[this.lishtva]);
                    } else if (this.checkedType == 2) {
                        return (this.price.box[this.box]
                            + this.price.doorstep[this.doorstep]
                            + this.price.dobir[this.dobir]
                            + this.price.lishtva[this.lishtva]
                            + this.price.planka[this.planka]);
                    } else {
                        return (0);
                    }
                },
                polotnoPrice: function () {
                    if (this.checkedType == 1) {
                        return (this.price.polotno[this.sizeDoor1]);
                    } else if (this.checkedType == 2) {
                        return (this.price.polotno[this.sizeDoor1]
                            + this.price.polotno[this.sizeDoor2]);
                    } else {
                        return (0);
                    }
                },
                totalPrice: function () {
                    return (this.polotnoPrice + this.pohonazhPrice);
                },
                price: function () {
                    if (this.checkedType == 1) {
                        return this.itemData.priceSingle;
                    } else {
                        return this.itemData.priceDouble;
                    }
                }
            },
        })

    </script>
@endsection