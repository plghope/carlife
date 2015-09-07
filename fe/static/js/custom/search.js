require([
    'jquery',
    'underscore',
    '/api/api'
],function($, _, api){
    var _api = {
        searchCustomer: '/api/selcustomer'
    };

    api._(_api);

    $('#search-customer-query').on('submit', function () {
        $.ajax({
            url: _api.searchCustomer,
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
