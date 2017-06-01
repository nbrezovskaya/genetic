define([
    'canvas',
    'point',
    'collision'
], function (Canvas, Point, Collision) {
    var module = function (point1, point2, crashDistance) {
        this.point1 = point1;
        this.point2 = point2;
        this.terrain = false;
        this.landing = false;
        this.crashDistance = crashDistance;

        var L = Math.sqrt((point1.x - point2.x) * (point1.x - point2.x) + (point1.y - point2.y) * (point1.y - point2.y));

        this.crash1p1 = new Point(
            point1.x + crashDistance * (point2.y - point1.y) / L,
            point1.y + crashDistance * (point1.x - point2.x) / L
        );
        this.crash1p2 = new Point(
            point2.x + crashDistance * (point2.y - point1.y) / L,
            point2.y + crashDistance * (point1.x - point2.x) / L
        );
        this.crash2p1 = new Point(
            point1.x + crashDistance * (point1.y - point2.y) / L,
            point1.y + crashDistance * (point2.x - point1.x) / L
        );
        this.crash2p2 = new Point(
            point2.x + crashDistance * (point1.y - point2.y) / L,
            point2.y + crashDistance * (point2.x - point1.x) / L
        );
    };
    module.prototype = {
        draw: function () {
            Canvas.drawLine(this.point1.x, this.point1.y, this.point2.x, this.point2.y, 'terrain', 'black', '10', 'none');
            // Canvas.drawLine(this.crash1p1.x, this.crash1p1.y, this.crash1p2.x, this.crash1p2.y, 'terrain', 'red', '2', 'none');
            // Canvas.drawLine(this.crash2p1.x, this.crash2p1.y, this.crash2p2.x, this.crash2p2.y, 'terrain', 'red', '2', 'none');
            // Canvas.drawCircle(this.point2.x, this.point2.y, this.crashDistance, 'terrain', 'red', '2', 'none');
        },
        getCollision: function (fromPoint, toPoint) {
            var crashPoint = null;
            var cornerCrash = false;
            var landingCornerCrash = false;
            if (this.landing) {
                crashPoint = this.min(crashPoint, this.checkLineCollisionInternal(fromPoint, toPoint, this.point1, this.point2, true), fromPoint);
            } else {
                var denominatorTo = Math.pow(this.point2.x - this.point1.x, 2) + Math.pow(this.point2.y - this.point1.y, 2);
                var numeratorTo = (toPoint.x - this.point1.x) * (this.point2.x - this.point1.x) + (toPoint.y - this.point1.y) * (this.point2.y - this.point1.y);
                var tTo = numeratorTo / denominatorTo;

                var denominatorFrom = Math.pow(this.point2.x - this.point1.x, 2) + Math.pow(this.point2.y - this.point1.y, 2);
                var numeratorFrom = (fromPoint.x - this.point1.x) * (this.point2.x - this.point1.x) + (fromPoint.y - this.point1.y) * (this.point2.y - this.point1.y);
                var tFrom = numeratorFrom / denominatorFrom;

                if ((0 <= tTo && tTo <= 1) || (0 <= tFrom && tFrom <= 1)) {
                    var projectionPoint = new Point(
                        this.point1.x + tTo * (this.point2.x - this.point1.x),
                        this.point1.y + tTo * (this.point2.y - this.point1.y)
                    );
                    if (toPoint.getDistanceTo(projectionPoint) < this.crashDistance) {
                        crashPoint = this.min(crashPoint, this.checkLineCollisionInternal(fromPoint, toPoint, this.crash1p1, this.crash1p2, false), fromPoint);
                        crashPoint = this.min(crashPoint, this.checkLineCollisionInternal(fromPoint, toPoint, this.crash2p1, this.crash2p2, false), fromPoint);
                    }
                }
                var cornerCrash1 = this.checkCornerCollisionInternal(fromPoint, toPoint, this.point1, this.crashDistance);
                crashPoint = this.min(crashPoint, cornerCrash1, fromPoint);
                var cornerCrash2 = this.checkCornerCollisionInternal(fromPoint, toPoint, this.point2, this.crashDistance);
                crashPoint = this.min(crashPoint, cornerCrash2, fromPoint);
                if (crashPoint == cornerCrash1) {
                    cornerCrash = true;
                    landingCornerCrash = this.terrain && this.point1.distanceToLanding == 0;
                }
                if (crashPoint == cornerCrash2) {
                    cornerCrash = true;
                    landingCornerCrash = this.terrain && this.point2.distanceToLanding == 0;
                }
            }
            if (crashPoint) {
                return new Collision(this, crashPoint, fromPoint.getDistanceTo(crashPoint), cornerCrash, landingCornerCrash);
            } else {
                return null;
            }
        },
        checkCornerCollisionInternal: function (fromPoint, toPoint, cornerPoint, radius) {
            var dx = toPoint.x - fromPoint.x;
            var dy = toPoint.y - fromPoint.y;
            var fx = fromPoint.x - cornerPoint.x;
            var fy = fromPoint.y - cornerPoint.y;
            var a = this.dot(dx, dy, dx, dy);
            var b = 2 * this.dot(fx, fy, dx, dy);
            var c = this.dot(fx, fy, fx, fy) - radius * radius;
            var discriminant = b * b - 4 * a * c;
            if (discriminant < 0) {
                return null;
            } else {
                discriminant = Math.sqrt(discriminant);
                var t = (-b - discriminant) / (2 * a);
                if (0 <= t && t <= 1) {
                    return new Point(fromPoint.x + t * dx, fromPoint.y + t * dy);
                } else {
                    return null;
                }
            }
        },
        checkLineCollisionInternal: function (fromPoint, toPoint, linePoint1, linePoint2, inside) {
            var denominator = ((linePoint2.y - linePoint1.y) * (toPoint.x - fromPoint.x)) - ((linePoint2.x - linePoint1.x) * (toPoint.y - fromPoint.y));
            if (denominator == 0) {
                return null;
            }
            var a = fromPoint.y - linePoint1.y;
            var b = fromPoint.x - linePoint1.x;
            var numerator1 = ((linePoint2.x - linePoint1.x) * a) - ((linePoint2.y - linePoint1.y) * b);
            var numerator2 = ((toPoint.x - fromPoint.x) * a) - ((toPoint.y - fromPoint.y) * b);
            a = numerator1 / denominator;
            b = numerator2 / denominator;

            if (!inside || (0 <= a && a <= 1 && 0 <= b && b <= 1)) {
                return new Point(
                    fromPoint.x + (a * (toPoint.x - fromPoint.x)),
                    fromPoint.y + (a * (toPoint.y - fromPoint.y))
                );
            }

            return null;
        },
        dot: function (vector1x, vector1y, vector2x, vector2y) {
            return vector1x * vector2x + vector1y * vector2y;
        },
        min: function (crashPoint1, crashPoint2, point) {
            if (crashPoint1 == null) {
                return crashPoint2;
            } else if (crashPoint2 == null) {
                return crashPoint1;
            } else {
                return point.getDistanceTo(crashPoint1) < point.getDistanceTo(crashPoint2) ? crashPoint1 : crashPoint2;
            }
        }
    };
    return module;
});