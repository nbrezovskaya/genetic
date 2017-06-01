define([
], function() {
    var module = function (x, y) {
        this.x = x;
        this.y = y;
        this.distanceToLanding = 0;
    };
    module.prototype = {
        accumulateDistance: function(point) {
            this.distanceToLanding = point.distanceToLanding + this.getDistanceTo(point);
        },
        getDistanceTo: function(that) {
            return Math.sqrt(
                Math.pow(this.x - that.x, 2)
              + Math.pow(this.y - that.y, 2)
            );
        }
    };
    return module;
});