require([
    'jquery',
    'underscore',
    'observableArray',
    '/tabNav/tabNav',
    'dialog',
    '/notify/notify',
    '/api/api',
    'validate'
], function ($, _, observableArray, TabNav, dialog, Notify, api) {
    
    var _api = {
    // tab1
        // 账户
        addAdmin: '/api/addadmin',
        // 权限
        modifyAdminAuthority: '/api/modifyadminauthority',
    // tab2
        adminAuthorityList: '/api/adminauthoritylist',
        deleteAdmin: '/api/deleteadmin'
    };

    var _selector = {
        //addAdmin: '#btn-addadmin',
        addAuthority: '#add-authority-button',
        addForm: '#add-auth-form'
    };


    function submitHandler() {
        $(_selector.addForm).validate({
            rules: {
                username: {
                    required: true,
                },
                password: {
                    required: true,
                }
            },
            submitHandler: function (form) {
                var checked = [];
                $('.auth-checkbox:checked').each(function(){
                    checked.push($(this).val());
                });

                if (checked.length === 0) {
                    $(_selector.addAuthority).next('.help-block').html('至少选择一项权限');
                    return false;
                }

                $.ajax({
                    url: _api.addAdmin,
                    method: 'POST',
                    dataType: 'json',
                    data: $(form).serialize()
                }).done(function (r) {
                    if (r.status === 0) {
                        new Notify('添加管理员成功', 2).showModal();
                        setTimeout(function () {
                            location.reload(true);
                        }, 1500);
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


    function authoritySelect($dom, data) {

        var ITEM_TMPL = '<tr>'
                    +       '<td><%-name%></td>'
                    +       '<td><%-detail%></td>'
                    +       '<td><a class="auth-delete" data-id="<%-permissionId%>" href="javascript:void(0);">删除</a></td>'
                    +   '</td>';

        

        var selectAuthority = observableArray([]);

        selectAuthority.watch(function(array){
            var ret = '';
            var tmpl = _.template(ITEM_TMPL);
            for (var i = 0, len = array.length; i < len; i++) {
                ret += tmpl(array[i]);
            }

            $('.a-auth-table tbody', $dom).html(ret);

        });


        // 权限勾选
        $dom.on('change', '.auth-checkbox', function () {
            var $checkbox = $(this);
            var permissionId = +$checkbox.val();

            if ($checkbox.prop('checked') === true) {
                selectAuthority.push({
                    permissionId: permissionId,
                    name: $checkbox.data('name'),
                    detail: $checkbox.data('detail')
                });
            }else{
                selectAuthority.remove('permissionId', permissionId);
            }
        
        });

        // 权限删除
        $dom.on('click', '.auth-delete', function () {
            var permissionId = $(this).data('id');
            $('input[value="'+permissionId+'"]').prop('checked', false).trigger('change');
        });

        // 初始化数据
        if (data) {
            for (var i = 0, len = data.length; i < len; i++) {
                $('.permission-' + data[i].permissionId, $dom).prop('checked', true).trigger('change');
            }
        }
    }


    var CACHE_AUTHORITY_LIST = {};

    // 请求权限列表
    function requestAuthorityList() {
        
        var tml =   '<%_.each(adminList, function(element, index){%>'
                +   '<tr data-username="<%-element.name%>">'
                +      '<td class="auth-table-name-w"><%-element.name%></td>'
                +      '<td class="auth-table-date-w"><%-element.date%></td>'
                +      '<td class="auth-table-list-w">'
                +          '<%_.each(element.authorities, function(e, i){%>'
                +              '<% if (e) { %>'
                +                 '<%-e.name%>; '
                +              '<% } %>'
                +          '<%});%>'
                +      '</td>'
                +      '<td class="auth-table-op-w">'
                +          '<a class="opr-delete" style="margin-right: 5px;" href="javascript:void(0);">删除账户</a>'
                +          '<a class="opr-modify" href="javascript:void(0);">修改权限</a>'
                +      '</td>'
                +   '</tr>'
                +   '<%});%>';

        $.ajax({
            url: _api.adminAuthorityList,
            method: 'POST',
            dataType: 'json'
        }).done(function (r) {
            if (r.status === 0) {
                var tmpl = _.template(tml);
                var adminList = r.data.adminList;
                for (var i = 0, len = adminList.length; i < len; i++) {
                    var admin = adminList[i];
                    // 防止authorities为null的情况
                    if (!admin.authorities) {
                        adminList[i].authorities = [];
                    }
                    CACHE_AUTHORITY_LIST[admin['name']] = admin;
                }

                $('#authoritymanange table tbody').html(tmpl({
                    adminList: adminList
                }));
            }

        }).fail(function (r) {
            new Notify('服务器出错', 2).showModal();
        });
    }

    function authorityListBinding(){
        $(document).on('click', '.opr-delete', function (e) {
            var $target = $(e.target);
            var $tr = $target.closest('tr');
            var username = $tr.data('username');

            var d = dialog({
                title: '删除项目',
                content: '是否要删除<span style="font-weight:bold">' + username + '</span>',
                skin: 'yyc-dialog',
                okValue: '确定',
                cancelValue: '取消',
                cancel: $.noop,
                ok: function () {
                    $.ajax({
                        url: _api.deleteAdmin,
                        method: 'POST',
                        data:{
                            username: username
                        },
                        dataType: 'json'
                    }).done(function(r){
                        if (r.status === 0) {
                            $tr.remove();
                        }else{
                            alert('修改失败，请重试!');
                        }

                    }).fail(function (r) {
                        new Notify('服务器出错', 2).showModal();
                    });
                }
            }).show($target[0]);
        
        });
        $(document).on('click', '.opr-modify', function (e) {
            var $tr = $(e.target).closest('tr');
            var username = $tr.data('username');
            var admin = CACHE_AUTHORITY_LIST[username];
            var $dom = $('<div><div style="width:720px;">' + $('#manage-authority').clone().html() + '</div></div>');
            $dom.append('<div class="auth-line-div"><input type="button" value="保存" class="btn auth-button auth-edit-button"><p class="help-block"></p></div>');
            
            var d = dialog({
                title: '修改"' + username +'"权限',
                content: $dom.html(),
                skin: 'yyc-dialog',
                onshow: function (){
                    var $node = $(this.node);
                    // 反选
                    $('input[type="checkbox"]', $node).prop('checked', false);
                    // tbody清空
                    $('.auth-table tbody', $node).html('');
                    // 初始化构造
                    authoritySelect($node, admin.authorities);

                    $('.auth-edit-button', $node).click(function () {
                        var checked = [];
                        $('.auth-checkbox:checked', $node).each(function(){
                            checked.push($(this).val());
                        });

                        if (checked.length === 0) {
                            $(this).next('.help-block').html('* 至少选择一项权限');
                            return false;
                        }
                        $.ajax({
                            url: _api.modifyAdminAuthority,
                            method: 'POST',
                            dataType: 'json',
                            data: {
                                permissionId: checked,
                                username: username
                            }
                        }).done(function (r) {
                            if (r.status === 0) {
                                new Notify('修改权限成功', 2).showModal();
                                setTimeout(function () {
                                    location.reload(true);
                                }, 1500);
                            }else{
                                new Notify(r.info, 2).showModal();
                            }

                        }).fail(function (r) {
                            new Notify('服务器出错', 2).showModal();
                        });
                    });
                },
            }).showModal();
        
        });
    }

    // 初始化
    (function init(){

        // api 处理
        api._(_api, window.storeId);

        // tab触发
        var tab = new TabNav('.sia-nav-ul');
        tab.one('addadmin', function() {
            //selectAuthorityHandler($('#manage-authority'));
            authoritySelect($('#manage-authority'));
            submitHandler();
        });

        authorityListBinding();

        tab.on('authoritymanange', function () {
            requestAuthorityList();
        });


        tab.init();
    })();

});
