class Attacker {
    constructor(x, obList, GM) {

        this.obList = obList
        this.GM = GM

        this.self = document.createElement("div");
        this.self.setAttribute("class", "attacker");

        this.yPosition = 0;

        this.self.style.top = this.yPosition + "px";

        this.self.style.left = x + "px";


        this.destroyed = false;

        gameScreen.append(this.self)
    }

    move() {
        if (!this.destroyed) {
            if (this.self.getBoundingClientRect().top > gameScreen.getBoundingClientRect().bottom) {
                this.remake();
                return;
            }

            this.yPosition += 5;
            this.self.style.top = this.yPosition + "px";

            this.obList.notify("attackerMoved", this)

            window.requestAnimationFrame(() => this.move());
        }
    }

    remake(){
        this.destroy();
        this.GM.makeAttacker();
    }

    bulletMoved(bullet) {
        bullet.destroy();
        this.destroy();
        this.GM.attackerKilled().updateKills();
    }

    destroy() {
        gameScreen.removeChild(this.self);
        this.destroyed = true;
        this.obList.reomve(this);
    }
}

class Boss {

    constructor(x, obList, GM) {

        this.obList = obList
        this.GM = GM

        this.self = document.createElement("div");
        this.self.setAttribute("class", "boss");

        gameScreen.append(this.self)

        this.yPosition = 0;
        this.xPosition = x;

        this.self.style.top = this.yPosition + "px";
        this.self.style.left = this.xPosition + "px";

        this.destroyed = false;

        this.health = 20;

        this.xChangeRate = 3;
        this.yChangeRate = 3;

        this.shootDelay = 1000;


        this.width = this.self.getBoundingClientRect().width;
        this.height = this.self.getBoundingClientRect().height;
    }

    move() {
        if (!this.destroyed) {

            if (this.xPosition + this.self.getBoundingClientRect().width > screen.width || this.xPosition < 0) {
                this.xChangeRate = this.xChangeRate * -1
            }

            if (this.yPosition + this.self.getBoundingClientRect().height > screen.height || this.yPosition < 0) {
                this.yChangeRate = this.yChangeRate * -1
            }


            this.moveX();
            this.moveY();

            this.obList.notify("bossMoved", this);

            window.requestAnimationFrame(() => this.move());
        }
    }

    moveY(){
        this.yPosition += this.yChangeRate;
        this.self.style.top = this.yPosition + "px";

        this.obList.notify("bossYMoved", this);
    }

    moveX(){
        this.xPosition += this.xChangeRate;
        this.self.style.left = this.xPosition + "px";

        this.obList.notify("bossXMoved", this);
    }

    shoot() {
        if (!this.destroyed) {
            let b = new BossBullet(this.xPosition + this.width / 2, this.yPosition + this.height, this.obList);

            this.obList.add(b);

            b.move();

            setTimeout(() => { this.shoot(); }, this.shootDelay);
        }
    }

    bulletMoved(bullet) {
        this.health--;
        bullet.destroy();
        if (this.health < 1) {
            this.destroy();
            this.GM.bossKilled().updateKills();
        }
    }

    destroy() {
        gameScreen.removeChild(this.self);
        this.destroyed = true;
        this.obList.reomve(this);
    }
}

class BossBullet {
    constructor(x, y, obList) {
        this.obList = obList

        this.self = document.createElement("div");
        this.self.setAttribute("class", "boss-bullet")

        this.yPosition = y;
        this.xPosition = x;

        this.yChangeRate = 6;

        this.self.style.top = this.yPosition + "px"
        this.self.style.left = this.xPosition + "px"

        this.destroyed = false;

        gameScreen.append(this.self)

    }

    move() {
        if (!this.destroyed) {
            if (this.self.getBoundingClientRect().top > gameScreen.getBoundingClientRect().bottom) {
                this.destroy();
                return;
            }

            this.yPosition += this.yChangeRate;
            this.self.style.top = this.yPosition + "px";

            this.obList.notify("bossBulletMoved", this);

            window.requestAnimationFrame(() => this.move());
        }
    }

    destroy() {
        gameScreen.removeChild(this.self);
        this.destroyed = true;
        this.obList.reomve(this);
    }

}