require([
    'jquery',
    'underscore',
    'dialog',
    '/api/api',
    'select2'
], function ($, _, dialog, api) {

    // 接口
    var _api = {
        // 项目父类
        serviceList: '/api/servicelist',
        // 添加项目父类
        addSuper: '/api/addsuper',
        // 添加部门
        addDepartment: '/api/adddepartment',
        // 添加项目类别
        addServiceType: '/api/addservicetype',
        queryServiceType: '/api/queryservicetype',
        deleteServiceType: '/api/deleteservicetype'
    };

    // 选择器
    var _selector = {

        tabClass: '.tabnav-tab',
        // 两个tab
        tabOne: '#addservicetype',
        tabTwo: '#queryservicetype',

        toCheck: '.sca-input',
        superSelect: '.idList',
        departmentSelect: '.departmentList',

        tabOneForm: '#servicetype-form-add',
        tabOneSubmit: '#add-servicetype-button',
        addSuperTrigger: '#sca-add-cate-index',
        addDepartmentTrigger: '#sca-add-dept-index',

        tabTwoForm: '#servicetype-form-query',
        tabTwoSubmit: '#query-service-button',
        table: '#servicetype-table-query',
    };

    var borderColor = $(_selector.toCheck).css('borderColor');

    function renderSelectByIdAndName(array){
        var html = '';
        for (var i = 0, len = array.length; i < len; i++) {
            var arr = array[i];
            html += '<option value="' + arr.id + '">'
                +       arr.name
                +   '</option>';
        }

        return html;
    }

    api._(_api);

    // 两个下拉框数据来源请求
    $.ajax({
        url: _api.serviceList,
        method: 'POST',
        dataType: 'json'
    }).done(function (r) {
        if (r.status === 0) {
            var data = r.data;

            // 载入 触发
            $(_selector.superSelect)
                .html(renderSelectByIdAndName(data.idList));

            $(_selector.departmentSelect).html(renderSelectByIdAndName(data.departmentList));

            $('.sca-select').add('.sca-m-select').select2();
            
        }
    });

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


    // 标签1 添加项目类别 
    $(document).on('click', _selector.tabOneSubmit, function () {
        var $self = $(this);

        if (!nullValidation($self.closest('form'), _selector.toCheck)) {
            $self.next().html('* 字段信息不能为空');;
            return false;
        }
        
        $.ajax({
            url: _api.addServiceType,
            method: 'POST',
            data: $(_selector.tabOneForm).serialize(),
            dataType: 'json'
        }).done(function (r) {
            if (r.status === 0) {
                $self.next().html('* 添加成功');;
            }
        });
        return false;
    });

    var TMPL_ADD_SUPER = '<div class="sca-tc-add-scate">'
            +  '<div class="sca-tc-line">'
            +      '<span class="sca-tc-cate-note" id="tc-cate-note"></span>'
            +  '</div>'
            +  '<div class="sca-tc-line">'
            +      '<span class="sca-tc-span">项目父类名称</span><input type="text" id="p-super-name" class="sca-tc-input">'
            +  '</div>'
            +  '<div class="sca-tc-line">'
            +      '<input type="button" value="添加并继续" class="sca-tc-button" id="sca-tc-cate-submit">'
            +      '<input type="button" value="返回" class="sca-tc-button" id="sca-tc-cate-close">'
            +   '</div>'
            +   '</div>';
    // 标签1 添加项目父类
    $(document).on('click', _selector.addSuperTrigger, function(){

        var d = dialog({
            title: '添加项目父类',
            content: TMPL_ADD_SUPER,
            skin: 'yyc-dialog',
            onshow: function () {
                var self = this;
                var $this = $(self.node);
                $('#sca-tc-cate-submit', $this).on('click', function () {
                    $.ajax({
                        url: _api.addSuper,
                        method: 'post',
                        data: {
                            superName: $('#p-super-name', $this).val()
                        },
                        dataType: 'json'
                    }).done(function (r) {
                        if (r.status === 0) {
                            $('#tc-cate-note').html('完成项目父类添加');
                        }
                    });
                
                });

                $('#sca-tc-cate-close', $this).on('click', function () {
                    self.close().remove();
                });

            }
        }).showModal();
        
        
    });



    // 查询结果表格项模板
    var TABLE_ITEM_TMPL =  '<%_.each(serviceTypeList, function(service){%>'
                        +  '<tr data-serviceid="<%-service.serviceTypeId%>" data-name="<%-service.serviceTypeName%>">'
                        +     '<td><%-service.serviceTypeName%></td>'
                        +     '<td><%-service.superName%></td>'
                        +     '<td><%-departmentName%></td>'
                        +     '<td>'
                        +         '<a class="opr-delete" href="javascript:void(0);">删除</a>'
                        +     '</td>'
                        +  '</tr>'
                        +  '<%});%>';

    // 标签2 查询
    $(document).on('click', _selector.tabTwoSubmit, function () {
        var $self = $(this);

        $.ajax({
            url: _api.queryServiceType,
            method: 'POST',
            data: $(_selector.tabTwoForm).serialize(),
            dataType: 'json'
        }).done(function (r) {
            if (r.status === 0) {
                var serviceTypeList = r.data.serviceTypeList;

                var compildTmpl = _.template(TABLE_ITEM_TMPL);

                console.log(serviceTypeList);
                $(_selector.table + ' tbody').html(compildTmpl({
                    serviceTypeList: serviceTypeList,
                    departmentName: $(_selector.tabTwoSubmit).closest('form').find('.departmentList option:selected').html()
                }));
            }
        });
        return false;
    });

    // 项目删除
    $(document).on('click', _selector.table + ' .opr-delete', function (e) {
        var $target = $(e.target);
        var $tr = $(e.target).closest('tr');
        var serviceTypeId = $tr.data('serviceTypeId');
        var serviceTypeName = $tr.data('name');
        var d = dialog({
            title: '删除项目',
            content: '是否要删除<span style="font-weight:bold">' + serviceTypeName + '</span>',
            skin: 'yyc-dialog',
            okValue: '确定',
            cancelValue: '取消',
            cancel: $.noop,
            ok: function () {
                $.ajax({
                    url: _api.deleteServiceType,
                    method: 'POST',
                    dataType: 'json',
                    data:{
                        serviceTypeId: serviceTypeId,
                    }
                }).done(function (r) {
                    if (r.status === 0){
                        $tr.remove();
                    }else{
                        alert('修改失败，请重试!');
                    }
                });
            }
        }).show($target[0]);
    });

});
