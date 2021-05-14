class Player {
    constructor(obList, GM) {

        this.obList = obList;
        this.GM = GM;

        this.self = document.createElement("div");
        this.self.setAttribute("id", "player");

        gameScreen.append(this.self);

        this.width = this.self.getBoundingClientRect().width;
        this.height = this.self.getBoundingClientRect().height;

        this.xPosition = screen.width / 2 - this.width / 2;
        this.self.style.left = this.xPosition + "px";

        this.isMovingRight = false;
        this.isMovingLeft = false;
        this.isShooting = false;

        this.xChangeRate = 6;
        this.shootDelay = 300;

        this.canShoot = true;

        window.addEventListener("keyup", (e) => {

            if (e.key === "ArrowRight") {
        
                this.isMovingRight = false;
        
            } else if (e.key === "ArrowLeft") {
        
                this.isMovingLeft = false;
        
            } else if (e.key === "Enter") {
        
                this.isShooting = false;
            }
        
        })
        
        window.addEventListener("keydown", (e) => {
        
            if (e.key === "ArrowRight") {
        
                this.isMovingRight = true;
        
            } else if (e.key === "ArrowLeft") {
        
                this.isMovingLeft = true;
        
            } else if (e.key === "Enter") {
        
                this.isShooting = true;
            }
        
        })

        window.requestAnimationFrame(() => this.updateState() );
    }

    moveRight() {
        if (this.xPosition + this.xChangeRate <= screen.width - this.width) {
            this.xPosition += this.xChangeRate;
            this.self.style.left = this.xPosition + "px";
        }
    }

    moveLeft() {
        if (this.xPosition - this.xChangeRate > 0) {
            this.xPosition -= this.xChangeRate;
            this.self.style.left = this.xPosition + "px";
        }
    }

    shoot() {

        let b1 = new PlayerBullet(this.xPosition + this.width / 4, this.obList);
        let b2 = new PlayerBullet(this.xPosition + this.width * 3 / 4, this.obList);

        this.obList.add(b1);
        this.obList.add(b2);

        b1.move();
        b2.move();

        this.canShoot = false;
        setTimeout(() => { this.canShoot = true }, this.shootDelay);
    }

    attackerMoved() {
        this.GM.playerLost();
    }

    bossMoved() {
        this.GM.playerLost();
    }

    bossBulletMoved() {
        this.GM.playerLost();
    }

    updateState() {

        if (this.isMovingRight) {
            this.moveRight();
        }
    
        if (this.isMovingLeft) {
            this.moveLeft();
        }
    
        if (this.isShooting && this.canShoot) {
            this.shoot();
        }
    
        window.requestAnimationFrame(() => this.updateState() );
    }

}

class PlayerBullet {
    constructor(x, obList) {

        this.obList = obList

        this.self = document.createElement("div");
        this.self.setAttribute("class", "bullet")

        this.yPosition = 85;
        this.xPosition = x;

        this.self.style.bottom = this.yPosition + "px"
        this.self.style.left = this.xPosition + "px"

        this.destroyed = false;


        this.yChangeRate = 6

        gameScreen.append(this.self)
    }

    move() {
        if (!this.destroyed) {
            if (this.self.getBoundingClientRect().bottom < gameScreen.getBoundingClientRect().top) {
                this.destroy();
                return;
            }

            this.yPosition += this.yChangeRate;
            this.self.style.bottom = this.yPosition + "px";

            this.obList.notify("bulletMoved", this);

            window.requestAnimationFrame(() => this.move());
        }
    }

    destroy() {
        gameScreen.removeChild(this.self);
        this.destroyed = true;
        this.obList.reomve(this);
    }
}