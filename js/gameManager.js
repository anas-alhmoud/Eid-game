class GameManager {

    constructor(){
        this.observerList = new ObserverList();
        this.kills = 0;
    }
    
    startAttack(){
        var initialAttackers = 0;

        this.interval = setInterval(() => {
            GM.makeAttacker();
            if(initialAttackers > 4){
                clearInterval(this.interval)
            } 
            initialAttackers++;
        }, 1000) 
    }

    makePlayer(){
        const player = new Player(this.observerList, this);

        this.observerList.add(player);

        return this;
    }
    
    makeAttacker() {
        const att = new Attacker(Math.random() * 960, this.observerList, this);

        this.observerList.add(att);

        att.move();

        return this;
    }

    makeBoss() {
        const boss = new Boss(Math.random() * 840, this.observerList, this);

        this.observerList.add(boss);

        boss.move();

        boss.shoot();

        return this;
    }

    makeBlock(){
        this.observerList.add(new Block(Math.random() * 920, Math.random() * (660 - 200) + 200, this.observerList))
    }

    attackerKilled() {

        this.kills++;
        
        if (this.kills < 45) {
            this.makeAttacker();
        } else if (this.kills === 50) {
            this.makeBoss();
        } else if (this.kills === 51){
            this.playerWon();
        }

        return this;
    }

    bossKilled(){
        return this.attackerKilled() 
    }

    updateKills() {

        document.getElementById("counter").innerHTML = "kills: " + this.kills;

        return this;
    }

    #playerState(color){
        window.requestAnimationFrame = (a) => { return; }

        if (this.interval)
            clearInterval(this.interval);
            
        document.getElementById("counter").style.backgroundColor = color;
    }

    playerLost(){

        this.#playerState("red")
    }

    playerWon(){
        
        this.#playerState("green")
    }

}