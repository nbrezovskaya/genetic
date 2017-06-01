define([], function () {
    var singleton = function () {
        return {
            list: {
                "Robot Rooms": {
                    landerType: 'robot',
                    skipObstacles: false    ,
                    world: {
                        width: 5000,
                        height: 5000,
                        vAcceleration: 0,
                        hAcceleration: 0
                    },
                    terrainPoints: [
                        [3000, 2000],
                        [3000, 0], [3500, 0, 'charging station'],
                        [3500, 200], [3650, 200], [3650, 0],

                        [4052, 0], [4052, 333], [4345, 747], [4345, 1741], [5000, 1741],

                        [5000, 2000], [4250, 2000], [4250, 2250], [5000, 2250], [5000, 5000],

                        [3549, 5000], [3550, 4450], [1684, 4450], [1684, 5000],

                        [0, 5000],

                        [0, 4650], [500, 4650], [500, 3250], [0, 3250],

                        [0, 2250], [500, 2250], [500, 2000], [0, 2000], [0, 0], [2000, 0], [2000, 2000], [1500, 2000], [1500, 2250], [3750, 2250], [3750, 2000], [3000, 2000]
                    ],
                    obstacles: [
                        // [[1791, 4297], [1791, 4167]],
                        // [[1791, 4167], [1910, 4167]],
                        // [[1910, 4167], [1910, 4297]],
                        // [[1910, 4297], [1797, 4297]],
                        //
                        // [[3175, 4286], [3175, 4161]],
                        // [[3175, 4161], [3299, 4161]],
                        // [[3299, 4161], [3299, 4286]],
                        // [[3299, 4286], [3175, 4286]],
                        //
                        // [[3169, 3401], [3169, 3271]],
                        // [[3169, 3271], [3288, 3271]],
                        // [[3288, 3271], [3288, 3401]],
                        // [[3288, 3401], [3169, 3401]],
                        //
                        // [[1774, 3390], [1774, 3288]],
                        // [[1774, 3288], [1910, 3288]],
                        // [[1910, 3288], [1910, 3390]],
                        // [[1910, 3390], [1774, 3390]],
                        [[2600,4000], [2850,3933]],
                        [[2850,3933], [3033,3750]],
                        [[3033,3750], [3100,3500]],
                        [[3100,3500], [3033,3250]],
                        [[3033,3250], [2850,3067]],
                        [[2850,3067], [2600,3000]],
                        [[2600,3000], [2350,3067]],
                        [[2350,3067], [2167,3250]],
                        [[2167,3250], [2100,3500]],
                        [[2100,3500], [2167,3750]],
                        [[2167,3750], [2350,3933]],
                        [[2350,3933], [2600,4000]],

                        [[0, 1540], [700, 1540]],
                        [[700, 1540], [700, 6]],
                        [[700, 6], [0, 6]],
                        [[0, 6], [0, 1540]]

                        // [[45, 4649], [45, 3248]],
                        // [[45, 3248], [493, 3248]],
                        // [[493, 3248], [493, 4649]],
                        // [[493, 4649], [45, 4649]],

                        // [[1684, 4955], [1684, 4450]],
                        // [[1684, 4450], [3549, 4450]],
                        // [[3549, 4450], [3549, 4955]],
                        // [[3549, 4955], [1684, 4955]]
                    ],
                    lander: {
                        x: 1500,
                        y: 500,
                        xSpeed: 0,
                        ySpeed: 0,
                        fuel: 1750,
                        angle: 40,
                        power: 0
                    },
                    constraints: {
                        landingMaxXSpeed: 3,
                        landingMaxYSpeed: 3,
                        landingMinAngle: -180,
                        landingMaxAngle: 180,
                        minAngle: -360,
                        maxAngle: 360,
                        minPower: -1,
                        maxPower: 4,
                        maxAngleChange: 15,
                        maxPowerChange: 1,
                        crashDistance: 120
                    }
                },
                "New Boat Fjord": {
                    landerType: 'boat',
                    world: {
                        width: 2000,
                        height: 6000,
                        vAcceleration: 0.2,
                        hAcceleration: 0
                    },
                    terrainPoints: [
                        [1056, 5949], [518, 5260], [360, 4811], [455, 4230], [746, 3939], [1246, 3566], [1347, 3104], [1201, 2706], [885, 2403], [386, 2067], [126, 1479], [76, 854],
                        [745, 76], [1846, 76, 'pier'],
                        [1758, 651], [1252, 1075], [824, 1505], [970, 1852], [1625, 1960], [1751, 2434], [1732, 2915], [1909, 3490], [1764, 3850], [1764, 4502], [1549, 4830], [1163, 4622], [1106, 4950], [1264, 5330], [1815, 5589], [1947, 5956]
                    ],
                    obstacles: [
                        [[2000, 0], [2000, 6000]],
                        [[0, 0], [0, 6000]],
                        [[0, 6000], [2000, 6000]]
                    ],
                    lander: {
                        x: 1100,
                        y: 5700,
                        xSpeed: -10,
                        ySpeed: -10,
                        fuel: 1750,
                        angle: -180,
                        power: 0
                    },
                    constraints: {
                        landingMaxXSpeed: 5,
                        landingMaxYSpeed: 5,
                        landingMinAngle: -98,
                        landingMaxAngle: -82,
                        minAngle: -360,
                        maxAngle: 0,
                        minPower: -1,
                        maxPower: 1,
                        maxAngleChange: 5,
                        maxPowerChange: 1,
                        crashDistance: 90
                    }
                },
                "Boat Pier": {
                    landerType: 'boat',
                    world: {
                        width: 4000,
                        height: 1000,
                        vAcceleration: 1.5,
                        hAcceleration: -1.5
                    },
                    terrainPoints: [
                        [0, 1000], [0, 0], [1000, 0], [1000, 300], [1100, 300],
                        [1100, 0], [4000, 0, 'pier'],
                        [4000, 1000], [0, 1000]
                    ],
                    lander: {
                        x: 500,
                        y: 750,
                        xSpeed: 10,
                        ySpeed: 0,
                        fuel: 1750,
                        angle: -90,
                        power: 0
                    },
                    constraints: {
                        landingMaxXSpeed: 3,
                        landingMaxYSpeed: 3,
                        landingMinAngle: -92,
                        landingMaxAngle: -88,
                        minAngle: -720,
                        maxAngle: 720,
                        minPower: -2,
                        maxPower: 4,
                        maxAngleChange: 5,
                        maxPowerChange: 1,
                        crashDistance: 90
                    }
                },
                "Boat Fjord": {
                    landerType: 'boat',
                    world: {
                        width: 2000,
                        height: 7000,
                        vAcceleration: 0.5,
                        hAcceleration: 0
                    },
                    terrainPoints: [
                        [1000, 7000], [200, 6000], [500, 5000], [750, 4500], [1000, 3500], [750, 3000], [50, 2500], [100, 2000], [500, 400],
                        [1100, 150], [1900, 150, 'pier'],
                        [800, 1750], [1100, 2000], [1350, 3000], [1750, 4800], [1250, 4500], [1000, 6000], [2000, 7000]
                    ],
                    obstacles: [
                        [[0, 0], [2000, 0]],
                        [[2000, 0], [2000, 7000]],
                        [[0, 0], [0, 7000]],
                        [[0, 7000], [2000, 7000]]
                    ],
                    lander: {
                        x: 1100,
                        y: 6600,
                        xSpeed: -10,
                        ySpeed: -10,
                        fuel: 1750,
                        angle: -180,
                        power: 0
                    },
                    constraints: {
                        landingMaxXSpeed: 5,
                        landingMaxYSpeed: 5,
                        landingMinAngle: -98,
                        landingMaxAngle: -82,
                        minAngle: -720,
                        maxAngle: 720,
                        minPower: -1,
                        maxPower: 1,
                        maxAngleChange: 5,
                        maxPowerChange: 1,
                        crashDistance: 90
                    }
                },
                "Rocket simple": {
                    landerType: 'rocket',
                    world: {
                        width: 2000,
                        height: 7000,
                        vAcceleration: -3.711,
                        hAcceleration: 0
                    },
                    terrainPoints: [
                        [0, 150], [2000, 150, 'landing']
                    ],
                    obstacles: [
                        [[0, 0], [2000, 0]],
                        [[2000, 0], [2000, 7000]],
                        [[0, 0], [0, 7000]],
                        [[0, 7000], [2000, 7000]],

                        [[500, 4500], [1000, 5000]],
                        [[1000, 5000], [1500, 4500]],
                        [[1500, 4500], [1000, 4000]],
                        [[1000, 4000], [500, 4500]]
                    ],
                    lander: {
                        x: 1100,
                        y: 6600,
                        xSpeed: 0,
                        ySpeed: 10,
                        fuel: 1750,
                        angle: 0,
                        power: 0
                    },
                    constraints: {
                        landingMaxXSpeed: 20,
                        landingMaxYSpeed: 40,
                        landingMinAngle: 0,
                        landingMaxAngle: 0,
                        minAngle: -90,
                        maxAngle: 90,
                        minPower: 0,
                        maxPower: 4,
                        maxAngleChange: 15,
                        maxPowerChange: 1,
                        crashDistance: 90
                    }
                },
                "Rocket fly over": {
                    landerType: 'rocket',
                    world: {
                        width: 7000,
                        height: 3000,
                        vAcceleration: -3.711,
                        hAcceleration: 0
                    },
                    terrainPoints: [
                        [16, 1914], [434, 1222], [869, 1101], [1360, 876], [1987, 820], [2309, 514], [2551, 111], [3500, 111, 'landing'], [3661, 449], [3951, 884], [4305, 1343], [4707, 1664], [5166, 1729], [5608, 1544], [5882, 1278], [6059, 1005], [6211, 707], [6614, 610], [6992, 828]
                    ],
                    obstacles: [
                        [[0, 0], [7000, 0]],
                        [[7000, 0], [7000, 3000]],
                        [[0, 0], [0, 3000]],
                        [[0, 3000], [7000, 3000]]
                    ],
                    lander: {
                        x: 6350,
                        y: 1500,
                        xSpeed: 0,
                        ySpeed: 7,
                        fuel: 1750,
                        angle: 0,
                        power: 0
                    },
                    constraints: {
                        landingMaxXSpeed: 7,
                        landingMaxYSpeed: 20,
                        landingMinAngle: 0,
                        landingMaxAngle: 0,
                        minAngle: -90,
                        maxAngle: 90,
                        minPower: 0,
                        maxPower: 4,
                        maxAngleChange: 15,
                        maxPowerChange: 1,
                        crashDistance: 90
                    }
                },
                "Rocket Climb": {
                    landerType: 'rocket',
                    world: {
                        width: 2000,
                        height: 7000,
                        vAcceleration: -3.711,
                        hAcceleration: 0
                    },
                    terrainPoints: [
                        [0, 6000], [700, 6000, 'landing'],
                        [800, 200], [2000, 200]
                    ],
                    obstacles: [
                        [[0, 0], [2000, 0]],
                        [[2000, 0], [2000, 7000]],
                        [[0, 0], [0, 7000]],
                        [[0, 7000], [2000, 7000]]
                    ],
                    lander: {
                        x: 1500,
                        y: 500,
                        xSpeed: 0,
                        ySpeed: 0,
                        fuel: 1750,
                        angle: 0,
                        power: 3
                    },
                    constraints: {
                        landingMaxXSpeed: 20,
                        landingMaxYSpeed: 40,
                        landingMinAngle: 0,
                        landingMaxAngle: 0,
                        minAngle: -90,
                        maxAngle: 90,
                        minPower: 0,
                        maxPower: 4,
                        maxAngleChange: 15,
                        maxPowerChange: 1,
                        crashDistance: 90
                    }
                },
                "Rocket Cavern": {
                    landerType: 'rocket',
                    world: {
                        width: 2000,
                        height: 7000,
                        vAcceleration: -3.711,
                        hAcceleration: 0
                    },
                    terrainPoints: [
                        [1000, 7000], [200, 6000], [500, 5000], [750, 4500], [1000, 3500], [750, 3000], [50, 2500], [100, 2000],
                        [800, 150], [1250, 150, 'landing'],
                        [800, 1500], [600, 2000], [1350, 3000], [1550, 4000], [1250, 4500], [700, 5500], [1000, 6000], [2000, 7000]
                    ],
                    obstacles: [
                        [[0, 0], [2000, 0]],
                        [[2000, 0], [2000, 7000]],
                        [[0, 0], [0, 7000]],
                        [[0, 7000], [2000, 7000]]
                    ],
                    lander: {
                        x: 1100,
                        y: 6600,
                        xSpeed: 0,
                        ySpeed: 0,
                        fuel: 1750,
                        angle: 0,
                        power: 0
                    },
                    constraints: {
                        landingMaxXSpeed: 20,
                        landingMaxYSpeed: 40,
                        landingMinAngle: 0,
                        landingMaxAngle: 0,
                        minAngle: -90,
                        maxAngle: 90,
                        minPower: 0,
                        maxPower: 4,
                        maxAngleChange: 15,
                        maxPowerChange: 1,
                        crashDistance: 90
                    }
                },
                "Rocket Stalagtite": {
                    landerType: 'rocket',
                    world: {
                        width: 7000,
                        height: 3000,
                        vAcceleration: -3.711,
                        hAcceleration: 0
                    },
                    terrainPoints: [
                        [0, 2500], [100, 200], [500, 150],
                        [1000, 2000], [2000, 2000, 'landing'],
                        [2010, 1500], [2200, 800], [2500, 200], [6899, 300], [7000, 2500], [4100, 2600], [4200, 1000], [3400, 3000]
                    ],
                    obstacles: [
                        [[0, 0], [7000, 0]],
                        [[7000, 0], [7000, 3000]],
                        [[0, 0], [0, 3000]],
                        [[0, 3000], [7000, 3000]]
                    ],
                    lander: {
                        x: 4500,
                        y: 2300,
                        xSpeed: 20,
                        ySpeed: -15,
                        fuel: 1750,
                        angle: 0,
                        power: 0
                    },
                    constraints: {
                        landingMaxXSpeed: 20,
                        landingMaxYSpeed: 40,
                        landingMinAngle: 0,
                        landingMaxAngle: 0,
                        minAngle: -90,
                        maxAngle: 90,
                        minPower: 0,
                        maxPower: 4,
                        maxAngleChange: 15,
                        maxPowerChange: 1,
                        crashDistance: 90
                    }
                },
                "Rocket Small": {
                    landerType: 'rocket',
                    world: {
                        width: 1000,
                        height: 500,
                        vAcceleration: -3.711,
                        hAcceleration: 0
                    },
                    terrainPoints: [
                        [0, 150], [1000, 150, 'landing']
                    ],
                    obstacles: [
                        [[0, 0], [1000, 0]],
                        [[1000, 0], [1000, 500]],
                        [[0, 0], [0, 500]],
                        [[0, 500], [1000, 500]]
                    ],
                    lander: {
                        x: 500,
                        y: 400,
                        xSpeed: 0,
                        ySpeed: 0,
                        fuel: 400,
                        angle: 0,
                        power: 0
                    },
                    constraints: {
                        landingMaxXSpeed: 5,
                        landingMaxYSpeed: 3,
                        landingMinAngle: 0,
                        landingMaxAngle: 0,
                        minAngle: -90,
                        maxAngle: 90,
                        minPower: 0,
                        maxPower: 4,
                        maxAngleChange: 3,
                        maxPowerChange: 1,
                        distanceToObstacles: 50,
                        crashDistance: 90
                    }
                }
            }
        }
    };
    return singleton();
});