define([], function () {
    var module = function (obstacle, collisionPoint, distance, cornerCrash, landingCornerCrash) {
        this.obstacle = obstacle;
        this.collisionPoint = collisionPoint;
        this.distance = distance;
        this.cornerCrash = cornerCrash;
        this.landingCornerCrash = landingCornerCrash;
    };
    return module;
});