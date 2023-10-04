class Movement {
    constructor(window, playerModel) {
        this.window = window;
        this.playerModel = playerModel;
    }

    addKeyboardEvents() {
        this.window.document = addEventListener("keydown", (event) => {
            switch (event.key) {
                case "ArrowUp" :
                case "W":
                    this.playerModel.translationVelocity[0] += Math.cos(this.playerModel.rotation);
                    this.playerModel.translationVelocity[1] += Math.sin(this.playerModel.rotation);
                    break;
                case "ArrowDown" :
                case "S":
                    this.playerModel.translationVelocity[0] -= Math.cos(this.playerModel.rotation);
                    this.playerModel.translationVelocity[1] -= Math.sin(this.playerModel.rotation);
                    break;
                case "ArrowLeft" :
                case "A":
                    this.playerModel.rotationVelocity += .001;
                    break;
                case "ArrowRight" :
                case "D":
                    this.playerModel.rotationVelocity -= .001;
                    break;
                default:
                    break;
            }
        })
    }
}

export default Movement;