import Spawn from "./spawn.js";

class Input {
    static addKeyboardInputListeners() {
        document.addEventListener("keydown", (event) => {
            if (event.repeat) { return }
            switch (event.key) {
                case "ArrowUp" :
                case "w":
                    Spawn.player.translationVelocity[0] += Math.cos(Spawn.player.rotation);
                    Spawn.player.translationVelocity[1] += Math.sin(Spawn.player.rotation);
                    break;
                case "ArrowDown" :
                case "s":
                    Spawn.player.translationVelocity[0] -= .5*Math.cos(Spawn.player.rotation);
                    Spawn.player.translationVelocity[1] -= .5*Math.sin(Spawn.player.rotation);
                    break;
                case "ArrowLeft" :
                case "a":
                    Spawn.player.rotationVelocity = .03;
                    break;
                case "ArrowRight" :
                case "d":
                    Spawn.player.rotationVelocity = -.03;
                    break;
                case " " :
                    Spawn.spawnProjectile();
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
                    Spawn.player.rotationVelocity = 0;
                    break;
                case "ArrowRight" :
                case "d":
                    Spawn.player.rotationVelocity = 0;
                    break;
                default:
                    break;
            }
        });
    }
}

export default Input;