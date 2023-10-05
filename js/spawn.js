import Model from "./model.js";
import Shape from "./shape.js";
import Color from "./color.js";

class Spawn {
    static rate = 10000;
    static lastSpawnTime = 0;

    static spawnHandler() {
        const time = performance.now();
        if (Spawn.rate <= time - Spawn.lastSpawnTime) {
            Spawn.lastSpawnTime = time;
            Spawn.spawnAsteroid();
        }
    }
    static spawnAsteroid() {
        const asteroid = new Model(Shape.CirclePie(30, 20), 
                        Color.buildColors(20, Color.asteroid, true), 
                        0, [150, 100], [3, 3], 
                        0, [.2, .3], [0, 0], true, 90, true);
    }
}

export default Spawn;