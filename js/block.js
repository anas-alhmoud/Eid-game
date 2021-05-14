class Block {
    constructor(x, y, obList) {

        this.obList = obList

        this.self = document.createElement("div");
        this.self.setAttribute("class", "block");

        this.yPosition = y;
        this.xPosition = x;

        this.self.style.top = this.yPosition + "px";

        this.self.style.left = this.xPosition + "px";


        gameScreen.append(this.self);

        this.width = this.self.getBoundingClientRect().width;
        this.height = this.self.getBoundingClientRect().height;
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