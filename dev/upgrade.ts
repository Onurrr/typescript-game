class Upgrade extends DomObject {    
        
    constructor() {
        super('upgrade')

    }

    public update():void {

        this.y += this.speed
        
        if( this.y >= window.innerHeight  ) {
            this.randomPosition()
            this.reset()
            this.getBoundingClientRect()
        }

        //this.element.remove()
        //console.log("picked up upgrade")

         this.element.style.transform = `translate(${this.x}px, ${this.y}px)`
    }
}