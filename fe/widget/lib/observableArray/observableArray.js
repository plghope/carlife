define(function () {
    function observableArray(array) {

        return (function (array) {
            var listener = [];

            var callListner = function (newValue) {
                for (var i = 0, len = listener.length; i < len; i++) {
                    // oldValue, newValue
                    listener[i](newValue);
                }
            };
            
            return {
                push: function(val) {

                    array.push(val);
                    callListner(array);

                },
                remove: function(keyName, value) {
                    for (var i = 0, len = array.length; i < len; i++) {
                        if (array[i][keyName] === value){
                            array.splice(i,1);
                            i--;
                            len--;
                        }
                    }

                    callListner(array);
                },
                watch: function (func) {
                    listener.push(func);
                },
                get: function (index) {
                    if (index){
                        return array[index];
                    }else{
                        return array;
                    }
                }
            };

        })(array);
    };

    return observableArray;
})

