class Game {
    static isEndGame = false;
    static score = 0;


    static endGame() {
        this.isEndGame = true;
    }
    
    static incrementScore() {
        this.score += 1;
    }

    static resetGame() {
        this.isEndGame = false;
        this.score = 0;
    }
}

export default Game;