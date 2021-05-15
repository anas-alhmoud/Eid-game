// every "position" means pixels relative to gameScreen

const gameScreen = document.getElementById("game-screen");

const screen = {
    width: gameScreen.getBoundingClientRect().width,
    height: gameScreen.getBoundingClientRect().height,
    bottom: gameScreen.getBoundingClientRect().bottom,
    top: gameScreen.getBoundingClientRect().top
}

var GM = new GameManager()

GM.makePlayer();

GM.startAttack();

GM.makeBlock();

GM.makeBlock();
