define(function (require) {
    var $ = require('jquery');
    var _ = require('underscore');
    var TMPL_ID = 'tmpl-breadcrumb';

    /**
     * 面包屑
     *
     * @param {HTMLElement} rootContainer 根容器选择器
     * @param {Array} paths 路径数组
     */
    function Breadcrumb(rootContainer, paths) {
        var tmpl = _.template($('#' + TMPL_ID).html());
        $(rootContainer).html(tmpl({
            breads: paths
        }));
    }

    return Breadcrumb;
});

