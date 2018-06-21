<div id="internal-door-form">
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
            <template v-for="(item, name, index) in polotno"  v-if="item == 1">
                <div>
                    <label>
                        <input type="radio" name="size-door1"  v-on:change="sizeDoor1Name = name" v-bind:value="index" v-model="sizeDoor1">
                        @{{ name }}
                        <span class="addition-price"> (+@{{ itemData.price}} грн)</span>
                    </label>
                </div>
            </template>
        </div>
        <div class="col-sm-6">
            <template v-if="checkedType == 2">
                <h5>Розмір 2-го полотна</h5>
                <template v-for="(item, name, index) in polotno" v-if="item == 1">
                    <div>
                        <label>
                            <input type="radio" name="size-door2" v-on:change="sizeDoor2Name = name" v-bind:value="index" v-model="sizeDoor2">
                            @{{ name }}
                            <span class="addition-price"> (+@{{ itemData.price }} грн)</span>
                        </label>
                    </div>
                </template>
            </template>
        </div>
    </div>

    <div class="row">

    {{--Дверна коробка--}}
        <div class="col-sm-6">
            <h5 v-cloak v-if="itemData.accessories.box.data !== undefined">@{{ itemData.accessories.box.full_name }}</h5>
            <template v-for="(item, name, index) in itemData.accessories.box.data" v-if="itemData.accessories.box.data !== undefined">
                <div>
                    <label>
                        <input type="radio" name="box" v-bind:value="item" v-model="box">
                        @{{ item.name }}
                        <span class="addition-price" v-if="item.price != 0"> (+@{{ item.price }} грн)</span>
                    </label>
                </div>
            </template>
        </div>

        {{--Поріг--}}
        <div class="col-sm-6">
            <h5 v-cloak v-if="(box != null) && (itemData.accessories.doorstep.data !== undefined)">@{{ itemData.accessories.doorstep.full_name }}</h5>
            <template v-if="(box != null) && (itemData.accessories.doorstep.data !== undefined)">
                <template v-for="(item, name, index) in itemData.accessories.doorstep.data">
                    <div>
                        <label>
                            <input type="radio" name="doorstep" v-bind:value="item" v-model="doorstep">
                            @{{ item.name }}
                            <span class="addition-price" v-if="item.price != 0"> (+@{{ item.price }} грн)</span>
                        </label>
                    </div>
                </template>
            </template>
        </div>

    </div>

    <div class="row">

        {{--Лиштва--}}
        <div class="col-sm-6">
            <h5 v-cloak v-if="itemData.accessories.lishtva.data !== undefined">@{{ itemData.accessories.lishtva.full_name }}</h5>
            <template v-for="(item, name, index) in itemData.accessories.lishtva.data" v-if="itemData.accessories.lishtva.data !== undefined">
                <div>
                    <label>
                        <input type="radio" name="lishtva" v-bind:value="item" v-model="lishtva">
                        @{{item.name}}
                        <span class="addition-price" v-if="item.price != 0">(+@{{ item.price }} грн)</span>
                    </label>
                </div>
            </template>
        </div>

        {{--Добори--}}
        <div class="col-sm-6">
            <h5 v-cloak v-if="itemData.accessories.dobir.data !== undefined">@{{ itemData.accessories.dobir.full_name }}</h5>
            <template v-for="(item, name, index) in itemData.accessories.dobir.data" v-if="itemData.accessories.dobir.data !== undefined">
                <div>
                    <label>
                        <input type="radio" name="dobir" v-bind:value="item" v-model="dobir">
                        @{{item.name}}
                        <span class="addition-price"
                              v-if="item.price != 0">(@{{ item.price }} грн)</span>
                    </label>
                </div>
            </template>
        </div>

    </div>

    <div class="row">

        {{--Притворна планка--}}
        <div class="col-sm-6">
            <template v-if="checkedType == 2">
                <h5 v-if="itemData.accessories.planka.data !== undefined">@{{ itemData.accessories.planka.full_name }}</h5>
                <template v-for="(item, name, index) in itemData.accessories.planka.data" v-if="itemData.accessories.planka.data !== undefined">
                    <div>
                        <label>
                            <input type="radio" name="planka" v-bind:value="item" v-model="planka">
                            @{{item.name}}
                            <span class="addition-price" v-if="item.price != 0"> (+@{{ item.price }} грн)</span>
                        </label>
                    </div>
                </template>
            </template>
        </div>

    </div>

</div>


@section('item-scripts')
    <script>

        var itemForm = new Vue({
            el: '#internal-door-form',
            store,
            data: {
                itemData: itemData,
                polotno: {
                    "60 x 200": itemData.size_60,
                    "70 x 200": itemData.size_70,
                    "80 x 200": itemData.size_80,
                    "90 x 200": itemData.size_90
                },
                checkedType: 1,
                box: 0,
                doorstep: 0,
                dobir: 0,
                lishtva: 0,
                planka: 0,
                sizeDoor1: 0,
                sizeDoor1Name: null,
                sizeDoor2: 0,
                sizeDoor2Name: null
            },
            computed: {
                accessoriesPrice: function () {
                    if (this.checkedType == 1) {
                        return ((this.box.price || 0)
                                + (this.doorstep.price || 0)
                                + (this.dobir.price || 0)
                                + (this.lishtva.price|| 0))
                    } else if (this.checkedType == 2) {
                        return ((this.box.price || 0)
                            + (this.doorstep.price || 0)
                            + (this.dobir.price || 0)
                            + (this.lishtva.price || 0)
                            + (this.planka.price || 0));
                    } else {
                        return (0);
                    }
                },
                polotnoPrice: function () {
                    if (this.checkedType == 1) {
                        return (this.itemData.price);
                    } else if (this.checkedType == 2) {
                        return (this.itemData.price * 2);
                    } else {
                        return (0);
                    }
                },
                totalPrice: function () {
                    return (this.polotnoPrice + this.accessoriesPrice)
                },
            },
            created:function(){
                this.loadPricesToStore();
                this.loadAccessoriesToStore();
                this.loadParametersToStore()
            },
            watch: {
                totalPrice:function () {
                    this.loadPricesToStore();
                    this.loadAccessoriesToStore();
                },
                checkedType: 'loadParametersToStore',
                sizeDoor1: 'loadParametersToStore',
                sizeDoor2: 'loadParametersToStore',
            },
            methods: {
                loadPricesToStore(){
                    store.commit('savePrices', {
                        itemPrice: this.polotnoPrice,
                        accessoriesPrice: this.accessoriesPrice,
                        totalPrice: this.totalPrice
                    })
                },
                loadAccessoriesToStore(){
                    store.commit('saveAccessories', {
                        box: this.box,
                        doorstep: this.doorstep,
                        dobir: this.dobir,
                        lishtva: this.lishtva,
                        planka: this.planka})
                },
                loadParametersToStore(){
                    store.commit('saveParameters', {
                        checkedType: this.checkedType,
                        sizeDoor1: this.sizeDoor1,
                        sizeDoor2: this.sizeDoor2,
                        sizeDoor1Name: this.sizeDoor1Name,
                        sizeDoor2Name: this.sizeDoor2Name,
                    })
                }
            },
        })
    </script>
@endsection
