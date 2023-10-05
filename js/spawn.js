import Model from "./model.js";
import Shape from "./shape.js";
import Color from "./color.js";

class Spawn {
    static rate = 5000;
    static lastSpawnTime = 0;

    static spawnHandler() {
        const time = performance.now();
        if (Spawn.rate <= time - Spawn.lastSpawnTime) {
            Spawn.lastSpawnTime = time;
            Spawn.spawnAsteroid();
        }
    }
    static spawnAsteroid() {
        Spawn.rate -= 100;
        const location = Spawn.#getSpawnLocation();
        const rotationVelocity = (Math.random() * 2 - 1) / 50;
        const scale = (Math.random()) * 2 + 1;
        const translationVelocity = [(Math.random() * 2 - 1), (Math.random() * 2 - 1)];
        const asteroid = new Model(Shape.CirclePie(30, 20), 
                        Color.buildColors(20, Color.asteroid, true), 
                        0, location, [scale, scale], 
                        rotationVelocity, translationVelocity, [0, 0], true, 30 * scale, true);
    }

    static #getSpawnLocation() {
        const width = 1000;
        const height = 1000;
        const perimeterPercent = Math.random();
        if (perimeterPercent < .25) {
            return [0, perimeterPercent * height];
        }
        else if (perimeterPercent < .5) {
            return [(perimeterPercent - .25) * width, height];
        }
        else if (perimeterPercent < .75) {
            return [width, (.75 - perimeterPercent) * height];
        }
        else {
            return [(1 - perimeterPercent) * width, 0]
        }
    }
}

export default Spawn;