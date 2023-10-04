class Movement {
    static addPlayerMovement(document, playerModel) {
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
                default:
                    break;
            }
        });
        
        document.addEventListener("keyup", (event) => {
            if (event.repeat) { return }
            switch (event.key) {
                case "ArrowLeft" :
                case "A":
                    playerModel.rotationVelocity = 0;
                    break;
                case "ArrowRight" :
                case "D":
                    playerModel.rotationVelocity = 0;
                    break;
                default:
                    break;
            }
        });
    }
}

export default Movement;