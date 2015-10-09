require([
    'jquery',
    'underscore',
    '/api/api',
    'dialog',
    '/notify/notify',
    'validate',
    'pagination',
    'datepicker',
    'select2'
],function($, _, api, dialog, Notify){
    var _api = {
        // 品牌列表
        brandList: '/api/brandlist',
        // 型号列表
        seriesList: '/api/serieslist',
        searchCustomer: '/api/selcustomer',
        modcustomer: '/api/modcustomer',
        modcar: '/api/modcar'
    };

    var _selector = {
        brandSelect: '#brandSelect',
        seriesSelect: '#seriesSelect',
    };

    var _tmpl = _.template($('#tpl-search-result').html());
    var PAGE_SIZE = 10;

    var lastFormData = null;
    var CACHE_CUSTOMER = {};

    api._(_api);

    function renderCustomerTable(customer) {
        if (!customer || customer.length === 0) {
            $('#query-table tbody').html('<tr><td colspan="100%">空</td></tr>');
        }else{
            $('#query-table tbody').html(_tmpl({
                customer: customer   
            }));
        }
    }

    
    function renderSelectByIdAndName(array, id, name){
        var html = '';
        for (var i = 0, len = array.length; i < len; i++) {
            var arr = array[i];
            html += '<option value="' + arr[id] + '">'
                +       arr[name]
                +   '</option>';
        }

        return html;
    }

    //增加分页信息
    function appendPageInfo(data, page) {
        var start = (page - 1) * PAGE_SIZE;
        var end = page * PAGE_SIZE;
        return data + '&start_idx=' + start + '&end_idx=' + end;
    }

    function cache_customer(customers){
        for (var i = 0, len = customers.length; i < len; i++) {
            var customer = customers[i];
            customers[i]['p_license_valid'] = customer['p_license_valid'].slice(0, 10);
            var id = customer['p_uid'] + '';
            CACHE_CUSTOMER[id] = customers[i];
        }
    }

    $(document).ready(function () {
        $('#search-customer-query').validate({
            rules: {
                phone_number: {
                    digits: true,
                    minlength: 11,
                    maxlength: 11
                }
            },
            messages: {
                phone_num: '手机格式为11位数字'
            },
            submitHandler: function (form) {
                $.ajax({
                    url: _api.searchCustomer,
                    data: appendPageInfo($(form).serialize(), 1),
                    method: 'POST',
                    dataType: 'json'
                }).done(function (r) {

                    var customers = r.data.customer;

                    lastFormData = $(form).serialize();
                    cache_customer(customers);

                    renderCustomerTable(customers);


                    if ($('#pagination').data('twbs-pagination')) {
                        $('#pagination').data('twbs-pagination').destroy();
                    }

                    $('#pagination').twbsPagination({
                        totalPages: Math.ceil(r.data.customer_count / PAGE_SIZE),
                        onPageClick: function (event, page) {
                            $.ajax({
                                url: _api.searchCustomer,
                                data: appendPageInfo(lastFormData, page),
                                method: 'POST',
                                dataType: 'json'
                            }).done(function (r) {
                                cache_customer(customers);
                                renderCustomerTable(r.data.customer);
                            });
                            
                        }
                    });


                }).fail(function (r) {
                    new Notify('服务器出错', 2).showModal();
                });
                return false;
            }
        });

        $('#search-customer-query').trigger('submit');
    });

    $(document).on('click', '.opr-cost', function (e) {
        var $td = $(e.target).closest('td');
        var plate = $td.siblings('.plate_number').text();
        location.href = '/serviceformsearch/storeId/' + window.storeId + '#!/plate_number=' + plate;
    });

    $(document).on('click', '.s-click-ex', function (e) {
        var $tr = $(e.target).closest('tr');
        $tr.next().toggle();;

    });

    $(document).on('click', '.opr-edit-car', function (e) {
        var $tr = $(e.target).closest('tr');
        var plate_number = $tr.data('plate');
        var userid = $tr.data('userid');

        var p_cars = CACHE_CUSTOMER[userid]['p_cars'];
        var find_car;
        for (var i = 0, len = p_cars.length; i < len; i++) {
            var car = p_cars[i];
            if (car['p_plate'] === plate_number) {
                find_car = car;
                break;
            }
        }

        var tmpl = _.template($('#tpl-s-mod-car').html());
        var d = dialog({
            title: '修改车辆信息',
            content: tmpl(find_car),
            skin: 'yyc-dialog',
            onshow: function () {

                var self = this;

                $.ajax({
                    url: _api.brandList,
                    method: 'POST',
                    dataType: 'json'
                }).done(function (r) {
                    if (r.status === 0) {
                        // 联动侦听
                        $(document).on('change', _selector.brandSelect, function(e) {
                            var $select = $(e.target);

                            var id = $select.val();

                            $.ajax({
                                url: _api.seriesList,
                                method: 'POST',
                                dataType: 'json',
                                data: {
                                    brandId: id
                                }
                            }).done(function (r) {
                                if (r.status === 0){
                                    $(_selector.seriesSelect)
                                        .html(renderSelectByIdAndName(r.data.seriesList, 'seriesId', 'seriesName'))
                                        .val(find_car['p_series_id'])
                                        .select2()
                                        .trigger('change');
                                }
                            }).fail(function (r) {
                                new Notify('服务器出错', 2).showModal();
                            });
                        });

                        // 品牌列表渲染
                        $(_selector.brandSelect)
                            .html(renderSelectByIdAndName(r.data.brandList, 'brandId', 'brandName'))
                            .val(find_car['p_brand'])
                            .select2()
                            .trigger('change');

                    }
                }).fail(function (r) {
                    new Notify('服务器出错', 2).showModal();
                });
                $('#form-mod-car').validate({
                    rules: {
                        plate_number: {
                            required: true
                        },
                        brand: {
                            required: true
                        },
                        series_id: {
                            required: true
                        }
                    },
                    submitHandler: function (form){
                        $.ajax({
                            url: _api.modcar,
                            method: 'POST',
                            dataType: 'json',
                            data: $(form).serialize()
                        }).done(function (r) {
                            
                            if (r.status === 0) {
                                new Notify('修改车辆成功', 2).showModal();
                                $('.c-name', $tr).text($('input[name="name"]', $(form)).val());
                                $('.c-phone', $tr).text($('input[name="phone_num"]', $(form)).val());
                                $('.c-license', $tr).text($('input[name="car_license_num"]', $(form)).val());
                                $('.c-valid', $tr).text($('input[name="car_license_valid_time"]', $(form)).val());
                                self.close().remove();
                                
                            }else{
                                new Notify(r.info, 2).showModal();
                            }
                        }).fail(function (r) {
                            new Notify('服务器出错', 2).showModal();
                        });
                        return false;
                    
                    }

                });
            }
                

        }).showModal();
    });

    $(document).on('click', '.opr-edit', function (e) {
        var $tr = $(e.target).closest('tr');
        var userid = $tr.data('userid');
        var tmpl = _.template($('#tpl-s-mod-user').html());

        var d = dialog({
            title: '修改车主信息',
            content: tmpl(CACHE_CUSTOMER[userid]),
            skin: 'yyc-dialog',
            onshow: function () {

                $('#datepicker-car-licenses-time').datepicker({
                    autoclose: true,
                    format: 'yyyy-mm-dd'
                });


                var self = this;
                $('#form-mod-user').validate({
                    rules: {
                        user_name: {
                            required: true
                        },
                        phone_num: {
                            required: true,
                            digits: true,
                            minlength: 11,
                            maxlength: 11
                        },
                        car_license_valid_time: {
                            dateISO: true
                        }
                    },
                    messages: {
                        phone_num: '手机格式为11位数字'
                    },
                    submitHandler: function (form){
                        $.ajax({
                            url: _api.modcustomer,
                            method: 'POST',
                            dataType: 'json',
                            data: $(form).serialize()
                        }).done(function (r) {
                            
                            if (r.status === 0) {
                                new Notify('修改客户成功', 2).showModal();
                                $('.c-name', $tr).text($('input[name="name"]', $(form)).val());
                                $('.c-phone', $tr).text($('input[name="phone_num"]', $(form)).val());
                                $('.c-license', $tr).text($('input[name="car_license_num"]', $(form)).val());
                                $('.c-valid', $tr).text($('input[name="car_license_valid_time"]', $(form)).val());
                                self.close().remove();
                                
                            }else{
                                new Notify(r.info, 2).showModal();
                            }
                        }).fail(function (r) {
                            new Notify('服务器出错', 2).showModal();
                        });
                        return false;
                    
                    }

                });
            }
                

        }).showModal();
    });
});
