import Game from "./game.js";
import Profile from "./profile.js";

class GUI {
    constructor() {
        this.newGameButton = this.createNewGameButton();
        this.upgradeButtons = this.createUpgradeButtons();
    }


    showElements(elements) {
        elements.forEach((e) => {
            e.style["display"] = "inline";
        });
    }
    hideElements(elements) {
        elements.forEach((e) => {
            e.style["display"] = "none";
        });
    }

    addToDocument(elements) {
        const body = document.getElementsByTagName("body")[0];
        elements.forEach((e) => {
            body.append(e);
        });
    }

    createNewGameButton() {
        let newGameButton = document.createElement("button");
        newGameButton.setAttribute("id", "newGame");
        newGameButton.innerHTML = "New Game";
        newGameButton.onclick = () => {
            //gameOverElement.remove();
            this.hideElements(this.upgradeButtons);
            this.hideElements([this.newGameButton]);
            Game.startGame();
        };
        this.addToDocument([newGameButton]);
        return newGameButton;
    }

    createUpgradeButton(className, text, onclick) {
        let body = document.getElementsByTagName("body")[0];
        let upgradeButton = document.createElement("button");
        upgradeButton.setAttribute("class", className);
        upgradeButton.innerHTML = text;
        upgradeButton.onclick = onclick;
        return upgradeButton;
    }
    
    createUpgradeButtons() {
        let upgradeButtons = [];
        upgradeButtons.push(this.createUpgradeButton("Upgrade", "Ammo Upgrade", () => Profile.upgradeAmmo()));
        upgradeButtons.push(this.createUpgradeButton("Upgrade", "Reload Upgrade", () => Profile.reloadUpgrade()));
        upgradeButtons.push(this.createUpgradeButton("Upgrade", "Speed Upgrade", () => Profile.speedUpgrade()));
        this.hideElements(upgradeButtons);
        this.addToDocument(upgradeButtons);
        return upgradeButtons;
    }
}

export default GUI;