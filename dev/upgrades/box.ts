class Box extends DomObject {    
        
    constructor() {
        super('box')
    }

    public update():void {

        this.y += this.espeed
        
        if( this.y >= window.innerHeight  ) {
            this.randomPosition()
            this.reset()
            this.getBoundingClientRect()
        }
         this.element.style.transform = `translate(${this.x}px, ${this.y}px)`
    }
}