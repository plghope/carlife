require([
    'jquery',
    'underscore',
    'observableArray',
    '/tabNav/tabNav',
    'dialog',
    '/notify/notify'
], function ($, _, observableArray, TabNav, dialog, Notify) {
    
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
        addAuthority: '#btn-addauthority'
    };

    // 加密信息
    var KEY = 'GiveMeAppleeeee!', IV = '!eeeeelppAeMeviG';
    var key = CryptoJS.enc.Utf8.parse(KEY);
    var iv = CryptoJS.enc.Utf8.parse(IV);

    function addAdminHandler() {
        console.log('aaa');
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


    function selectAuthorityHandler() {
        var selectAuthority = observableArray([]);
        var ITEM_TMPL = '<tr>'
                    +       '<td><%-permissionId%></td>'
                    +       '<td><%-name%></td>'
                    +       '<td><%-detail%></td>'
                    +       '<td><a class="auth-delete" data-id="<%-permissionId%>" href="javascript:void(0);">删除</a></td>'
                    +   '</td>';


        selectAuthority.watch(function(array){
            var ret = '';
            var tmpl = _.template(ITEM_TMPL);
            for (var i = 0, len = array.length; i < len; i++) {
                ret += tmpl(array[i]);
            }

            $('#auth-add-table tbody').html(ret);

        });


        // 权限勾选
        $('.tabnav-tab').on('change', '.auth-checkbox', function () {
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
        $('.tabnav-tab').on('click', '.auth-delete', function () {
            var permissionId = $(this).data('id');
            $('input[value="'+permissionId+'"]').prop('checked', false).trigger('change');
        });
    }

    function submitFormHanlder() {
        $(_selector.addAuthority).on('click', function (e) {
            var $button = $(this);
            var checked = [];
            var username = $('#username').data('username');
            $('.auth-checkbox:checked').each(function(){
                checked.push($(this).val());
            });

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
                }else{
                    new Notify(r.info, 2).showModal();
                }

            });

            e.stopPropagation();
            return false;
        });
    }

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
                +          '<a class="opr-delete" href="javascript:void(0);">删除账户</a>'
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
                $('#authoritymanange table tbody').html(tmpl({
                    adminList: r.data.adminList
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
    }

    // 初始化
    (function init(){
        // tab触发
        var tab = new TabNav('.sia-nav-ul');
        tab.one('addadmin', function() {
            addAdminHandler();
            selectAuthorityHandler();
            submitFormHanlder();
        });

        tab.on('authoritymanange', function () {
            requestAuthorityList();
        });

        tab.one('authoritymanange', function () {
            authorityListBinding();
        });

        tab.init();
    })();

});
