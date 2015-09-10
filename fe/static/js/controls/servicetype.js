require([
    'jquery',
    'underscore',
    'dialog',
    '/api/api',
    '/notify/notify',
    'validate',
    'select2'
], function ($, _, dialog, api, Notify) {

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



    $(_selector.tabOneForm).validate({
        rules: {
            superId: {
                required: true
            },
            type: {
                required: true
            }
        },
        submitHandler: function (form) {
            $.ajax({
                url: _api.addServiceType,
                method: 'POST',
                data: $(form).serialize(),
                dataType: 'json'
            }).done(function (r) {
                if (r.status === 0) {
                    new Notify('添加项目类别成功', 2).showModal();
                }
            });
            return false;
        }
    });

    // 标签1 添加项目类别 
    $(document).on('click', _selector.tabOneSubmit, function () {
        
    });

    var TMPL_ADD_SUPER = '<div class="sca-tc-add-scate">'
            +  '<form id="sca-add-super">'
            +  '<div class="sca-tc-line">'
            +      '<span class="sca-tc-span">项目父类名称</span><input type="text" id="p-super-name" class="sca-tc-input form-control" name="superName">'
            +  '</div>'
            +  '<div class="sca-tc-line">'
            +      '<input type="submit" value="添加并继续" class="sca-tc-button" id="sca-tc-cate-submit">'
            +      '<input type="button" value="返回" class="sca-tc-button" id="sca-tc-cate-close">'
            +   '</div>'
            +   '</form>'
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
                $('#sca-add-super', $this).validate({
                    rules: {
                        superName: {
                            required: true
                        }
                    },
                    submitHandler: function (form) {
                        $.ajax({
                            url: _api.addSuper,
                            method: 'post',
                            data: {
                                superName: $('#p-super-name', $this).val()
                            },
                            dataType: 'json'
                        }).done(function (r) {
                            if (r.status === 0) {
                                new Notify('添加项目父类成功', 2).showModal();
                            }
                        });
                    }
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

                if (serviceTypeList.length == 0) {
                    $(_selector.table + ' tbody').html('<tr><td colspan="100%">空</td></tr>')
                }else{
                    var compildTmpl = _.template(TABLE_ITEM_TMPL);

                    $(_selector.table + ' tbody').html(compildTmpl({
                        serviceTypeList: serviceTypeList,
                        departmentName: $(_selector.tabTwoSubmit).closest('form').find('.departmentList option:selected').html()
                    }));
                }

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
