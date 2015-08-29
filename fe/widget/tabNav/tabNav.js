define(function (require) {
    var $ = require('jquery');

    var CLASS_TAB_ITEM = 'tabnav';
    // 标签页的类
    var CLASS_TAB_PAGE = 'tabnav-tab';
    var CLASS_TAB_SELECTED = 'sia-nav-cur';

    /**
     * 构造函数
     * @param {HTMLElement} rootContainer 根容器
     */
    function TabNav(rootContainer) {
        // tab事件队列, key为tab的id
        this._eventQueue = {};
        this.root = rootContainer;
    }

    // tab切换绑定，只执行一次
    TabNav.prototype.one = function (tabId, func) {
        var eventQueue = this._eventQueue;
        if (!(tabId in this._eventQueue)) {
            eventQueue[tabId] = [];
        }
        eventQueue[tabId].push({
            callback: func,
            once: true,
            fired: false
        });
    };

    // 切换绑定
    TabNav.prototype.on = function (tabId, func) {
        var eventQueue = this._eventQueue;
        if (!(tabId in this._eventQueue)) {
            eventQueue[tabId] = [];
        }
        eventQueue[tabId].push({
            callback: func,
            once: false,
            fired: false
        });
    };

    TabNav.prototype.init = function (){
        var self = this;
        (function attachHanlder () {
            $('.' + CLASS_TAB_ITEM, $(self.root)).on('click', function (e) {
                var id = $(this)
                            .addClass(CLASS_TAB_SELECTED)
                            .attr('href').slice(1);
                var eventQueue = self._eventQueue;
                var $tab = $('#' + id);

                $(this).parent().siblings().children('a').removeClass(CLASS_TAB_SELECTED);

                $tab
                    .show()
                    .siblings('.' + CLASS_TAB_PAGE)
                    .hide();

                if (eventQueue[id]) {
                    var callbackList = eventQueue[id];
                    for (var i = 0, len = callbackList.length; i < len; i++) {
                        var cArr = callbackList[i];
                        // 一次函数触发过不再触发
                        if (cArr.once && cArr.fired) {
                            continue;
                        }

                        (cArr.callback).apply($tab[0], e);

                        if (!cArr.once) {
                            cArr.once = true;
                        }

                        cArr.fired = true;
                    }
                }
            });
        })();
        // 根据hash寻找要打开的hash
        (function findDefaultTab() {
            var hash = window.location.hash;
            if (hash !== ''){
                $('a[href="' + hash + '"]').trigger('click');
            }else{
                $('.' + CLASS_TAB_ITEM).first().trigger('click');
            }
        
        })();
    }

    return TabNav;
});



