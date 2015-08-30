define([
    'jquery',
    'underscore',
], function ($, _) {
    require('select2');

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
        submit: '#add-service-form'
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

    function renderSelectByIdAndName(array, id, name){
        var html = '';
    
        var id = id ? id : 'id';
        var name = name ? name : 'name';
        for (var i = 0, len = array.length; i < len; i++) {
            var arr = array[i];
            html += '<option value="' + arr[id] + '">'
                +       arr[name]
                +   '</option>';
        }

        return html;
    }


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
                            $(_selector.itemSelect).html(renderSelectByIdAndName(data.serviceList, 'serviceId', 'name')).trigger('change');

                        }
                    });
                });

                // 载入 触发
                $(_selector.superSelect)
                    .html(renderSelectByIdAndName(idList))
                    .trigger('change');

                $('.asf-select').select2();
                
            }
        });

    }

    function handleBinding () {
         $(document).on('change', '#carno', function () {
            $.ajax({
                url: _api.queryOwnerByCarNum,
                method: 'POST',
                dataType:'json'
            }).done(function (r) {
                if (r.status === 0) {
                    var data = r.data;
                    if (data) {
                        $('#carno')
                            .data('userId', data.userId)
                            .next('.help-block')
                            .html('找到车主' + data.name + '.');
                    }else{
                        $('#carno')
                            .data('userId', '')
                            .next('.help-block')
                            .html('找不到该车主.');
                    }
                }
            });
        });
        $(_selector.addService).on('submit', function(){
            var tl = _.template(TMPL_SERVICE_INFO);
            var obj = transformArrayToObject($(this).serializeArray());

            obj.baseName = findOptionByValue('#idList', obj.base);
            obj.categoryName = findOptionByValue('#subList', obj.category);
            obj.nameName = findOptionByValue('#itemList', obj.name);

            
            $(tl(obj))
                .appendTo($('.asf-tab tbody'))
                .data('json', JSON.stringify(obj));
            return false;
        });

        $(document).on('click', '.opr-delete', function (e) {
            $(e.target).closest('tr').remove();
        
        });

        $(_selector.submit).on('click', function () {
            var $self = $(this);
            var collectData = (function () {
                var project = [];
                $('.asf-tab tbody tr').each(function () {
                    console.log($(this).data('json'));
                    console.log($(this).data('json'));
                    var json = $(this).data('json').replace(/'/g, '"');
                    project.push($.parseJSON(json));
                });
                return JSON.stringify({
                    'user_id': $('#carno').data('userId'),
                    'all_charge': $('#all-charge').val(),
                    'remark': $('#remark').val(),
                    'cashier': $('#cashier').val(),
                    'project': project
                });
            })();

            $.ajax({
                url: _api.serviceFormAdd,
                method: 'POST',
                dataType: 'json',
                data: {
                    input: collectData
                }
            }).done(function (r) {
                if (r.status === 0) {
                    $self.next('.help-block').html('提交成功');
                }else{
                    $self.next('.help-block').html('');
                }
            });
        });;

   
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
            initRequest();
            handleBinding();
        }
    };
});

