var util = (function() {
    var keys = Object.keys;  // TODO: fix if need to support old browsers.
    var curry = function(fn) {
        var fnArity = fn.length;
        var f = function(args) {
            return function () {
                var newArgs = (args || []).concat([].slice.call(arguments, 0));
                if (newArgs.length >= fnArity) {
                    return fn.apply(this, newArgs);
                }
                else {return f(newArgs);}
            };
        };

        return f([]);
    };
    var propEq = curry(function(name, val, obj) {
        return obj[name] === val;
    });

    return {
        // find :: (a -> Boolean) -> [a] -> a | undefined
        find: curry(function (fn, list) {
            var idx = 0;
            var len = list.length;
            while (idx < len) {
                if (fn(list[idx])) {
                    return list[idx];
                }
                idx += 1;
            }
        }),

        // merge :: {k: v} -> {k: v} -> {k: v}
        merge: curry(function (a, b) {
            var result = {};
            var ks = keys(a);
            var idx = 0;
            while (idx < ks.length) {
                result[ks[idx]] = a[ks[idx]];
                idx += 1;
            }
            ks = keys(b);
            idx = 0;
            while (idx < ks.length) {
                result[ks[idx]] = b[ks[idx]];
                idx += 1;
            }
            return result;
        }),

        // propEq ::  String -> a -> Object -> Boolean
        propEq: propEq,


        // nameEq ::  a -> Object -> Boolean
        nameEq: propEq('name')
    };

}());