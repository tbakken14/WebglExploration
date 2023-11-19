import Spawn from "./spawn.js";
import Profile from "./profile.js";

class Input {
    static ammo = Profile.ammo;
    static isReloading = false;
    static addKeyboardInputListeners() {
        document.addEventListener("keydown", (event) => {
            if (event.repeat) { return }
            switch (event.key) {
                case "ArrowUp" :
                case "w":
                    Spawn.player.translationVelocity[0] += Profile.speed*Math.cos(Spawn.player.rotation);
                    Spawn.player.translationVelocity[1] += Profile.speed*Math.sin(Spawn.player.rotation);
                    break;
                case "ArrowDown" :
                case "s":
                    Spawn.player.translationVelocity[0] -= Profile.speed*.5*Math.cos(Spawn.player.rotation);
                    Spawn.player.translationVelocity[1] -= Profile.speed*.5*Math.sin(Spawn.player.rotation);
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
                    if (!Input.isReloading) {
                        Spawn.spawnProjectile();
                        Input.ammo--;
                        if (Input.ammo == 0) {
                            Input.isReloading = true;
                            setTimeout(() => {
                                Input.ammo = Profile.ammo;
                                Input.isReloading = false;
                            }, Profile.reload * 1000)
                        }
                    }
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