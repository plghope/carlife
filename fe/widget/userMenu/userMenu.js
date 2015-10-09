/**
 * @file 用户弹出菜单
 * @author zengguanming
 */
var $ = require('jquery');
$('.s_user-menu').on('click', function () {
    $('#s_user-menu-mask').show();
    $('#s_user-menu-popup').show();
});

$('.s_user-top').on('click', '#s_user-menu-mask', function () {
    $(this).hide();
    $('#s_user-menu-popup').hide();
});

