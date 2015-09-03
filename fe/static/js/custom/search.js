require([
    'jquery',
    'underscore'
],function($, _){
    $('#search-customer-query').on('submit', function () {
        $.ajax({
            url: '/api/selcustomer',
            data: $(this).serialize(),
            method: 'POST',
            dataType: 'json'
        }).done(function (r) {
            var _tmpl = _.template($('#tpl-search-result').html());

            $('#query-table tbody').html(_tmpl({
                customer: r.data.customer   
            }));
        });
        return false;
    });

});
