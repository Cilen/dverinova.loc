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
            fitColumns: true, //example option (sets column widths to fill table)
            columns: [ //set column definitions for imported table data
                {title: "№", field: "id_order", sorter: "number", align: "right", width: "60"},
                {title: "Назва товару", field: "product_name", sorter: "string", width: "340",
                    formatter:function(value, data, cell, row, options, formatterParams){
                        return "<a href=\'/category/" + data['product']['category'] + "/" + data['id_product']+ "\'>" + data['product']['name'] + "</a>"; // must return the html or jquery element of the html for the contents of the cell;
                    },
                },
                {title: "Ім'я", field: "user_name", sorter: "string", align: "left", width: "160"},
                {title: "Номер телефону", field: "phone", align: "left", width: "140"},
                {title: "Час замовлення", field: "created_at", sorter: "string", align: "left", formatter:"textarea", editable: true, width: "180"},
                {title: "Ціна зі знижкою", sorter: "number", align: "right", formatter:"money", width: "120",
                    formatter:function(value, data, cell, row, options, formatterParams){
                        return data['product']['total_price']; // must return the html or jquery element of the html for the contents of the cell;
                    },},
                {title: "Переглянуто",field: "viewed", sorter: "boolean",align: "center",formatter: "tick", editable: true, width: "120"},

            ],
            index: "id_product",
            cellEdited: function (id, data, value, oldVal, rowData, cell, row) {
                rowData['availability'] == true ? rowData['availability'] = 1 : rowData['availability'] = 0;
                rowData['top'] == true ? rowData['top'] = 1 : rowData['top'] = 0;
                var send = {
                    "id_order": rowData.id_order,
                    "_method": "PATCH",
                    "viewed": rowData.viewed == true ? 1: 0,
                };
                var sendURL = "orders/"+rowData.id_order;
                $.ajax({
                    type: "POST",
                    url: sendURL,
                    data: send,
                    async: true,
                    success: function (data) {
                        $().toastmessage('showToast', {
                            text     : 'Зміни успішно внесені в базу даних',
                            sticky   : true,
                            position : 'top-right',
                            type     : 'success',
                        });
                        var rowData = JSON.parse(data);
                        var row = rowData.id_order;
                        $("#product-table").tabulator("updateRow", row, data);
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        var resp = $.parseJSON(xhr.responseText);
                        $.each(resp,function(index,value){
                            $().toastmessage('showToast', {
                                text     : value,
                                inEffectDuration:  600,
                                stayTime:         3000,
                                sticky   : true,
                                position : 'top-right',
                                type     : 'error',
                            });
                        });
                        var oldRowData = {
                            "id_order": rowData.id_order,
                            "viewed": rowData.viewed,
                        };
                        oldRowData[data] = oldVal;
                        $("#product-table").tabulator("updateRow", oldRowData.id_order, oldRowData);

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