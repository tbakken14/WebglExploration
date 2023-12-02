import Model from "./model.js";
import Spawn from "./spawn.js";
import GUI from "./GUI.js";

class Game {
    static startGame;
    static isEndGame = false;
    static score = 0;
    static gui = new GUI();


    static endGame() {
        Game.isEndGame = true;
        let body = document.getElementsByTagName("body")[0];
        let gameView = document.getElementById("gameView");
        let gameOverElement = document.createElement("h1");
        gameOverElement.setAttribute("id", "gameOver");
        gameOverElement.innerHTML = "Game Over";
        gameView.appendChild(gameOverElement);

        this.gui.showElements(this.gui.upgradeButtons);
        /*
        let newGameButton = document.createElement("button");
        newGameButton.setAttribute("id", "newGame");
        newGameButton.innerHTML = "New Game";
        newGameButton.onclick = () => {
            gameOverElement.remove();
            newGameButton.remove(); 
            upgradeAmmoButton.remove(); 
            upgradeSpeedButton.remove(); 
            Game.startGame();
        };

        let upgradeAmmoButton = document.createElement("button");
        upgradeAmmoButton.setAttribute("id", "upgradeAmmo");
        upgradeAmmoButton.innerHTML = "Upgrade Ammo";
        upgradeAmmoButton.onclick = () => {
            Profile.upgradeAmmo();
        }

        let upgradeSpeedButton = document.createElement("button");
        upgradeSpeedButton.setAttribute("id", "upgradeSpeed");
        upgradeSpeedButton.innerHTML = "Upgrade Speed";
        upgradeSpeedButton.onclick = () => {
            Profile.upgradeSpeed();
        }

        body.appendChild(newGameButton);
        body.appendChild(upgradeSpeedButton);
        body.appendChild(upgradeAmmoButton);
        */
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