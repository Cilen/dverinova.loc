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
                {title: "Код", field: "id_product", sorter: "number", align: "right", width: "60"},
                {title: "Назва товару", field: "name", sorter: "string",
                    formatter:function(value){
                    var data = value.getData();
                        return "<a href=\'/category/" + data['category'] + "/" + data['id_product']+ "\'>" + data['name'] + "</a>"; // must return the html or jquery element of the html for the contents of the cell;
                    },
                },
                {title: "Категорія", field: "category_loc", sorter: "string", align: "left", width: "205"},
                {title: "Наявність",field: "availability", sorter: "boolean",align: "center",formatter: "tickCross", editor:true, width: "105"},
                {title: "Ціна", field: "price", sorter: "number", align: "right", editor:true, width: "80", validator:["max:999999", "min:0", "required", "integer"]
                    },
                {title: "Топ",field: "top", sorter: "boolean",align: "center",formatter: "tickCross", editor:true, width: "60"},
                {title: "Виробник", field: "producer_name", sorter: "string", align: "left", width: "160"},
                {align:"center", width: "60", formatter:function(value){
                    var data = value.getData();
                    return "<a href=\"product/" + data['id_product'] + "/edit\" class=\"btn btn-success btn-lg btn-xs\" role=\"button\"><i class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i></a>"; // must return the html or jquery element of the html for the contents of the cell;
                },
                }
            ],
            index: "id_product",
            cellEdited: function (data) {
                data = data.getData();
                data.availability == true ? data.availability = 1 : data.availability = 0;
                data.top == true ? data.top = 1 : data.top = 0;
                var send = {
                    "id_product": data.id_product ,
                    "availability": data.availability == true ? 1: 0,
                    "price": data.price,
                    "top": data.top == true ? 1: 0,
                };
                $.ajax({
                    type: "POST",
                    url: "product/updateAjaxData",
                    data: send,
                    async: true,
                    success: function (data) {
                        runToastmessage('Зміни успішно внесені в базу даних');
                        var rowData = JSON.parse(data);
                        var row = rowData.id_product;
                        $("#product-table").tabulator("updateRow", row, data);
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        var resp = $.parseJSON(xhr.responseText);
                        $.each(resp,function(index,value){
                            runToastmessage(value, 'error')
                        });
                        var oldRowData = {
                            "id_product": data.id_product ,
                            "name": data.name,
                            "category": data.category,
                            "availability": data.availability,
                            "price": data.price,
                            // "discount": data.discount,
                            // "total_price": data.total_price,
                            "top": data.top,
                            "id_producer": data.producer,
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