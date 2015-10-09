require([
    'jquery',
    'underscore',
    '/api/api',
    'datepicker',
    'validate',
    'pagination'
], function ($, _, api) {
    var _api = {
        searchMessage: '/api/selmessage'

    };

    api._(_api);

    $('#sms-start').add('#sms-finish').datepicker({
        autoclose: true,
        format: 'yyyy-mm-dd'

    });

    var _tmpl = _.template($('#tpl-search-result').html());
    var PAGE_SIZE = 10;

    var lastFormData = null;

    function renderHistoryTable(history) {
        if (!history || history.length === 0) {
            $('.sms-tab tbody').html('<tr><td colspan="100%">暂无</td></tr>');
        }else{
            $('.sms-tab tbody').html(_tmpl({
                history: history

            }));
        }
    }

    //增加分页信息
    function appendPageInfo(data, page) {
        var start = (page - 1) * PAGE_SIZE;
        var end = page * PAGE_SIZE;
        return data + '&start_idx=' + start + '&end_idx=' + end;
    }

    $('#search-message-query').validate({
        rules: {
            phone_number: {
                digits: true,
                minlength: 11,
                maxlength: 11
            },
            from_time: {
                required: {
                    depends: function () {
                        return $('#sms-finish').val() !== '';
                    }

                },
                dateISO: true

            },
            to_time: {
                required: {
                    depends: function () {
                        return $('#sms-start').val() !== '';
                    }

                },
                dateISO: true
            }

        },
        submitHandler: function (form) {
            $.ajax({
                url: _api.searchMessage,
                data: appendPageInfo($(form).serialize(), 1),
                method: 'POST',
                dataType: 'json'
            }).done(function (r) {
                lastFormData = $(form).serialize();

                renderHistoryTable(r.data['push_history']);

                if ($('#pagination').data('twbs-pagination')) {
                    $('#pagination').data('twbs-pagination').destroy();
                }

                $('#pagination').twbsPagination({
                    totalPages: Math.ceil(r.data.push_count / PAGE_SIZE),
                    onPageClick: function (event, page) {
                        $.ajax({
                            url: _api.searchMessage,
                            data: appendPageInfo(lastFormData, page),
                            method: 'POST',
                            dataType: 'json'
                        }).done(function (r) {
                            renderHistoryTable(r.data['push_history']);

                        }).fail(function (r) {
                            new Notify('服务器出错', 2).showModal();
                        });
                        
                    }
                });
            }).fail(function (r) {
                new Notify('服务器出错', 2).showModal();
            });
            return false;
        }

    });

    function padTwo(num) {
        if (('' + num).length === 1) {
            num = '0' + num;
        }

        return num;
    }

    (function () {
        //load 三天消息
        var now = new Date();

        var start = [
            now.getFullYear(),
            padTwo(now.getMonth() + 1),
            padTwo(now.getDate())
        ].join('-');
        var end = [
            now.getFullYear(),
            padTwo(now.getMonth() + 1),
            padTwo(now.getDate() + 3)
        ].join('-');
        $('#sms-start').val(start);
        $('#sms-finish').val(end);

        $('#search-message-query').trigger('submit');
    })();

});
