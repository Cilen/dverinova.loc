{{--Модальне вікно bayModal--}}
<div class="modal fade bayModal" role="dialog" tabindex="-1" aria-labelledby="bayModalLabel" style="display: none;">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header alert-success">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">×</span></button>
                <h4 class="modal-title" id="bayModalLabel">Купити в один клік</h4>
            </div>
            <div class="modal-body">
                <form method="post" id="buyProduct" action="{{url('admin/product/'.$data['id_product'])}}">
                    {{ csrf_field() }}
                    <input type="hidden" name="idProduct" value="{{$data['id_product']}}">
                    <input type="hidden" name="category" value="{{$data['category']}}">
                    <p>Залиште свої контактні дані, і ми зв’яжемось з Вами у найкоротший термін</p>
                    <div class="form-group">
                        <label for="userName">Ім'я</label>
                        <input required type="text" name="userName" class="form-control" id="userName">
                    </div>
                    <div class="form-group">
                        <label for="phone">Номер телефону</label>
                        <input required type="tel" name="phone" pattern="(\+38)?0[0-9]{9}" title="Наприклад, +380912345678 або 0912345678" class="form-control" id="phone">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button id="buyProductButton" type="submit" form="buyProduct" class="btn btn-success">Виконати замовлення</button>
            </div>
        </div>
    </div>
</div>

{{--Модальне вікно baySuccess--}}
<div class="modal fade baySuccess" tabindex="-1" role="dialog" aria-labelledby="baySuccessLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header alert-success">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">×</span></button>
                <h4 class="modal-title" id="baySuccessLabel">Купити в один клік</h4>
            </div>
            <div class="modal-body">
                <p>Ваше замовлення прийняте</p>
                <p>Ми зв’яжемось з Вами у найкоротший термін </p>
            </div>
        </div>
    </div>
</div>

{{--Модальне вікно bayError--}}
<div class="modal fade bayError" tabindex="-1" role="dialog" aria-labelledby="bayErrorLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header alert-danger">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">×</span></button>
                <h4 class="modal-title" id="bayErrorLabel">Купити в один клік</h4>
            </div>
            <div class="modal-body">
                <p>При виконанні замовлення виникла помилка!</p>
                <p>Будь-ласка, повторіть замовлення або зв'яжіться з нами по телефону</p>
            </div>
        </div>
    </div>
</div>