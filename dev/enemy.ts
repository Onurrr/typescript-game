/// <reference path="DomObject.ts" />
class Enemy extends DomObject {    

    private posy:number
    private posx:number
    private speed:number
        
    constructor() {
        super('enemy')

        this.posy = -(this.element.clientHeight)
        this.posx = Math.random() * window.innerWidth 
        this.speed = 5

    }

    public update():void {

        this.posy += this.speed
        this.element.style.transform = `translate(${this.posx}px, ${this.posy}px)`

        if( this.posy >= window.innerHeight  ) {
            this.reset()
         }

    }

    public reset():void {
        this.posy = -(this.element.clientHeight)
        this.posx = Math.random() * (window.innerWidth - this.element.clientWidth)       
    }

    public getBoundingClientRect() {
        return this.element.getBoundingClientRect();
    }

}