require([
    'jquery',
    'underscore',
    'observableArray',
    '/tabNav/tabNav',
    'dialog',
    '/notify/notify',
    '/api/api'
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
        addAdmin: '#btn-addadmin',
        addAuthority: '#add-authority-button'
    };

    // 加密信息
    var KEY = 'GiveMeAppleeeee!', IV = '!eeeeelppAeMeviG';
    var key = CryptoJS.enc.Utf8.parse(KEY);
    var iv = CryptoJS.enc.Utf8.parse(IV);

    function addAdminHandler() {
        // 添加账户
        $(_selector.addAdmin).on('click', function (e) {

            var formAuthenticated = true;
            var encryptPassword;

            // 校验
            $('.auth-input').each(function () {
                if ($(this).val() === '') {
                    formAuthenticated = false;
                }
            });       

            if (formAuthenticated) {
                encryptPassword = CryptoJS.AES.encrypt($('#password').val(), key, {iv: iv, mode:CryptoJS.mode.CBC, padding:CryptoJS.pad.ZeroPadding}).toString();
                $.ajax({
                    url: _api.addAdmin,
                    method: 'POST',
                    dataType: 'json',
                    data: {
                        username: $('#username').val(),
                        password: encryptPassword
                    }
                }).done(function (r) {
                    if (r.status === 0) {
                        // 提示清空
                        $(_selector.addAdmin).next('.help-block').html('添加账户成功，选择对应管理权限');

                        $('#username').data('username', r.data.username);
                        $(_selector.addAdmin).prop('disabled', true);
                    }else {
                        $(_selector.addAdmin).next('.help-block').html(r.info);
                    }
                });
            }else{
                $(_selector.addAdmin).next('.help-block').html('* 账户名称和密码不能为空');
            }
            
            e.stopPropagation();
            return false;
        });
    }

    function authoritySelect($dom, data) {

        var ITEM_TMPL = '<tr>'
                    +       '<td><%-permissionId%></td>'
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

    function submitFormHanlder() {
        $(_selector.addAuthority).on('click', function (e) {
            var $button = $(this);
            var checked = [];
            var username = $('#username').data('username');
            console.log(username);
            $('.auth-checkbox:checked').each(function(){
                checked.push($(this).val());
            });

            if (!username || username === '') {
                $button.next('.help-block').html('* 请先添加管理员');
                return false;
            }

            if (checked.length === 0) {
                $button.next('.help-block').html('* 至少选择一项权限');
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
                    new Notify('添加管理员成功', 2).showModal();
                    setTimeout(function () {
                        location.reload(true);
                    }, 1500);
                }else{
                    new Notify(r.info, 2).showModal();
                }

            });

            e.stopPropagation();
            return false;
        });
    }

    var CACHE_AUTHORITY_LIST = {};

    // 请求权限列表
    function requestAuthorityList() {
        
        var tml =   '<%_.each(adminList, function(element, index){%>'
                +   '<tr data-username="<%-element.username%>">'
                +      '<td class="auth-table-name-w"><%-element.username%></td>'
                +      '<td class="auth-table-date-w"><%-element.date%></td>'
                +      '<td class="auth-table-list-w">'
                +          '<%_.each(element.authorities, function(e, i){%>'
                +              '<%-e.name%> '
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
                    CACHE_AUTHORITY_LIST[admin['username']] = admin;
                }

                $('#authoritymanange table tbody').html(tmpl({
                    adminList: adminList
                }));
            }
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
            addAdminHandler();
            //selectAuthorityHandler($('#manage-authority'));
            authoritySelect($('#manage-authority'));
            submitFormHanlder();
        });

        authorityListBinding();

        tab.on('authoritymanange', function () {
            requestAuthorityList();
        });


        tab.init();
    })();

});
