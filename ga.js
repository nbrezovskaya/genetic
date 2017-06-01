define([
    "lander",
    "command",
    "helper"
], function (Lander, Command, Helper) {
    var module = function (populationSize, eliteSize, simulationSize, world, initialLanderParams, constraints, landerType) {
        this.populationSize = populationSize;
        this.eliteSize = eliteSize;
        this.simulationSize = simulationSize;
        this.world = world;
        this.initialLanderParams = initialLanderParams;
        this.constraints = constraints;
        this.landerType = landerType;
        this.generation = 0;
    };
    module.prototype = {
        // Score is used to order landers by performance
        fitness: function (lander, collision) {
            var score = 0;

            var currentSpeed = Math.sqrt(Math.pow(lander.xSpeed, 2) + Math.pow(lander.ySpeed, 2));

            // 0-100: crashed somewhere, calculate score by distance to landing area
            if (!collision || !collision.obstacle || !collision.obstacle.landing) {
                var distance = 0;
                if (collision) {
                    distance = this.world.getDistanceToLandingArea(collision.obstacle, collision.collisionPoint, collision.cornerCrash, collision.landingCornerCrash);
                } else {
                    distance = this.world.getDistanceToLandingArea(null, lander.points[lander.points.length - 1], false, false);
                }
                // Calculate score from distance
                score = 100 - (100 * distance / this.world.maxDistance);
                // High speeds are bad, they decrease maneuvrability
                score -= 0.1 * Math.max(currentSpeed - 80, 0);
            }

            // 100-200: crashed into landing area, calculate score by speed above safety
            else {
                var overLimitX = Math.abs(lander.xSpeed) - this.constraints.landingMaxXSpeed;
                var overLimitY = Math.abs(lander.ySpeed) - this.constraints.landingMaxYSpeed;
                var xPenalty = overLimitX > 0 ? overLimitX * 0.5 : 0;
                var yPenalty = overLimitY > 0 ? overLimitY * 0.5 : 0;

                var distanceFromEdge = Math.min(
                    Math.abs(collision.obstacle.point1.x - lander.x),
                    Math.abs(collision.obstacle.point2.x - lander.x)
                );
                var maxDistanceFromEdge = Math.abs(collision.obstacle.point2.x - collision.obstacle.point1.x) * 0.5 * 0.7;
                var distanceFromEdgeBonus = Math.min(distanceFromEdge / maxDistanceFromEdge, 1) * 50;

                var params = this.gaConstants();
                var angleBonus = 50;
                var maxAnglePenalty = Math.max(this.constraints.landingMinAngle - this.constraints.minAngle, this.constraints.maxAngle - this.constraints.landingMaxAngle);
                var anglePenalty = 0;
                var penaltyPerOne = angleBonus / params.anglesToKeepOK;
                for (var i = lander.angles.length - params.anglesToKeepOK; i < lander.angles.length; i++) {
                    var angle = lander.angles[i];
                    anglePenalty = Helper.distanceToInterval(angle, this.constraints.landingMinAngle, this.constraints.landingMaxAngle);
                    var normalizedPenalty = anglePenalty / maxAnglePenalty;
                    angleBonus -= normalizedPenalty * penaltyPerOne;
                }

                // var angleBonus = 50;
                // if (lander.angle < this.constraints.landingMinAngle) {
                //     itar
                //     var anglePenalty = this.constraints.landingMinAngle - lander.angle;
                //     var maxPenalty = this.constraints.landingMinAngle - this.constraints.minAngle;
                //     var normalizedPenalty = anglePenalty / maxPenalty;
                //     angleBonus -= normalizedPenalty * 50;
                // } else if (lander.angle > this.constraints.landingMaxAngle) {
                //     var anglePenalty = lander.angle - this.constraints.landingMaxAngle;
                //     var maxPenalty = this.constraints.maxAngle - this.constraints.landingMaxAngle;
                //     var normalizedPenalty = anglePenalty / maxPenalty;
                //     angleBonus -= normalizedPenalty * 50;
                // }

                score = 200 - xPenalty - yPenalty;

                if (score == 200) {
                    score += distanceFromEdgeBonus + angleBonus
                }

                if (score > 200 && anglePenalty == 0) {
                    score += 100 * lander.fuel / lander.initFuel;
                }
            }

            return score;
        },
        genomeComparator: function (a, b) {
            return b.score - a.score;
        },
        simulatePopulation: function (population) {
            for (var i = 0; i < this.populationSize; i++) {
                var lander = population[i];
                lander.reset();

                var landed = false;
                for (var t = 0; t < this.simulationSize; t++) {
                    lander.applyCommand(t, this.constraints);
                    var collision = lander.tick(this.world);
                    if (collision) {
                        lander.score = this.fitness(lander, collision);
                        lander.color = Helper.rainbow(lander.score);
                        landed = true;
                        break;
                    }
                }
                // Lander did not touch terrain
                if (!landed) {
                    lander.score = this.fitness(lander, null);
                    lander.color = Helper.rainbow(lander.score);
                }
            }
        },
        createGenome: function (id) {
            var params = this.gaConstants();
            var lander = new Lander(id, this.initialLanderParams);
            var angle = lander.initAngle;
            lander.commands = [];
            for (var i = 0; i < this.simulationSize; i++) {
                angle += Helper.getRandomInt(-this.constraints.maxAngleChange, this.constraints.maxAngleChange);
                angle = Math.min(angle, this.constraints.maxAngle);
                angle = Math.max(angle, this.constraints.minAngle);
                var power = this.constraints.minPower + (this.constraints.maxPower - this.constraints.minPower + 1) * Math.random();
                lander.commands.push(new Command(angle, power));
            }
            return lander;
        },
        initialPopulation: function () {
            var population = [];
            for (var i = 0; i < this.populationSize; i++) {
                population.push(this.createGenome(i));
            }

            this.simulatePopulation(population);
            this.generation++;
            return population.sort(this.genomeComparator);
        },
        nextPopulation: function (population) {
            for (var i = this.eliteSize; i < this.populationSize; i++) {
                var parent1 = this.selectParent1(i);
                var parent2 = this.selectParent2(i);
                this.recombinate(population[i], population[parent1], population[parent2]);
                this.mutate(population[i], population[parent1], population[parent2]);
            }

            this.simulatePopulation(population);
            this.generation++;
            return population.sort(this.genomeComparator);
        },
        selectParent1: function (index) {
            return Math.floor(index / this.eliteSize) - 1;
        },
        selectParent2: function (index) {
            return index % this.eliteSize;
        },
        recombinate: function (targetGenome, momGenome, dadGenome) {
            for (var i = 0; i < this.simulationSize; i++) {
                var momCommand = momGenome.commands[i];
                var dadCommand = dadGenome.commands[i];
                var d = 0.25;
                var ksiFrom = -d;
                var ksiTo = 1 + d;
                targetGenome.commands[i].angle = momCommand.angle + Helper.getRandom(ksiFrom, ksiTo) * (dadCommand.angle - momCommand.angle);
                targetGenome.commands[i].power = momCommand.power + Helper.getRandom(ksiFrom, ksiTo) * (dadCommand.power - momCommand.power);
            }
        },
        mutate: function (targetGenome, momGenome, dadGenome) {
            for (var i = 0; i < this.simulationSize; i++) {
                var mudblood = 5;
                if (100 < Math.max(momGenome.score, dadGenome.score)) {
                    mudblood = 3;
                }
                if (200 < Math.max(momGenome.score, dadGenome.score)) {
                    mudblood = 1;
                }

                var c = this.gaConstants();
                var progress = i / this.simulationSize;
                var progressChance = c.baseProgressChance + Math.pow(c.progressAdd + progress, c.progressPower) * c.progressMultiplier;
                var mutationChance = c.baseMutationChance * mudblood * progressChance;
                if (Math.random() < mutationChance) {
                    targetGenome.commands[i].angle += Helper.getRandomInt(-this.constraints.maxAngleChange * 0.66, this.constraints.maxAngleChange * 0.66);
                    targetGenome.commands[i].power += Math.random() - this.constraints.maxPowerChange * 0.5
                }
            }
        },
        gaConstants: function () {
            switch (this.landerType) {
                case 'rocket':
                    return {
                        baseProgressChance: 0.4,
                        progressAdd: 0,
                        progressPower: 1,
                        progressMultiplier: 1,
                        baseMutationChance: 0.03,
                        anglesToKeepOK: 3
                    };
                case 'boat':
                    return {
                        baseProgressChance: 0,
                        progressAdd: 0.8,
                        progressPower: 3,
                        progressMultiplier: 0.125,
                        baseMutationChance: 0.05,
                        anglesToKeepOK: 40
                    };
                case 'robot':
                    return {
                        baseProgressChance: 0.4,
                        progressAdd: 0,
                        progressPower: 1,
                        progressMultiplier: 1,
                        baseMutationChance: 0.03,
                        anglesToKeepOK: 1
                    };
            }
        }
    };
    return module;
});