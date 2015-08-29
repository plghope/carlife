require([
    'jquery',
    'underscore',
    'dialog',
    'select2'
], function ($, _, dialog) {

    // 接口
    var _api = {
    // 通用
        // 发短信
        phoneMessage: '/api/sendphonemessage',
    // tab1
        // 品牌列表
        brandList: '/api/brandlist',
        // 型号列表
        seriesList: '/api/serieslist',
        // 通过车型查询车主
        queryOwnerByCar: '/api/queryownerbycar',
    // tab2
        // 项目父类 项目类别列表
        serviceList: '/api/servicelist',
        // 服务项目列表
        queryService: '/api/queryservice',
        queryOwnerByService: '/api/queryownerbyservice'
    };

    // 选择器
    var _selector = {

        tabClass: '.tabnav-tab',
        // 四个tab
        tabOne: '#series',
        tabTwo: '#service',
        tabThree: '#charge',
        tabFour: '#carnum',

        toCheck: '.null-check',
        
        // 通用
        form: '.push-message-form',
        submit: '.push-message-button',
        table: '.pd-table',
        deleteTrigger: '.opr-delete-tr',

        // tab1
        queryByCarTrigger: '#query-by-car-button',
        brandSelect: '#brandSelect',
        seriesSelect: '#seriesSelect',
        // tab2
        queryByServiceForm: '#query-by-service-form',
        superSelect: '#superSelect',
        serviceTypeSelect: '#serviceTypeSelect',
        serviceSelect: '#serviceSelect'
    };

    var borderColor = $(_selector.toCheck).css('borderColor');

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

    /**
     * 表单非空验证
     * @param {HTMLElement} $dom 表单dom对象
     * @param {string} selector 表单组件选择
     * @return {boolean} 验证是否通过
     */
    function nullValidation($dom, selector){
        var checkFlag = true;
        $(selector, $dom).each(function () {
            if ($(this).val() === '') {
                $(this).css('borderColor', '#a94442');
                checkFlag = false;
            }else{
                $(this).css('borderColor', borderColor);
            }
        });
        return checkFlag;
    }

    // 通用初始化
    var commonInit = (function () {
        // 选中项删除
        $(document).on('click', _selector.deleteTrigger, function (e) {
            var $tr = $(e.target).closest('tr');
            $tr.remove();
        });

        // 发送消息
        $(document).on('click', _selector.submit, function () {
            var $self = $(this);
            var $form = $self.closest('form');
            // clear
            $self.next().html('');

            if ($form.find('input[name="userId\[\]"]').length === 0){
                $self.next().html('* 至少选择一个用户');
                return false;
            }

            if (!nullValidation($form, _selector.toCheck)){
                $self.next().html('* 发送内容不能为空');
                return false;
            }

            $.ajax({
                url: _api.phoneMessage,
                method: 'POST',
                dataType: 'json',
                data: $form.serialize()
            }).done(function (r) {
                if (r.status === 0){
                    $self.next().html('* 发送成功');
                }
            });

            return false;
        });
    })();


    // 标签1页初始化
    var tabOneInit = (function () {

        var tmpl = '<%_.each(ownerList, function(owner){%>'
                        +  '<tr data-userid="<%-owner.userId%>">'
                        +     '<td>'
                        +         '<a class="opr-delete-tr" href="javascript:void(0);">删除</a>'
                        +         '<input type="hidden" name="userId[]" value="<%-owner.userId%>">'
                        +     '</td>'
                        +     '<td><%-owner.plateNumber%></td>'
                        +     '<td><%-owner.brandName%></td>'
                        +     '<td><%-owner.seriesName%></td>'
                        +     '<td><%-owner.name%></td>'
                        +     '<td><%-owner.phoneNum%></td>'
                        +     '<td>---</td>'
                        +  '</tr>'
                        +  '<%});%>';

        $('.pd-select').select2();

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

                // 查询侦听
                $(document).on('click', _selector.queryByCarTrigger, function (e) {
                    $.ajax({
                        url: _api.queryOwnerByCar,
                        method: 'POST',
                        dataType: 'json',
                        data: {
                            seriesId: $(_selector.tabOne + ' ' + _selector.seriesSelect).val()
                        }
                    }).done(function (r) {
                        if (r.status === 0) {
                            var template = _.template(tmpl);
                            $(_selector.tabOne + ' ' + _selector.table + ' tbody').html(template({
                                ownerList: r.data.ownerList
                            }));
                        }
                    });

                    e.stopPropagation();
                });
            }
        });
    })();

    var tabTwoInit = (function () {

        var CACHE_SELECT = {};

        // 项目父类和项目列表加载
        $.ajax({
            url: _api.serviceList,
            dataType: 'json',
            method: 'post'
        }).done(function (r) {
            if (r.status === 0) {
                var data = r.data;
                var idList = data.idList;

                // cache
                for (var i = 0, len = idList.length; i < len; i++) {
                    var item = idList[i];
                    CACHE_SELECT[item.id] = item.subList;
                }

                // 项目父类联动侦听
                $(document).on('change', _selector.superSelect, function (e) {
                    var $select = $(e.target);
                    var $tab = $select.closest(_selector.tabClass);
                    var id = $select.val();

                    $(_selector.serviceTypeSelect).html(renderSelectByIdAndName(CACHE_SELECT[id], 'id', 'name')).trigger('change');
                });

                // 项目类型联动侦听
                $(document).on('change', _selector.serviceTypeSelect, function (e) {
                    var serviceTypeId = $(this).val();
                    $.ajax({
                        url: _api.queryService,
                        method: 'post',
                        dataType: 'json',
                        data: {
                            serviceTypeId: serviceTypeId
                        }
                    }).done(function (r) {
                        if (r.status === 0){
                            $(_selector.serviceSelect).html(renderSelectByIdAndName(r.data.serviceList, 'serviceId', 'name')).trigger('change');
                        }
                    });

                });

                // 载入 触发
                $(_selector.superSelect)
                    .html(renderSelectByIdAndName(idList, 'id', 'name'))
                    .trigger('change');
            }
        });



    })();

});
