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
                {title: "№", field: "id_order", sorter: "number", align: "right", width: "60"},
                {title: "Назва товару", field: "product_name", sorter: "string", width: "368",
                    formatter:function(value){
                        data = value.getData();
                        return "<a href=\'/category/" + data['product']['category'] + "/" + data['id_product'] + "\'>" + data['product']['name'] + "</a>"; // must return the html or jquery element of the html for the contents of the cell;
                    },
                },
                {title: "Ім'я", field: "user_name", sorter: "string", align: "left", width: "160"},
                {title: "Номер телефону", field: "phone", align: "left", width: "140"},
                {title: "Час замовлення", field: "created_at", sorter: "string", align: "left", formatter:"textarea", width: "180"},
                {title: "Ціна", field: "total_price", sorter: "number", align: "right", width: "80"},
                {title: "Переглянуто",field: "viewed", sorter: "boolean",align: "center",formatter: "tickCross", editor:true, width: "120"},
                {align:"center", width: "60", formatter:function(value){
                        data = value.getData();
                        return "<a href=\"orders/" + data['id_order'] + "\" class=\"btn btn-success btn-lg btn-xs\" role=\"button\"><i class=\"glyphicon glyphicon glyphicon-file\" title=\"Детальніше\" aria-hidden=\"true\"></i></a>"; // must return the html or jquery element of the html for the contents of the cell;
                    },
                }
            ],
            index: "id_order",
            cellEdited: function (data) {
                data = data.getData()
                var send = {
                    "id_order": data.id_order,
                    "_method": "PATCH",
                    "viewed": data.viewed == true ? 1: 0,
                };
                var sendURL = "orders/"+data.id_order;
                $.ajax({
                    type: "POST",
                    url: sendURL,
                    data: send,
                    async: true,
                    success: function (data) {
                        runToastmessage('Зміни успішно внесені в базу даних');
                        var rowData = JSON.parse(data);
                        var row = rowData.id_order;
                        $("#product-table").tabulator("updateRow", row, data);
                    },
                    error: function (xhr, textStatus, errorThrown) {
                            runToastmessage("При зверненні до бази даних, виникла помилка", "error");
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