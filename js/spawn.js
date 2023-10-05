import Model from "./model.js";
import Shape from "./shape.js";
import Color from "./color.js";

class Spawn {
    static rate = 4000;
    static lastSpawnTime = 0;
    static player;

    static spawnHandler() {
        const time = performance.now();
        if (Spawn.rate <= time - Spawn.lastSpawnTime) {
            Spawn.lastSpawnTime = time;
            Spawn.spawnAsteroid();
        }
    }
    static spawnAsteroid() {
        if (Spawn.rate > 400) {
            Spawn.rate -= 100;
        }
        const location = Spawn.#getSpawnLocation();
        const rotationVelocity = (Math.random() * 2 - 1) / 50;
        const scale = (Math.random()) * 2 + 1;
        const translationVelocity = [2 * (Math.random() * 2 - 1), 2 * (Math.random() * 2 - 1)];
        new Model(Shape.CirclePie(30, 20), 
                        Color.buildColors(20, Color.asteroid, true), 
                        0, location, [scale, scale], 
                        rotationVelocity, translationVelocity, [0, 0], true, 30 * scale, true, false);
    }

    static spawnPlayer() {
        Spawn.player = new Model(Shape.Rectangle(20, 20).concat(Shape.Triangle([50, 0], [10, 10], [10, -10])),
                        Color.buildColors(3, Color.solidColor(.8, .2, .7)),
                        0, [400, 400], [1, 1], 
                        0, [0, 0], [0, 0], true, 1, false, true, () => endGame());
    }

    static spawnProjectile() {
        const speed = 3;
        new Model(Shape.CirclePie(20, 20), Color.buildColors(20, Color.projectile),
                Spawn.player.rotation, [...Spawn.player.translation], [.5, .5], 0, 
                [speed * Math.cos(Spawn.player.rotation) + Spawn.player.translationVelocity[0], 
                 speed * Math.sin(Spawn.player.rotation) + Spawn.player.translationVelocity[1]], 
                [0, 0], false, 10, false, false);
    }

    static #getSpawnLocation() {
        const width = 1400;
        const height = 800;
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