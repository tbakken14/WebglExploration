import Model from "./model.js";

class Input {
    static addKeyboardInputListeners(document, playerModel, projectileModel, models) {
        document.addEventListener("keydown", (event) => {
            if (event.repeat) { return }
            switch (event.key) {
                case "ArrowUp" :
                case "w":
                    playerModel.translationVelocity[0] += Math.cos(playerModel.rotation);
                    playerModel.translationVelocity[1] += Math.sin(playerModel.rotation);
                    break;
                case "ArrowDown" :
                case "s":
                    playerModel.translationVelocity[0] -= .5*Math.cos(playerModel.rotation);
                    playerModel.translationVelocity[1] -= .5*Math.sin(playerModel.rotation);
                    break;
                case "ArrowLeft" :
                case "a":
                    playerModel.rotationVelocity = .03;
                    break;
                case "ArrowRight" :
                case "d":
                    playerModel.rotationVelocity = -.03;
                    break;
                case " " :
                    Input.fireProjectile(projectileModel, playerModel, models);
                    break;
                default:
                    break;
            }
        });
        
        document.addEventListener("keyup", (event) => {
            if (event.repeat) { return }
            switch (event.key) {
                case "ArrowLeft" :
                case "a":
                    playerModel.rotationVelocity = 0;
                    break;
                case "ArrowRight" :
                case "d":
                    playerModel.rotationVelocity = 0;
                    break;
                default:
                    break;
            }
        });
    }

    static fireProjectile(projectile, player) {
        const speed = 3;
        const spawnedProjectile = new Model([...projectile.vertices], [...projectile.colors],
                player.rotation, [...player.translation], [...projectile.scalation],
                projectile.rotationVelocity, 
                [speed * Math.cos(player.rotation), speed * Math.sin(player.rotation)], 
                [...projectile.scalationVelocity],
                false, projectile.colliderRadius, projectile.isAsteroid);
        spawnedProjectile.translationVelocity = spawnedProjectile.translationVelocity.map((e, i) => e + player.translationVelocity[i]);
    }
}

export default Input;