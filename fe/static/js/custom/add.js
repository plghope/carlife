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
        addUser: '/api/inscustomer'
    };

    var _TMPL_POPUP = '<% _.each(user, function(u, index){ %>'
                    +     '<tr data-userid="<%-u["user_id"]%>">'
                    +         '<td><%-u.name%></td>'
                    +         '<td><%-u["phone_num"]%></td>'
                    +         '<td><%-u["addr_province"]%><%-u["addr_city"]%><%-u["addr_district"]%></td>'
                    +         '<td><%-u["car_license_num"]%></td>'
                    +         '<td><%-u["car_license_valid_time"]%></td>'
                    +         '<td><a class="opr-confirm" href="javascript:void(0);">确定</a></td>'
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
                        });
                    });

                    // 品牌列表渲染
                    $(_selector.brandSelect)
                        .html(renderSelectByIdAndName(r.data.brandList, 'brandId', 'brandName')).trigger('change');

                }
            });
        })();

        var initProvinceList = (function () {
            $.ajax({
                url: _api.provinceList,
                dataType: 'json'
            }).done(function (r){

                $(_selector.provinceSelect).on('change', function () {
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

                        $(_selector.citySelect)
                            .html(renderSelectByIdAndName(r.data, 'city', 'city')).trigger('change');
                    });

                });
                $(_selector.provinceSelect)
                    .html(renderSelectByIdAndName(r.data, 'province', 'province')).trigger('change');

            });
        })();
    }

    function bindHanlder(){
        var _uCache = {};
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
                            });
                            return false;
                        }
                    });

                    $(this.node).on('click', '.opr-confirm', function (e) {
                        var $tr = $(e.target).closest('tr');
                        var userId = $tr.data('userid');
                        
                        var tmpl = _.template($('#user-display').html());
                        $('.exist-user')
                            .html(tmpl(_uCache[userId]))
                            .show()
                            .next().hide();
                         self.close().remove();
                        
                    });

                }
            }).showModal();


        });
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
                    $.ajax({
                        url: _api.addUser,
                        method: 'POST',
                        data: $(form).find("input[type='hidden'], :input:not(:hidden)").serialize(),
                        dataType: 'json'
                    }).done(function (r) {
                        if (r.status === 0) {
                            new Notify('添加客户成功', 2).showModal();
                        }
                    });
                    return false;
                }
            });
        });

    }

    initRequest();
    bindHanlder();

});

                        
