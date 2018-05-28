class Game {

    private static instance: Game;
    
    private score:number = 0
    private textfield:HTMLElement
    private statusbar:HTMLElement
    private player:Player
    private enemies:Enemy[] = []
    
    private constructor() {
        this.textfield = document.getElementsByTagName("textfield")[0] as HTMLElement
        this.statusbar = document.getElementsByTagName("bar")[0] as HTMLElement

        this.player = new Player()
        this.enemies.push(new Enemy())
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
                this.score --
                console.log(this.score);
            }
            this.textfield.innerHTML = "Score: " + this.score 
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