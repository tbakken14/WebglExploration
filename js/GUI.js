import Game from "./game.js";

class GUI {
    static newGameButton = this.createNewGameButton();

    static showButtons() {

    }

    static hideButtons() {
        
    }

    static createNewGameButton() {
        newGameButton = document.createElement("button");
        newGameButton.setAttribute("id", "newGame");
        newGameButton.innerHTML = "New Game";
        newGameButton.onclick = () => {
            gameOverElement.remove();
            newGameButton.remove(); 
            upgradeAmmoButton.remove(); 
            upgradeSpeedButton.remove(); 
            Game.startGame();
        };
        return newGameButton;
    }
}