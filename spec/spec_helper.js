var customMatchers = {
  toBeEqualItemTo: function(util, customEqualityTesters) {
    return {
      compare: function (actual, expected) {
        return actual.name == expected.name && actual.sell_in == expected.sell_in && actual.quality == expected.quality
            ? {
          pass: true,
          message: "Expected " + actual + " not to be " + JSON.stringify(expected)
        }
            : {
          pass: false,
          message: "Expected " + actual + " to be " + JSON.stringify(expected)
        };
      }
    };
  }
};