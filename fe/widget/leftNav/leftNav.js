define(function (require) {
    var $ = require('jquery');

    // 触发下拉菜单元素类
    var CLASS_TRIGEER_OPEN_ELEMENT = 'leftnav_title';
    // 下拉菜单打开类
    var CLASS_MENU_OPEN = 'menu_choice';
    // 下拉菜单 菜单项选中类
    var CLASS_LI_SELECTED = 'leftnav_item_focus';

    /**
     * 左侧导航
     *
     * @param {HTMLElement} rootSelector 根容器选择器
     */
    function LeftNav(rootSelector) {
        $(rootSelector).on('click', '.' + CLASS_TRIGEER_OPEN_ELEMENT, function (e) {
            var $tri = $(e.target).is('div') ? $(e.target) : $(e.target).parent();
            var $arrow = $tri.children('.arrow');
            var $dropdown = $tri.next('ul');

            var arrowChange = function (status, $arrow) {
                if (status){
                    $arrow.removeClass('icon-chevron-down')
                    $arrow.addClass('icon-chevron-up')
                }else{
                    $arrow.removeClass('icon-chevron-up')
                    $arrow.addClass('icon-chevron-down')
                }
            };

            $dropdown
                .slideToggle()
                .toggleClass(CLASS_MENU_OPEN)
                .parent().siblings().children('.' + CLASS_MENU_OPEN).each(function () {
                    var $this = $(this);
                    $this.slideToggle();
                    $this.toggleClass(CLASS_MENU_OPEN);

                    arrowChange($this.hasClass(CLASS_MENU_OPEN), $this.prev().children('.arrow'));
                });

            arrowChange($dropdown.hasClass(CLASS_MENU_OPEN), $arrow);

        });

        // 初始选中
        $('.' + CLASS_MENU_OPEN, $(rootSelector))
            .toggleClass(CLASS_MENU_OPEN)
            .prev()
            .trigger('click');
    }

    return LeftNav;
});

