define([
    "libs/d3.min",
    "helper",
    "point",
    "terrain",
    "canvas"
], function (d3, Helper, Point, Terrain, Canvas) {
    var module = function (levelData) {
        this.landers = [];
        this.redrawCount = 0;
        this.width = levelData.world.width;
        this.height = levelData.world.height;
        this.hAcceleration = levelData.world.hAcceleration;
        this.vAcceleration = levelData.world.vAcceleration;

        Canvas.clear();
        Canvas.setSize(this.width, this.height);

        this.terrain = new Terrain(levelData.terrainPoints, levelData.obstacles, levelData.constraints.crashDistance, levelData.skipObstacles);
        this.maxDistance = this.terrain.maxDistance || this.width + this.height;
    };
    module.prototype = {
        getDistanceToLandingArea: function (obstacle, collisionPoint, cornerCrash, landingCornerCrash) {
            if (landingCornerCrash) {
                var maxDistance = 1000;
                return -(maxDistance - collisionPoint.getDistanceTo(this.terrain.landingCenter));
            } else if (obstacle && obstacle.terrain) {
                var distanceToPoint1 = obstacle.point1.getDistanceTo(collisionPoint);
                var distanceToPoint2 = obstacle.point2.getDistanceTo(collisionPoint);
                var point1CloserToLanding = obstacle.point1.distanceToLanding < obstacle.point2.distanceToLanding;
                if (cornerCrash) {
                    var crashedNearPoint1 = distanceToPoint1 < distanceToPoint2;
                    if (point1CloserToLanding && crashedNearPoint1) {
                        for (var i = 0; i < this.terrain.lines.length; i++) {
                            var line = this.terrain.lines[i];
                            if (line.point2 == obstacle.point1) {
                                return line.point1.distanceToLanding + line.point1.getDistanceTo(collisionPoint);
                            }
                        }
                    } else if (!point1CloserToLanding && !crashedNearPoint1) {
                        for (var i = 0; i < this.terrain.lines.length; i++) {
                            var line = this.terrain.lines[i];
                            if (line.point1 == obstacle.point2) {
                                return line.point2.distanceToLanding + line.point2.getDistanceTo(collisionPoint);
                            }
                        }
                    }
                }
                if (point1CloserToLanding) {
                    return obstacle.point1.distanceToLanding + distanceToPoint1;
                } else {
                    return obstacle.point2.distanceToLanding + distanceToPoint2;
                }
            // } else if (obstacle && !obstacle.terrain) {
            //     return collisionPoint.getDistanceTo(this.terrain.landingCenter);
            } else {
                var closestPoint = this.terrain.lines[0].point1;
                var closestDistance = closestPoint.getDistanceTo(collisionPoint);
                for (var i = 1; i < this.terrain.lines.length; i++) {
                    var line = this.terrain.lines[i];
                    if (line.terrain) {
                        var distance = line.point2.getDistanceTo(collisionPoint);
                        if (distance < closestDistance) {
                            closestDistance = distance;
                            closestPoint = line.point2;
                        }
                    }
                }
                return closestDistance + closestPoint.distanceToLanding;
            }
        },
        redrawLanders: function () {
            this.redrawCount++;
            if (this.redrawCount % 20 == 0) {
                this.drawLanders();
            }
        },
        drawLanders: function() {
            Canvas.clearTag('flight-trajectory');
            for (var i = this.landers.length - 1; i >= 0; i--) {
                this.landers[i].draw(i == 0);
            }
        }
    };
    return module;
});
