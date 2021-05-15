class Block {
    constructor(x, y) {

        this.self = document.createElement("div");
        this.self.setAttribute("class", "block");

        this.self.style.top = y + "px";
        this.self.style.left = x + "px";

        gameScreen.append(this.self);
    }

    bulletMoved(bullet) {
        bullet.destroy();
    }

    bossBulletMoved(bullet){
        bullet.destroy();
    }

    attackerMoved(attacker) {
        attacker.remake();
    }

    bossXMoved(boss){
        boss.xChangeRate = boss.xChangeRate * -1

        boss.moveX();
    }

    bossYMoved(boss){
        boss.yChangeRate = boss.yChangeRate * -1

        boss.moveY();
    }
}