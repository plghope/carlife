require([
    'jquery',
    'select2'
], function ($) {

    // 接口
    var _api = {
        serviceList: '/api/servicelist',
        queryService: '/api/queryservice'
    };

    // 选择器
    var _selector = {
        toCheck: '.asf-input',
        superSelect: '#idList',
        typeSelect: '#subList',
        itemSelect: '#itemSelect',
        submit: '#add-service-form'
    };
    
    var borderColor = $(_selector.toCheck).css('borderColor');

    
    // 父类联动项目类别数据缓存
    var CACHE_PARENT_SELECT = {};

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
});

