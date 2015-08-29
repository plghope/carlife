define(function () {
    function observable(variable) {

        return (function (variable) {
            var listener = [];
            
            return {
                set: function(val) {
                    if (variable !== val) {
                        for (var i = 0, len = listener.length; i < len; i++) {
                            // oldValue, newValue
                            listener[i](variable, val);
                        }
                    }

                    variable =val;
                },
                get: function() {
                    return variable;
                },
                watch: function (func) {
                    listener.push(func);
                }
            };

        })(variable);
    };

    return observable;
})

