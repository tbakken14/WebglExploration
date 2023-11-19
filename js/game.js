import Model from "./model.js";
import Spawn from "./spawn.js";

class Game {
    static startGame;
    static isEndGame = false;
    static score = 0;


    static endGame() {
        Game.isEndGame = true;
        let body = document.getElementsByTagName("body")[0];
        let gameOverElement = document.createElement("h1");
        gameOverElement.setAttribute("id", "gameOver");
        gameOverElement.innerHTML = "Game Over";
        body.appendChild(gameOverElement);

        let newGameButton = document.createElement("button");
        newGameButton.setAttribute("id", "newGame");
        newGameButton.innerHTML = "New Game";
        newGameButton.onclick = () => {
            gameOverElement.remove();
            newGameButton.remove(); 
            Game.startGame();
        };
        body.appendChild(newGameButton);
    }
    
    static incrementScore() {
        this.score += 1;
        const scoreElement = document.getElementById("score");
        scoreElement.innerHTML = "Score: " + this.score;
    }

    static resetGame() {
        this.isEndGame = false;
        this.score = 0;
        const scoreElement = document.getElementById("score");
        scoreElement.innerHTML = "Score: " + this.score;
        Model.reset();
        Spawn.spawnPlayer();
    }
}

export default Game;