var util = {
    // find :: (a -> Boolean) -> [a] -> a | undefined
    find: function (fn, list) {
        var idx = 0;
        var len = list.length;
        while (idx < len) {
            if (fn(list[idx])) {
                return list[idx];
            }
            idx += 1;
        }
    }
};