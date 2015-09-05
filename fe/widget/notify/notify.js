define([
    'dialog'
], function (dialog) {

    /**
     * @param {string} content 提示内容
     * @param {number} count 计数
     */
    function Notify(content, count){
        this._dialog = dialog({
            title:'提示',
            content: content + '，<span id="popup-count">' + count + '</span>秒内自动关闭',
            skin: 'yyc-dialog',
            onshow: function () {
                var self = this;
                var node = this.node;
                setInterval(function () {
                    var count = +$('#popup-count').text();
                    if (--count === 0) {
                        self.close().remove();
                    }else{
                        $('#popup-count').text(count);
                    }
                }, 1000);
            }
        });
    }

    Notify.prototype.show = function () {
        this._dialog.show();
    };

    Notify.prototype.showModal = function () {
        this._dialog.showModal();
    };

    return Notify;
});
