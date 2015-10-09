define([
    'jquery',
    'underscore',
    '/notify/notify',
    '/api/api'
], function ($, _, Notify, api) {
    require('select2');
    require('validate');

    // 接口
    var _api = {
        serviceList: '/api/servicelist',
        queryService: '/api/queryservice',
        queryOwnerByCarNum: '/api/queryownerbycarnum',
        serviceFormAdd: '/api/serviceformaddsubmit'
    };

    // 选择器
    var _selector = {
        toCheck: '.asf-input',
        superSelect: '#idList',
        typeSelect: '#subList',
        itemSelect: '#itemList',
        addService: '#add-service',
        submit: '#submit-service-all'
    };
    
    var borderColor = $(_selector.toCheck).css('borderColor');

    
    // 父类联动项目类别数据缓存
    var CACHE_PARENT_SELECT = {};

    // 明细条目模板
    var TMPL_SERVICE_INFO = '<tr>'
                        +      '<td><%-baseName%></td>'
                        +      "<td><%-categoryName%></td>"
                        +      "<td><%-nameName%></td>"
                        +      "<td><%-price%></td>"
                        +      "<td><%-operator%></td>"
                        +      "<td><%-remark%></td>"
                        +      '<td><a class="opr-delete" href="javascript:void(0);">删除</a></td>'
                        +   '</tr>';


    function renderSelectByIdAndName(array, id, name){
        var html = '';
    
        if (array) {
            var id = id ? id : 'id';
            var name = name ? name : 'name';
            for (var i = 0, len = array.length; i < len; i++) {
                var arr = array[i];
                html += '<option value="' + arr[id] + '">'
                    +       arr[name]
                    +   '</option>';
            }
        }

        return html;
    }

    var CACHE_ITEM = null;


    function initRequest() {
        $.ajax({
            url: _api.serviceList,
            method: 'POST',
            dataType: 'json'
        }).done(function (r) {
            if (r.status === 0) {
                var data = r.data;
                var idList = data.idList;

                // cache
                for (var i = 0, len = idList.length; i < len; i++) {
                    var item = idList[i];
                    CACHE_PARENT_SELECT[item.id] = item.subList;
                }

                // 联动侦听
                $(document).on('change', _selector.superSelect, function () {
                    var id = $(this).val();
                    $(_selector.typeSelect).html(renderSelectByIdAndName(CACHE_PARENT_SELECT[id])).trigger('change');
                });

                $(document).on('change', _selector.itemSelect, function () {
                    var val = $(_selector.itemSelect).val();
                    $('#service-reference-price').val(CACHE_ITEM[val].referencePrice);
                });

                $(document).on('change', _selector.typeSelect, function () {
                    var id = $(this).val();
                    var param = {
                        superId: $(_selector.superSelect).val(),
                        serviceTypeId: $(_selector.typeSelect).val()
                    };

                    $.ajax({
                        url: _api.queryService,
                        method: 'POST',
                        data: param,
                        dataType: 'json'
                    }).done(function (r) {
                        if (r.status === 0) {
                            var data = r.data;
                            var serviceList = data.serviceList;

                            CACHE_ITEM = {};

                            // key cache
                            for (var i = 0, len = serviceList.length; i < len; i++) {
                                var service = serviceList[i];
                                CACHE_ITEM[service.serviceId] = service;
                            }
                            $(_selector.itemSelect).html(renderSelectByIdAndName(serviceList, 'serviceId', 'name')).trigger('change');

                        }
                    });
                });


                // 载入 触发
                $(_selector.superSelect)
                    .html(renderSelectByIdAndName(idList))
                    .trigger('change');

                $('.asf-select').select2();
                
            }
        }).fail(function (r) {
            new Notify('服务器出错', 2).showModal();
        });

    }

    function digitFormat(digit) {
        digit = digit.toFixed(2) + '';
        while (/(\d+)(\d{3})(\.\d+)?/.test(digit)) {
            digit = digit.replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
        }
        return digit;
    }


    function handleBinding () {
         $(document).on('change', '#carno', function () {
             if ($('#carno').val() === '') {
                $('#carno')
                    .data('userId', '')
                    .next('.help-block')
                    .html('必填');
                return;
             }
            $.ajax({
                url: _api.queryOwnerByCarNum,
                method: 'POST',
                dataType:'json',
                data: {
                    carnum: $('#carno').val()
                }
            }).done(function (r) {

                $('#carno').next('.note-car').remove();
                $('#carno').next('.help-block').html('');

                if (r.status === 0) {
                    var data = r.data;

                    var noteContent = '<ul class="note-car">'
                                    +     '<li>车主姓名: ' + data.name + '</li>'
                                    +     '<li>联系电话: ' + data.phoneNum + '</li>'
                                    +     '<li>车辆品牌: ' + data.brandName + data.seriesName +'</li>'
                                    + '</ul>';
                    if (data) {
                        $('#carno').data('userId', data.userId);
                        $(noteContent).insertAfter($('#carno'));
                    }else{
                        $('#carno')
                            .data('userId', '')
                            .next('.help-block')
                            .html('找不到车主');
                    }
                }
            }).fail(function (r) {
                new Notify('服务器出错', 2).showModal();
            });
        });
        $(_selector.addService).validate({
            rules: {
                base: {
                    required: true,
                },
                category: {
                    required: true,
                },
                name: {
                    required: true,
                },
                price: {
                    required: true,
                    number: true
                }
            },
            submitHandler: function (form) {
                var tl = _.template(TMPL_SERVICE_INFO);
                var obj = transformArrayToObject($(form).serializeArray());
                var $total = $('#t-service-total');
                // 服务项目收费
                var price = parseInt($('#service-reference-price').val());

                // 更新目标金额
                var cost = parseInt($('#t-service-cost').text().replace(/[^\.0-9]/, ''), 10);
                // 更新项目计数
                var count = parseInt($('#t-service-count').text(), 10);

                obj.baseName = findOptionByValue('#idList', obj.base);
                obj.categoryName = findOptionByValue('#subList', obj.category);
                obj.nameName = findOptionByValue('#itemList', obj.name);

                
                $(tl(obj))
                    .insertBefore($total)
                    .data('json', JSON.stringify(obj))
                    .data('price', price);

                $('#t-service-count').text(++count);
                $('#t-service-cost').text(digitFormat(cost+price));
                $total.show();

                return false;
            }
        });

        $(document).on('click', '.opr-delete', function (e) {
            // 更新目标金额
            var cost = parseInt($('#t-service-cost').text().replace(/[^\.0-9]/, ''), 10);
            var count = parseInt($('#t-service-count').text(), 10);

            var price = $(e.target).closest('tr').data('price');

            $('#t-service-count').text(--count);
            $('#t-service-cost').text(digitFormat(cost - price));
            $(e.target).closest('tr').remove();

            // 每数据时隐藏
            if ($('.asf-tab tbody tr').length === 1) {
                $('#t-service-total').hide();
            
            }
            
        
        });

        // 服务单提交
        $(_selector.submit).validate({
            rules: {
                charge: {
                    required: true,
                    number: true
                }
            },
            submitHandler: function (form) {
                 if ($('#carno').val() === '' || $('#carno').data('userId') === '') {
                    $('#carno')
                        .data('userId', '')
                        .next('.help-block')
                        .html('填写有效车牌号');
                    return false;
                 }
                var $self = $(this);
                var collectData = (function () {
                    var project = [];
                    $('.asf-tab tbody tr').each(function () {
                        var json = $(this).data('json');
                        if (json) {
                            project.push($.parseJSON(json));
                        }
                    });
                    if(project.length === 0) {
                        return false;
                    }else{
                        return JSON.stringify({
                            'car_no': $('#carno').val(),
                            'all_charge': $('#all-charge').val(),
                            'remark': $('#remark').val(),
                            'cashier': $('#cashier').val(),
                            'project': project
                        });
                    }

                })();

                if (!collectData) {
                    new Notify('请添加至少一项服务项目', 2).showModal(); 
                }else{
                    $.ajax({
                        url: _api.serviceFormAdd,
                        method: 'POST',
                        dataType: 'json',
                        data: {
                            input: collectData
                        }
                    }).done(function (r) {
                        if (r.status === 0) {
                            new Notify('提交服务单成功', 2).showModal(); 
                            setTimeout(function(){
                                window.location.replace(location.href);
                            }, 2000);
                        }else{
                            new Notify(r.info || '提交出错',2).showModal(); 
                        }
                    }).fail(function (r) {
                        new Notify('服务器出错', 2).showModal();
                    });
                }

                return false;
            }
        });
   
    }
    
    function transformArrayToObject(arr){
        var obj = {};
        for (var i = 0, len = arr.length; i < len; i++) {
            var r = arr[i];
            obj[r.name] = r.value;
        }
        return obj;
    }

    function findOptionByValue(select, value){
        return $('option[value="'+value+'"]', $(select)).html();
    }

    
    return {
        init: function () {
            // 接口api化
            api._(_api);

            // 自动填充收银人员
            $('#cashier').val(window.username);

            initRequest();
            handleBinding();
        }
    };
});

