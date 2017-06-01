define([
    "point",
    "line"
], function (Point, Line) {
    var module = function (terrainPoints, obstacles, crashDistance, skipObstacles) {
        this.skipObstacles = skipObstacles;
        this.lines = [];
        if (terrainPoints) {
            var previousPoint = new Point(terrainPoints[0][0], terrainPoints[0][1]);
            for (var i = 1; i < terrainPoints.length; i++) {
                var point = new Point(terrainPoints[i][0], terrainPoints[i][1]);
                var line = new Line(previousPoint, point, crashDistance);
                previousPoint = point;
                if (terrainPoints[i].length > 2) {
                    line.landing = true;
                    this.landingCenter = new Point((line.point1.x + line.point2.x) * 0.5, line.point1.y);
                    this.landingObstacleIndex = this.lines.length;
                }
                line.terrain = true;
                this.lines.push(line);
            }
            this.calculateDistances();
        }

        if (obstacles) {
            for (var i = 0; i < obstacles.length; i++) {
                var obstaclePair = obstacles[i];
                var point1 = new Point(obstaclePair[0][0], obstaclePair[0][1]);
                var point2 = new Point(obstaclePair[1][0], obstaclePair[1][1]);
                this.lines.push(new Line(point1, point2, crashDistance));
            }
        }

        this.draw();
    };
    module.prototype = {
        getCollision: function (lastPoint, nextPoint) {
            var closestCollision = null;
            for (var i = 0; i < this.lines.length; i++) {
                var line = this.lines[i];
                if (this.skipObstacles && !line.terrain) {
                    continue;
                }
                var collision = line.getCollision(lastPoint, nextPoint);
                if (collision) {
                    if (!closestCollision || collision.distance < closestCollision.distance) {
                        closestCollision = collision;
                    }
                }
            }
            return closestCollision;
        },
        calculateDistances: function () {
            var i;
            for (i = this.landingObstacleIndex + 1; i < this.lines.length; i++) {
                this.lines[i].point2.accumulateDistance(this.lines[i].point1);
            }
            for (i = this.landingObstacleIndex - 1; i >= 0; i--) {
                this.lines[i].point1.accumulateDistance(this.lines[i].point2);
            }
            this.maxDistance = Math.max(this.lines[0].point1.distanceToLanding, this.lines[this.lines.length - 1].point2.distanceToLanding);
        },
        draw: function() {
            for (var i = 0; i < this.lines.length; i++) {
                this.lines[i].draw();
            }
        }
    };
    return module;
});