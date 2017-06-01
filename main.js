require([
    "canvas",
    "controls",
    "lander",
    "world",
    "ga",
    "levels"
], function (Canvas, Controls, Lander, World, GA, Levels) {
    var world, ga, evolve;

    Canvas.init();
    Controls.init(recreateEngine);
    Controls.addButton("Run Once", function () {
        if (!evolve) {
            run(true);
        }
    });
    Controls.addButton("Run Many", function () {
        evolve = true;
        run();
    });
    Controls.addButton("Pause", function () {
        evolve = false;
    });
    Controls.addButton("Show movement", function () {
        evolve = false;
        Canvas.clearTag('flight-trajectory');
        var bestLander = world.landers[0];
        Canvas.animateObject(bestLander.initX, bestLander.initY, bestLander.points, bestLander.angles, ga.landerType);
    });
    Controls.addButton("Force draw", function () {
        world.drawLanders();
    });

    function recreateEngine(levelName) {
        evolve = false;
        var levelData = Levels.list[levelName];
        world = new World(levelData);
        ga = new GA(200, 10, levelData.landerType == 'rocket' ? 300 : 350, world, levelData.lander, levelData.constraints, levelData.landerType);
    }

    var run = function (force) {
        if (!evolve && !force) {
            return
        }
        if (!world.landers.length) {
            world.landers = ga.initialPopulation();
        } else {
            world.landers = ga.nextPopulation(world.landers);
        }
        world.redrawLanders();
        var bestScore = world.landers[0].score;
        document.getElementById('bestValue').innerText = 'Best score: ' + bestScore;
        document.getElementById('generationValue').innerText = 'Generation: ' + ga.generation;
        if (bestScore > 300) {
            evolve = false;
        }

        if (evolve) {
            setTimeout(run, 1);
        }
    };
});
