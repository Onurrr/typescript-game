abstract class DomObject {

    public element: HTMLElement

    public x           : number = 0
    public y           : number = 0
    public speedX      : number = 0
    public speedY      : number = 0
    public minWidth    : number = 0
    public maxWidth    : number = 0
    public maxHeight   : number = 0
    public espeed      : number = 0

    constructor(type : string) {
        this.element = document.createElement(type)
        let foreground = document.getElementsByTagName("foreground")[0]
        foreground.appendChild(this.element);

        this.y = -(this.element.clientHeight)
        this.x = Math.random() * window.innerWidth 
        this.espeed = Math.random() * 10
    }

    abstract update() : void

    public randomPosition() {
        this.minWidth = 0
        this.maxWidth = window.innerWidth - this.element.clientWidth
        this.maxHeight = window.innerHeight - this.element.clientHeight

        this.x = (Math.random() * (this.maxWidth - this.minWidth) + this.minWidth)
        this.y = (Math.random() * (this.maxHeight - 0) + 0 )
    }

    public getBoundingClientRect() {
        return this.element.getBoundingClientRect();
    }

    public reset() {
        this.y = (this.element.clientHeight) - this.element.clientHeight
        this.x = Math.random() * (window.innerWidth - this.element.clientWidth)
    }

}