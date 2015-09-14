define(['jquery', 'dialog'], function ($, dialog) {

    var _api = {
        phoneMessage: '/api/sendphonemessage'
    };

    var content =  '<div class="pd-line-div data-con-div">'
                +      '<div class="pd-lcon-div">'
                +          '<h3>设置短信内容</h3>'
                +          '<textarea name="content" class="pd-ta push-message-content form-control"></textarea>'
                +          '<p class="help-block"></p>'
                +      '</div>'
                +      '<div class="pd-rcon-div">'
                +          '<div class="push-dx-div">'
                +          '<input type="submit" value="发送短信消息" class="btn pd-button dx-button push-message-button">'
                +          '<p class="help-block"></p>'
                +      '</div>'
                +   '</div>'
                +   '<div class="clear"></div>';

    return {
        send: function (userId, username) {
            var d = dialog({
                title: '发送给用户"' + username + '"',
                content: content,
                skin: 'yyc-dialog',
                onshow: function () {
                    var self = this;
                    var $node = $(self.node);
                    $node.on('click', '.push-message-button', function () {
                        var _message = $('.push-message-content', $node).val();

                        // clear
                        $('.pd-rcon-div .help-block', $node).html('');

                        if ( _message === ''){
                            $self.next().html('* 发送内容不能为空');
                            return false;
                        }

                        var users = [userId];

                        $.ajax({
                            url: _api.phoneMessage,
                            method: 'POST',
                            dataType: 'json',
                            data: {
                                userId: users,
                                content: _message
                            }
                        }).done(function (r) {
                            if (r.status === 0){
                                new Notify('发送消息成功', 2).showModal();
                                setTimeout(function(){
                                    self.close().remove();
                                }, 1500);
                            }
                        });

                        return false;
                    });
                }
            }).showModal();
            

        }
    };
});

