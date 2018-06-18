class UpgradeBehavior implements PlayerBehavior {
    
    private player: Player

    constructor(player: Player) {
        this.player = player
    }

    public setBehavior() {  
        this.player.setSpeed(10)
    }
}