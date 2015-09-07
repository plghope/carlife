define([], function () {
    var API_SUFFIX = '/storeId/';

    return {
        _: function (arr) {
            for (var key in arr) {
                if (arr.hasOwnProperty(key)) {
                    arr[key] = arr[key] + API_SUFFIX + window.storeId;
                }
            }
        }
    };
});

