import Model from "./model.js";
import Spawn from "./spawn.js";

class Game {
    static isEndGame = false;
    static score = 0;


    static endGame() {
        this.isEndGame = true;
    }
    
    static incrementScore() {
        this.score += 1;
        const scoreElement = document.getElementById("score");
        scoreElement.innerHTML = "Score: " + this.score;
    }

    static resetGame() {
        this.isEndGame = false;
        this.score = 0;
        Model.reset();
        Spawn.spawnPlayer();
    }
}

export default Game;