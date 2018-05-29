class Imp extends DomObject {    
        
    constructor() {
        super('imp')

    }

    public update():void {

        this.y += this.speed
        
        if( this.y >= window.innerHeight  ) {
            this.randomPosition()
            this.reset()
            this.getBoundingClientRect()
         }
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`
    }
}