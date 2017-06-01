define([
    "helper",
    "command",
    "point",
    "collision",
    "canvas"
], function (Helper, Command, Point, Collision, Canvas) {
    var module = function (id, params) {
        this.id = id;
        this.initX = params.x;
        this.initY = params.y;
        this.initXSpeed = params.xSpeed;
        this.initYSpeed = params.ySpeed;
        this.initFuel = params.fuel;
        this.initAngle = params.angle;
        this.initPower = params.power;
    };
    module.prototype = {
        tick: function (world) {
            if (this.fuel < this.power) {
                this.power = this.fuel;
            }
            this.fuel -= this.power;
            var arcAngle = -this.angle * Math.PI / 180;
            var xAcceleration = Math.sin(arcAngle) * this.power + world.hAcceleration;
            var yAcceleration = Math.cos(arcAngle) * this.power + world.vAcceleration;
            this.xSpeed += xAcceleration;
            this.ySpeed += yAcceleration;
            this.x += this.xSpeed - (xAcceleration * 0.5);
            this.y += this.ySpeed - (yAcceleration * 0.5);
            var nextPoint = new Point(this.x, this.y);

            var collision = world.terrain.getCollision(this.points[this.points.length - 1], nextPoint);

            if (collision) {
                nextPoint = collision.collisionPoint;
            }

            this.points.push(nextPoint);
            this.angles.push(this.angle);

            return collision;
        },
        reset: function () {
            this.points = [new Point(this.initX, this.initY)];
            this.angles = [this.initAngle];
            this.x = this.initX;
            this.y = this.initY;
            this.xSpeed = this.initXSpeed;
            this.ySpeed = this.initYSpeed;
            this.angle = this.initAngle;
            this.power = this.initPower;
            this.fuel = this.initFuel;
            this.lastDiff = 0;
        },
        applyCommand: function (t, constraints) {
            // Read current command
            var newAngle = this.commands[t].angle;
            var newPower = this.commands[t].power;

            // Set angle
            newAngle = Math.round(newAngle);
            newAngle = Math.max(newAngle, constraints.minAngle);
            newAngle = Math.min(newAngle, constraints.maxAngle);
            if (newAngle + constraints.maxAngleChange < this.angle) {
                this.angle -= constraints.maxAngleChange;
            }
            else if (this.angle + constraints.maxAngleChange < newAngle) {
                this.angle += constraints.maxAngleChange;
            }
            else {
                this.angle = newAngle;
            }

            // Set power
            newPower += this.lastDiff;
            var roundedPower = Math.round(newPower);
            roundedPower = Math.max(roundedPower, constraints.minPower, this.power - constraints.maxPowerChange);
            roundedPower = Math.min(roundedPower, constraints.maxPower, this.power + constraints.maxPowerChange);
            this.lastDiff = newPower - roundedPower;
            this.power = roundedPower
        },
        draw: function (best) {
            Canvas.drawPolyline(this.points, 'flight-trajectory', best ? 'darkblue' : this.color, best ? '10' : '2', 'none');
            if (best) {
                for (var i = 0; i < this.points.length; i++) {
                    var point = this.points[i];
                    Canvas.drawCircle(point.x, point.y, 5, 'flight-trajectory', 'green', '10', 'green')
                }
            }
        }
    };
    return module;
});
