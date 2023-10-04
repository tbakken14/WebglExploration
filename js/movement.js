class Movement {
    static addPlayerMovement(document, playerModel) {
        document.addEventListener("keydown", (event) => {
            if (event.repeat) { return }
            switch (event.key) {
                case "ArrowUp" :
                case "W":
                    playerModel.translationVelocity[0] += Math.cos(playerModel.rotation);
                    playerModel.translationVelocity[1] += Math.sin(playerModel.rotation);
                    break;
                case "ArrowDown" :
                case "S":
                    playerModel.translationVelocity[0] -= Math.cos(playerModel.rotation);
                    playerModel.translationVelocity[1] -= Math.sin(playerModel.rotation);
                    break;
                case "ArrowLeft" :
                case "A":
                    playerModel.rotationVelocity += .001;
                    break;
                case "ArrowRight" :
                case "D":
                    playerModel.rotationVelocity -= .001;
                    break;
                default:
                    break;
            }
        })
    }
}

export default Movement;