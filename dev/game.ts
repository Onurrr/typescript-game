class Game {

    private static instance: Game;
    
    private score:number = 0
    private textfield:HTMLElement
    private player:Player
    private upgrades:DomObject[] = []
    private enemies:DomObject[] = []
    
    private constructor() {
        this.textfield = document.getElementsByTagName("textfield")[0] as HTMLElement

        this.player = new Player()


        this.upgrades.push(
            new Coin(),
            new Box(),
        )

        this.enemies.push(
            new Imp(),
            new Goblin(),
            new Imp(),
            new Goblin(),
        )
        this.gameLoop()    
    }

    public static getInstance() {
        if (! Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    }
    
    private gameLoop():void{
        requestAnimationFrame(() => this.gameLoop())
        this.player.update()
        for(const enemy of this.enemies ) {
            enemy.update()
            if( Util.checkCollision( this.player.getBoundingClientRect(), enemy.getBoundingClientRect()  ) ) {
                enemy.reset()
                this.player.setBehavior(new DamagedBehavior(this.player))
                setTimeout(() => { 
                    this.player.setBehavior(new NormalBehavior(this.player))
                }, 1500)
                this.score --
            }
            this.textfield.innerHTML = "Score: " + this.score 
        }
        for (const upgrade of this.upgrades) {
            upgrade.update()

            if( Util.checkCollision(upgrade.getBoundingClientRect(), this.player.getBoundingClientRect()) ) {
                upgrade.reset()
                this.player.setBehavior(new UpgradeBehavior(this.player))
                setTimeout(() => { 
                    this.player.setBehavior(new NormalBehavior(this.player))
                }, 1500)

                this.score ++
                this.textfield.innerHTML = "Score: " + this.score 
            }
    }
    }
       
    public scorePoint() {
        this.score ++
        this.textfield.innerHTML = "Score: " + this.score 
    }

    public reset() {
        this.score = 0
    }    

} 

window.addEventListener("load", () => {
    Game.getInstance();
});