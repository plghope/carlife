require([
    'jquery',
    'underscore',
    'dialog',
    '/notify/notify',
    '/api/api',
    'select2',
    'validate'
], function ($, _, dialog, Notify, api) {


    // 接口
    var _api = {
        serviceList: '/api/servicelist',
        addService: '/api/addservice',
        queryService: '/api/queryservice',
        modifyService: '/api/modifyservice',
        deleteService: '/api/deleteservice',
        addDepartment: '/api/adddepartment'
    };

    // 选择器
    var _selector = {

        tabClass: '.tabnav-tab',
        // 两个tab
        tabOne: '#addservice',
        tabTwo: '#queryservice',

        toCheck: '.asi-input',
        superSelect: '.idList',
        typeSelect: '.subList',
        departmentSelect: '.departmentList',

        tabOneForm: '#service-form-add',
        tabOneSubmit: '#add-service-button',

        tabTwoForm: '#service-form-query',
        tabTwoSubmit: '#query-service-button',
        table: '#service-table-query',

        popupForm: '.service-form-edit',
        popupSubmit: '.edit-service-button',

        addDepartment: '#btn-add-department'
    };

    var borderColor = $(_selector.toCheck).css('borderColor');

    var CACHE_ID_LIST = {};
    var CACHE_DEPARTMENT_LIST = {};
    // 父类联动项目类别数据缓存
    var CACHE_SELECT = {};

    api._(_api);

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

    function updateDepartmentSelect() {
        $.ajax({
            url: _api.serviceList,
            method: 'POST',
            dataType: 'json'
        }).done(function (r) {
            if (r.status === 0) {
                var data = r.data;
                var departmentList = CACHE_DEPARTMENT_LIST = data.departmentList;
                $(_selector.departmentSelect).html(renderSelectByIdAndName(departmentList)).trigger('chane');
            }
        });
    }

    // 三个下拉框数据来源请求
    $.ajax({
        url: _api.serviceList,
        method: 'POST',
        dataType: 'json'
    }).done(function (r) {
        if (r.status === 0) {
            var data = r.data;
            var idList = CACHE_ID_LIST = data.idList;
            var departmentList = CACHE_DEPARTMENT_LIST = data.departmentList;

            // cache
            for (var i = 0, len = idList.length; i < len; i++) {
                var item = idList[i];
                CACHE_SELECT[item.id] = item.subList;
            }

            // 联动侦听
            $(document).on('change', _selector.superSelect, function (e) {
                var $select = $(e.target);
                var $tab = $select.closest(_selector.tabClass);
                var id = $select.val();
                if ($tab.attr('id') === _selector.tabOne.slice(1)){
                    $(_selector.typeSelect, $(_selector.tabOne)).html(renderSelectByIdAndName(CACHE_SELECT[id])).trigger('change');
                }else if ($tab.attr('id') === _selector.tabTwo.slice(1)){
                    $(_selector.typeSelect, $(_selector.tabTwo)).html(renderSelectByIdAndName(CACHE_SELECT[id])).trigger('change');
                }else{
                    $(_selector.typeSelect, $select.closest('form')).html(renderSelectByIdAndName(CACHE_SELECT[id])).trigger('change');
                }
            });

            // 载入 触发
            $(_selector.superSelect)
                .html(renderSelectByIdAndName(idList))
                .trigger('change');

            $(_selector.departmentSelect).html(renderSelectByIdAndName(departmentList));

            $('.asi-select').add($('.ssi-select')).select2();
            
        }
    });

    $(_selector.tabOneForm).validate({
        rules: {
            sId: {
                required: true
            },
            superId: {
                required: true
            },
            departmentId: {
                required: true
            },
            serviceName: {
                required: true
            },
            costPrice: {
                number: true
            },
            refrencePrice: {
                number: true
            }
        },
        submitHandler: function (form) {
            $.ajax({
                url: _api.addService,
                method: 'POST',
                data: $(_selector.tabOneForm).serialize(),
                dataType: 'json'
            }).done(function (r) {

                if (r.status === 0) {
                    new Notify('添加服务项目成功', 2).showModal();
                    setTimeout(function () {
                        window.location.reload(true);
                        
                    }, 1500);
                }else {
                    new Notify(r.info, 2).showModal();
                }
            });
            return false;
        }
    });

    // 服务项目列表缓存
    var CACHE_SERVICE = {};
    // 查询结果表格项模板
    var TABLE_ITEM_TMPL =  '<%_.each(serviceList, function(service){%>'
                        +  '<tr data-serviceid="<%-service.serviceId%>" data-servicename="<%-service.name%>">'
                        +     '<td><%-service.serviceId%></td>'
                        +     '<td><%-service.name%></td>'
                        +     '<td><%-service.superName%></td>'
                        +     '<td><%-service.typeName%></td>'
                        +     '<td><%-service.unit%></td>'
                        +     '<td><%-service.costPrice%></td>'
                        +     '<td><%-service.referencePrice%></td>'
                        +     '<td><%-service.guaranteePeriod%></td>'
                        +     '<td><%-service.pilgrimageTime%></td>'
                        +     '<td>'
                        +         '<a class="opr-edit" style="margin-right:2px;" href="javascript:void(0);">修改</a>'
                        +         '<a class="opr-delete" href="javascript:void(0);">删除</a>'
                        +     '</td>'
                        +  '</tr>'
                        +  '<%});%>';

    $(_selector.tabTwoForm).validate({
        rules: {
            superId: {
                required: true
            },
            serviceTypeId: {
                required: true
            },
            departmentId: {
                required: true
            }
        },
        submitHandler: function (form) {
            $.ajax({
                url: _api.queryService,
                method: 'POST',
                data: $(form).serialize(),
                dataType: 'json'
            }).done(function (r) {
                if (r.status === 0) {
                    var serviceList = r.data.serviceList;

                    if (serviceList.length === 0) {
                        $(_selector.table + ' tbody').html('<tr><td colspan="100%">空</td></tr>');
                    }else{
                        // clear
                        CACHE_SERVICE = {};
                        for (var i = 0, len = serviceList.length; i < len; i++) {
                            var service = serviceList[i];
                            CACHE_SERVICE[service.serviceId] = service;
                        }

                        var compildTmpl = _.template(TABLE_ITEM_TMPL);

                        $(_selector.table + ' tbody').html(compildTmpl({
                            serviceList: serviceList
                        }));
                    }

                }
            });
            return false;
        }
    });

    // 项目编辑
    $(document).on('click', _selector.table + ' .opr-edit', function (e) {
        var $tr = $(e.target).closest('tr');
        var serviceId = $tr.data('serviceid');

        
        var tmpl = _.template($('#tmpl-edit-service').html());

        var d = dialog({
            title: '修改项目',
            content: tmpl(CACHE_SERVICE[serviceId]),
            skin: 'yyc-dialog',
            onshow: function () {
                var self = this;
                var $this = $(self.node);

                $(_selector.superSelect, $this)
                    .html(renderSelectByIdAndName(CACHE_ID_LIST))
                    .trigger('change');

                $(_selector.departmentSelect, $this).html(renderSelectByIdAndName(CACHE_DEPARTMENT_LIST));

                $('.asi-select', $this).select2();
                
                $(_selector.popupForm, $this).validate({
                    rules: {
                        sId: {
                            required: true
                        },
                        superId: {
                            required: true
                        },
                        departmentId: {
                            required: true
                        },
                        serviceName: {
                            required: true
                        }
                    },
                    submitHandler: function (form) {
                        $.ajax({
                            url: _api.modifyService,
                            method: 'post',
                            data: $(form).serialize(),
                            dataType: 'json'
                        }).done(function (r) {
                            if (r.status === 0) {
                                new Notify('修改项目成功', 2).showModal();
                                setTimeout(function () {
                                    self.close().remove();
                                }, 2000);
                                
                            }
                        });
                        
                        return false;
                    }
                });
            }
        }).showModal();
    
    });

    // 项目删除
    $(document).on('click', _selector.table + ' .opr-delete', function (e) {
        var $target = $(e.target);
        var $tr = $(e.target).closest('tr');
        var serviceId = $tr.data('serviceid');
        var serviceName = $tr.data('servicename');
        var d = dialog({
            title: '删除项目',
            content: '是否要删除<span style="font-weight:bold">' + serviceName + '</span>',
            skin: 'yyc-dialog',
            okValue: '确定',
            cancelValue: '取消',
            cancel: $.noop,
            ok: function () {
                $.ajax({
                    url: _api.deleteService,
                    method: 'POST',
                    dataType: 'json',
                    data:{
                        serviceId: serviceId,
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

    var TMPL_ADD_SUPER = '<div class="sca-tc-add-scate">'
            +  '<form id="sca-add-department">'
            +  '<div class="sca-tc-line">'
            +      '<span class="sca-tc-span">部门名称</span><input type="text" name="departmentName" id="p-super-name" class="sca-tc-input form-control">'
            +  '</div>'
            +  '<div class="sca-tc-line">'
            +      '<input type="submit" value="添加并继续" class="sca-tc-button" id="sca-tc-cate-submit">'
            +      '<input type="button" value="返回" class="sca-tc-button" id="sca-tc-cate-close">'
            +   '</div>'
            +   '</form>'
            +   '</div>';
    // 标签1 添加部门
    $(document).on('click', _selector.addDepartment, function(){
        var d = dialog({
            title: '添加部门',
            content: TMPL_ADD_SUPER,
            skin: 'yyc-dialog',
            onshow: function () {
                var self = this;
                var $this = $(self.node);
                $('#sca-add-department').validate({
                    rules: {
                        departmentName: {
                            required: true
                        }
                    },
                    submitHandler: function (form) {
                        $.ajax({
                            url: _api.addDepartment,
                            method: 'post',
                            data: {
                                departmentName: $('#p-super-name', $this).val()
                            },
                            dataType: 'json'
                        }).done(function (r) {
                            if (r.status === 0) {
                                new Notify('添加部门成功', 2).showModal();
                                updateDepartmentSelect();
                            }
                        });

                        return false;
                    }
                });
                $('#sca-tc-cate-close', $this).on('click', function () {
                    self.close().remove();
                });

            }
        }).showModal();
    });



});
