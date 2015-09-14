require(['jquery', 'underscore', '/api/api', 'validate', 'datepicker'], function ($, _, api){

    var _api = {
        searchMessage: '/api/selmessage'
    };

    api._(_api);

    $('#sms-start').add('#sms-finish').datepicker({
        autoclose: true,
        format: 'yyyy-mm-dd'
    });

    $('#search-message-query').validate({
        rules: {
            phone_number:{
                required: true,
                digits: true
            },
            from_time: {
                required: true,
                dateISO: true
            },
            to_time: {
                required: true,
                dateISO: true
            }
        },    
        submitHandler: function (form) {
            $.ajax({
                url: _api.searchMessage,
                data: $(form).serialize(),
                method: 'POST',
                dataType: 'json'
            }).done(function(r){
                var _tmpl = _.template($('#tpl-search-result').html());
                
                $('.sms-tab tbody').html(_tmpl({
                    history: r.data['push_history']   
                }));
            });
            return false;
        }
    });

});
