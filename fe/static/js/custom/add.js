require([
    'jquery',
    'dialog',
    'underscore',
    '/notify/notify',
    '/api/api',
    'select2',
    'validate',
    'datepicker'
], function($, dialog, _, Notify, api) {

    var _selector = {
        brandSelect: '#brandSelect',
        seriesSelect: '#seriesSelect',
        provinceSelect: '#provinceSelect',
        citySelect: '#citySelect',
        districtSelect: '#districtSelect'
    };

    var _api = {
        // 品牌列表
        brandList: '/api/brandlist',
        // 型号列表
        seriesList: '/api/serieslist',
        provinceList: '/api/getprovince',
        cityList: '/api/getcity',
        districtList: '/api/getdistrict',
        queryUser: '/api/seluser',
        addUser: '/api/inscustomer',
        queryOwnerByCarNum: '/api/queryownerbycarnum'
    };

    var _TMPL_POPUP = '<% _.each(user, function(u, index){ %>'
                    +     '<tr data-userid="<%-u["user_id"]%>">'
                    +         '<td><%-u.name%></td>'
                    +         '<td><%-u["phone_num"]%></td>'
                    +         '<td><%-u["addr_province"]%><%-u["addr_city"]%><%-u["addr_district"]%></td>'
                    +         '<td><%-u["car_license_num"]%></td>'
                    +         '<td><%-u["car_license_valid_time"]%></td>'
                    +         '<td><a class="opr-confirm" href="javascript:void(0);">确定</a></td>'
                    +      '</tr>'
                    + '<% }); %>';

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

    api._(_api);

    function initRequest() {
        $('.content-select').select2();

        $('#car-dj-date').add('#datepicker-car-licenses-time').datepicker({
            autoclose: true,
            format: 'yyyy-mm-dd'
        });

        var initBrandList = (function () {
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
                                $(_selector.seriesSelect).html(renderSelectByIdAndName(r.data.seriesList, 'seriesId', 'seriesName')).trigger('change');
                            }
                        }).fail(function (r) {
                            new Notify('服务器出错', 2).showModal();
                        });
                    });

                    // 品牌列表渲染
                    $(_selector.brandSelect)
                        .html(renderSelectByIdAndName(r.data.brandList, 'brandId', 'brandName')).trigger('change');

                }
            }).fail(function (r) {
                new Notify('服务器出错', 2).showModal();
            });
        })();

        var initProvinceList = (function () {
            $.ajax({
                url: _api.provinceList,
                dataType: 'json'
            }).done(function (r){

                $(_selector.provinceSelect).on('change', function (e, city, district) {
                    $.ajax({
                        url: _api.cityList,
                        method: 'GET',
                        dataType: 'json',
                        data: {
                            'province': $(this).val()
                        }
                    }).done(function (r) {

                        $(_selector.citySelect).on('change', function () {
                            $.ajax({
                                url: _api.districtList,
                                method: 'GET',
                                dataType: 'json',
                                data: {
                                    'province': $(_selector.provinceSelect).val(),
                                    'city': $(this).val()
                                }
                            }).done(function (r) {
                                $(_selector.districtSelect)
                                    .html(renderSelectByIdAndName(r.data, 'district', 'district')).trigger('change');
                            });
                        });
                        if (city) {
                            
                        }

                        $(_selector.citySelect)
                            .html(renderSelectByIdAndName(r.data, 'city', 'city')).trigger('change');
                    });

                });
                $(_selector.provinceSelect)
                    .html(renderSelectByIdAndName(r.data, 'province', 'province')).trigger('change');

            }).fail(function (r) {
                new Notify('服务器出错', 2).showModal();
            });
        })();
    }

    function bindHanlder(){
        var _uCache = {};

        // 关联车主
        $('#rel-custom-index').on('click', function () {
            var d = dialog({
                title: '选择车主',
                content: $('#tmpl-popup').html(),
                skin: 'yyc-dialog',
                onshow: function () {
                    var self = this;
                    $('#user-form',$(this.node)).validate({
                        rules: {
                            user_name: {
                                require_from_group: [1, '.adc-tc-input']
                            },
                            phone_number: {
                                require_from_group: [1, '.adc-tc-input']
                            },
                        },
                        submitHandler: function (form) {
                            $.ajax({
                                url: _api.queryUser,
                                method: 'POST',
                                data: $(form).serialize(),
                                dataType: 'json'
                            }).done(function (r) {
                                var user = r.data.user;

                                if (user.length === 0) {
                                    $('.user-query-table tbody').html('<tr><td colspan="100%">空</td></tr>');
                                }else{
                                    for (var i = 0, len = user.length; i < len; i++) {
                                        var u = user[i];
                                        _uCache[u['user_id']] = u;
                                    }
                                    var tmpl = _.template(_TMPL_POPUP);
                                    $('.user-query-table tbody').html(tmpl({
                                        user: user
                                    }));
                                }
                            }).fail(function (r) {
                                new Notify('服务器出错', 2).showModal();
                            });
                            return false;
                        }
                    });

                    $(this.node).on('click', '.opr-confirm', function (e) {
                        var $tr = $(e.target).closest('tr');
                        var $form = $('#add-customer-form');
                        var userId = $tr.data('userid');
                        var data = _uCache[userId];
                        $('input[name="user_name"]', $form).val(data.name).prop('disabled', true);
                        $('input[name="phone_num"]', $form).val(data.phone_num).prop('disabled', true);
                        $('input[name="car_license_num"]', $form).val(data.car_license_num).prop('disabled', true);
                        $('.s-user-id', $form).remove();
                        $($form).append('<input type="hidden" value="' + userId + '" name="user_id">');
                        var $datepicker = $('input[name="car_license_valid_time"]', $form).prop('disabled', true).data('datepicker');
                        $datepicker.update(data.car_license_valid_time.slice(0,10));
                        $('#provinceSelect').val(data.addr_province).trigger('change', data.addr_city, data.addr_district);
                        $('#provinceSelect').prop('disabled', true);
                        $('#citySelect').prop('disabled', true);
                        $('#districtSelect').prop('disabled', true);
                        
                       self.close().remove();
                        
                    });

                }
            }).showModal();


        });

        // 添加客户表单Handler
        $(document).ready(function () {

            $('#add-customer-form').validate({
                rules: {
                    plate_number: {
                        required: true
                    },
                    brand: {
                        required: true
                    },
                    series_id: {
                        required: true
                    },
                    addr_province: {
                        required: true
                    },
                    addr_city: {
                        required: true
                    },
                    addr_district: {
                        required: true
                    },
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
                submitHandler: function (form) {
                    var val = $('#custom-plate-number').data('userId');
                    if (val || val !== '') {
                        new Notify('该车牌号码已被使用', 2).showModal();
                    }else{
                        $.ajax({
                            url: _api.addUser,
                            method: 'POST',
                            data: $(form).find("input[type='hidden'], :input:not(:hidden)").serialize(),
                            dataType: 'json'
                        }).done(function (r) {
                            if (r.status === 0) {
                                new Notify('添加客户成功', 2).showModal();
                            }else{
                                new Notify(r.info, 2).showModal();
                            }

                        }).fail(function (r) {
                            new Notify('服务器出错', 2).showModal();
                        });
                    }
                    return false;
                }
            });

            $(document).on('change', '#custom-plate-number', function () {
                var $input = $('#custom-plate-number');
                var val = $input.val();

                if (val === '') {
                    return;
                }

                $('#plate_number-not-found').remove();

                $.ajax({
                    url: _api.queryOwnerByCarNum,
                    method: 'POST',
                    dataType:'json',
                    data: {
                        carnum: val
                    }
                }).done(function (r) {
                    if (r.status === 0) {
                        var data = r.data;
                        if (data && data.length !== 0) {
                            $input.data('userId', data.userId);
                            $('<label id="plate_number-not-found" class="error" for="plate_number">车牌号码已存在</label>').insertAfter($input);
                        }else{
                            $input.data('userId', '');
                        }
                    }
                }).fail(function (r) {
                    new Notify('服务器出错', 2).showModal();
                });

            });
        });

    }

    initRequest();
    bindHanlder();

});

                        
