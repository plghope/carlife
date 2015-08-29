require(['jquery', 'observableArray'], function ($, observableArray) {
    
    // 账户
    var API_ADD_ADMIN = '/api/addadmin';
    var BTN_ADD_ADMIN = '#btn-addadmin';

    // 权限
    var API_MODIFY_ADMIN_AUTHORITY = '/api/modifyadminauthority';
    var BTN_ADD_AUTHORITY = '#btn-addauthority';

    // 加密信息
    var KEY = 'GiveMeAppleeeee!', IV = '!eeeeelppAeMeviG';
    var key = CryptoJS.enc.Utf8.parse(KEY);
    var iv = CryptoJS.enc.Utf8.parse(IV);

    function addAdminHandler() {
        // 添加账户
        $(BTN_ADD_ADMIN).on('click', function (e) {

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
                    url: API_ADD_ADMIN,
                    method: 'POST',
                    dataType: 'json',
                    data: {
                        username: $('#username').val(),
                        password: encryptPassword
                    }
                }).done(function (r) {
                    if (r.status === 0) {
                        // 提示清空
                        $(BTN_ADD_ADMIN).next('.help-block').html('添加账户成功，选择对应管理权限');

                        $('#username').data('username', r.data.username);
                        $(BTN_ADD_ADMIN).prop('disabled', true);
                    }else {
                        $(BTN_ADD_ADMIN).next('.help-block').html('* 账户名称已存在');
                    }
                });
            }else{
                $(BTN_ADD_ADMIN).next('.help-block').html('* 账户名称和密码不能为空');
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
        $(BTN_ADD_AUTHORITY).on('click', function (e) {
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
                url: API_MODIFY_ADMIN_AUTHORITY,
                method: 'POST',
                dataType: 'json',
                data: {
                    permissionId: checked,
                    username: username
                }
            }).done(function (r) {
                if (r.status === 0) {
                    $button.next('.help-block').html('* 已为"' + username + '"增加权限');
                    
                }

            });

            e.stopPropagation();
            return false;
        });
    }

    // 初始化
    (function init(){
        addAdminHandler();
        selectAuthorityHandler();
        submitFormHanlder();
    })();

});
