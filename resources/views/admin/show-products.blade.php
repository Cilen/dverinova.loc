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
                {title: "Код", field: "id_product", sorter: "number", align: "right", width: "60"},
                {title: "Назва товару", field: "name", sorter: "string",
                    formatter:function(value, data, cell, row, options, formatterParams){
                        return "<a href=\'/category/" + data['category'] + "/" + data['id_product']+ "\'>" + value + "</a>"; // must return the html or jquery element of the html for the contents of the cell;
                    },
                },
                {title: "Категорія", field: "category", sorter: "string", align: "left", width: "105"},
                {title: "Наявність",field: "availability", sorter: "boolean",align: "center",formatter: "tick", editable: true, width: "105"},
                {title: "Ціна", field: "price", sorter: "number", align: "right", formatter:"money", editable: true, width: "80"},
                {title: "Знижка", field: "discount", sorter: "number", align: "right", editable: true, width: "85"},
                {title: "Ціна зі знижкою", field: "total_price", sorter: "number", align: "right", formatter:"money", width: "140"},
                {title: "Топ",field: "top", sorter: "boolean",align: "center",formatter: "tick", editable: true, width: "60"},
                {title: "Виробник", field: "id_producer", sorter: "string", align: "left", width: "160"},
                {align:"center", width: "60", formatter:function(value, data, cell, row, options, formatterParams){
                    return "<a href=\"product/" + data['id_product'] + "/edit\" class=\"btn btn-success btn-lg btn-xs\" role=\"button\"><i class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i></a>"; // must return the html or jquery element of the html for the contents of the cell;
                },
                }
            ],
            index: "id_product",
            cellEdited: function (id, data, value, oldVal, rowData, cell, row) {
                rowData['availability'] == true ? rowData['availability'] = 1 : rowData['availability'] = 0;
                rowData['top'] == true ? rowData['top'] = 1 : rowData['top'] = 0;
                var send = {
                    "id_product": rowData.id_product ,
                    "name": rowData.name,
                    "category": rowData.category,
                    "availability": rowData.availability == true ? 1: 0,
                    "price": rowData.price,
                    "discount": rowData.discount,
                    "total_price": rowData.total_price,
                    "top": rowData.top == true ? 1: 0,
                    "id_producer": rowData.id_producer,
                };
                $.ajax({
                    type: "POST",
                    url: "product/updateAjaxData",
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
                        var row = rowData.id_product;
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
                            "id_product": rowData.id_product ,
                            "name": rowData.name,
                            "category": rowData.category,
                            "availability": rowData.availability,
                            "price": rowData.price,
                            "discount": rowData.discount,
                            "total_price": rowData.total_price,
                            "top": rowData.top,
                            "id_producer": rowData.id_producer,
                        };
                        oldRowData[data] = oldVal;
                        $("#product-table").tabulator("updateRow", oldRowData.id_product, oldRowData);

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