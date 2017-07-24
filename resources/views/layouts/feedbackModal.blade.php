{{--Модальне вікно feedbackModal--}}
<div class="modal fade feedbackModal" role="dialog" tabindex="-1" aria-labelledby="feedbackModalLabel" style="display: none;">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header alert-success">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">×</span></button>
                <h4 class="modal-title" id="feedbackModalLabel">Зворотній зв'язок</h4>
            </div>
            <div class="modal-body">
                <form method="post" id="feedback" action="#">
                    {{ csrf_field() }}
                    <p>Залиште свої контактні дані, і ми зв’яжемось з Вами у найкоротший термін</p>
                    <div class="form-group">
                        <label for="userName">Ім'я</label>
                        <input required type="text" name="userName" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="phone">Номер телефону</label>
                        <input required type="tel" name="phone" pattern="(\+38)?0[0-9]{9}" title="Наприклад, +380912345678 або 0912345678" class="form-control">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button id="feedbackButton" type="submit" form="feedback" class="btn btn-success">Надіслати</button>
            </div>
        </div>
    </div>
</div>

{{--Модальне вікно feedbackSuccess--}}
<div class="modal fade feedbackSuccess" tabindex="-1" role="dialog" aria-labelledby="feedbackSuccessLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header alert-success">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">×</span></button>
                <h4 class="modal-title" id="feedbackSuccessLabel">Зворотній зв'язок</h4>
            </div>
            <div class="modal-body">
                <p>Ваш запит прийнятий</p>
                <p>Ми зв’яжемось з Вами у найкоротший термін </p>
            </div>
        </div>
    </div>
</div>

{{--Модальне вікно feedbackError--}}
<div class="modal fade feedbackError" tabindex="-1" role="dialog" aria-labelledby="feedbackErrorLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header alert-danger">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">×</span></button>
                <h4 class="modal-title" id="feedbackErrorLabel">Зворотній зв'язок</h4>
            </div>
            <div class="modal-body">
                <p>При виконанні запиту виникла помилка!</p>
                <p>Будь-ласка, повторіть запит або зв'яжіться з нами по телефону</p>
            </div>
        </div>
    </div>
</div>