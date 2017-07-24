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
                {title: "№", field: "id_feedback", sorter: "number", align: "right", width: "60"},
                {title: "Ім'я", field: "user_name", sorter: "string", align: "left", width: "340"},
                {title: "Номер телефону", field: "phone", align: "left", width: "340"},
                {title: "Час запиту", field: "created_at", sorter: "string", align: "left", formatter:"textarea", editable: true, width: "280"},
                {title: "Переглянуто",field: "viewed", sorter: "boolean",align: "center",formatter: "tick", editable: true, width: "120"},

            ],
            index: "id_feedback",
            cellEdited: function (id, data, value, oldVal, rowData, cell, row) {
                var send = {
                    "id_feedback": rowData.id_feedback,
                    "_method": "PATCH",
                    "viewed": rowData.viewed == true ? 1: 0,
                };
                var sendURL = "feedback/"+rowData.id_feedback;
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
                        var row = rowData.id_feedback;
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
                            "id_feedback": rowData.id_feedback,
                            "viewed": rowData.viewed,
                        };
                        oldRowData[data] = oldVal;
                        $("#product-table").tabulator("updateRow", oldRowData.id_feedback, oldRowData);

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