define([
], function () {
    var rainbow = new Rainbow();
    rainbow.setSpectrum(
        '#E6494A',
        '#EFCD2B',
        '#3CE64C'
    );
    rainbow.setNumberRange(0, 350);
    var singleton = function () {
        return {
            rainbow: function (step) {
                return rainbow.colorAt(step);
            },
            getRandom: function (min, max) {
                return Math.random() * (max - min) + min;
            },
            getRandomInt: function (min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            },
            clamp: function (min, max, value) {
                return Math.max(Math.min(max, value), min);
            },
            distanceToInterval: function (value, a, b) {
                if (value < a) {
                    return a - value;
                } else if (b < value) {
                    return value - b;
                } else {
                    return 0;
                }
            }
        };
    };
    return singleton();
});
