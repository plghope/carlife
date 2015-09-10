require([
    'jquery',
    'underscore',
    '/api/api',
    'validate'
],function($, _, api){
    var _api = {
        searchCustomer: '/api/selcustomer'
    };

    api._(_api);

    $(document).ready(function () {
        $('#search-customer-query').validate({
            rules: {
                user_name: {
                    require_from_group: [1, '.content-input']
                },
                phone_number: {
                    require_from_group: [1, '.content-input']
                },
                plate_number: {
                    require_from_group: [1, '.content-input']
                }
            },
            submitHandler: function (form) {
                $.ajax({
                    url: _api.searchCustomer,
                    data: $(form).serialize(),
                    method: 'POST',
                    dataType: 'json'
                }).done(function (r) {
                    var _tmpl = _.template($('#tpl-search-result').html());
                    var customer = r.data.customer;
                    if (customer.length === 0) {
                        $('#query-table tbody').html('<tr><td colspan="100%">空</td></tr>');
                    }else{
                        $('#query-table tbody').html(_tmpl({
                            customer: r.data.customer   
                        }));
                    }

                });
                return false;
            }
        });
    });


});
