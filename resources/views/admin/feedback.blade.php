@extends('layouts.admin-tpl')

@section('content')
    <div class="container">
        <div class="row">
            <div id="product-table"></div>
        </div>
    </div>
@endsection
@section('scripts')
    <script>
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
    </script>
    <script>

        $("#product-table").tabulator({
            layout:"fitColumns",
            columns: [ //set column definitions for imported table data
                {title: "№", field: "id_feedback", sorter: "number", align: "right", width: "60"},
                {title: "Ім'я", field: "user_name", sorter: "string", align: "left", width: "340"},
                {title: "Номер телефону", field: "phone", align: "left", width: "340"},
                {title: "Час запиту", field: "created_at", sorter: "string", align: "left", formatter:"textarea", width: "280"},
                {title: "Переглянуто",field: "viewed", sorter: "boolean",align: "center",formatter: "tickCross", editor:true, width: "148"},

            ],
            index: "id_feedback",
            cellEdited: function (data) {
                data = data.getData()
                var send = {
                    "id_feedback": data.id_feedback,
                    "_method": "PATCH",
                    "viewed": data.viewed == true ? 1: 0,
                };
                var sendURL = "feedback/"+data.id_feedback;
                $.ajax({
                    type: "POST",
                    url: sendURL,
                    data: send,
                    async: true,
                    success: function (data) {
                        runToastmessage('Зміни успішно внесені в базу даних');
                        var rowData = JSON.parse(data);
                        var row = rowData.id_feedback;
                        $("#product-table").tabulator("updateRow", row, data);
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        var resp = $.parseJSON(xhr.responseText);
                        $.each(resp,function(index,value){
                            runToastmessage("При зверненні до бази даних, виникла помилка", "error");
                        });
                    },
                });
            },
        });

        //Завантажити дані в таблицю
        $("#product-table").tabulator("setData", {!! $data !!});

        $(window).resize(function(){
            $("#product-table").tabulator("redraw", true);
        });
    </script>

@endsection