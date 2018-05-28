"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DomObject = (function () {
    function DomObject(type) {
        this.x = 0;
        this.y = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.minWidth = 0;
        this.maxWidth = 0;
        this.maxHeight = 0;
        this.element = document.createElement(type);
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.element);
    }
    DomObject.prototype.draw = function () {
        this.element.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    DomObject.prototype.randomPosition = function () {
        this.minWidth = 0;
        this.maxWidth = window.innerWidth - this.element.clientWidth;
        this.maxHeight = window.innerHeight - this.element.clientHeight;
        this.x = (Math.random() * (this.maxWidth - this.minWidth) + this.minWidth);
        this.y = (Math.random() * (this.maxHeight - 0) + 0);
    };
    DomObject.prototype.getBoundingClientRect = function () {
        return this.element.getBoundingClientRect();
    };
    return DomObject;
}());
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy() {
        var _this = _super.call(this, 'enemy') || this;
        _this.posy = -(_this.element.clientHeight);
        _this.posx = Math.random() * window.innerWidth;
        _this.speed = 5;
        return _this;
    }
    Enemy.prototype.update = function () {
        this.posy += this.speed;
        this.element.style.transform = "translate(" + this.posx + "px, " + this.posy + "px)";
        if (this.posy >= window.innerHeight) {
            this.reset();
        }
    };
    Enemy.prototype.reset = function () {
        this.posy = -(this.element.clientHeight);
        this.posx = Math.random() * (window.innerWidth - this.element.clientWidth);
    };
    Enemy.prototype.getBoundingClientRect = function () {
        return this.element.getBoundingClientRect();
    };
    return Enemy;
}(DomObject));
var Game = (function () {
    function Game() {
        this.score = 0;
        this.enemies = [];
        this.textfield = document.getElementsByTagName("textfield")[0];
        this.statusbar = document.getElementsByTagName("bar")[0];
        this.player = new Player();
        this.enemies.push(new Enemy());
        this.gameLoop();
    }
    Game.getInstance = function () {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        requestAnimationFrame(function () { return _this.gameLoop(); });
        this.player.update();
        for (var _i = 0, _a = this.enemies; _i < _a.length; _i++) {
            var enemy = _a[_i];
            enemy.update();
            if (Util.checkCollision(this.player.getBoundingClientRect(), enemy.getBoundingClientRect())) {
                enemy.reset();
                this.score--;
                console.log(this.score);
            }
            this.textfield.innerHTML = "Score: " + this.score;
        }
    };
    Game.prototype.scorePoint = function () {
        this.score++;
        this.textfield.innerHTML = "Score: " + this.score;
    };
    Game.prototype.reset = function () {
        this.score = 0;
    };
    return Game;
}());
window.addEventListener("load", function () {
    Game.getInstance();
});
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super.call(this, "player") || this;
        _this.speed = 4;
        _this.randomPosition();
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        return _this;
    }
    Player.prototype.update = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.y > (window.innerHeight)) {
            this.y = 0 - this.element.clientHeight;
        }
        if (this.y < 0 - this.element.clientHeight) {
            this.y = window.innerHeight;
        }
        if (this.x > (window.innerWidth)) {
            this.x = 0 - this.element.clientWidth;
        }
        if (this.x < 0 - this.element.clientWidth) {
            this.x = window.innerWidth;
        }
        this.draw();
    };
    Player.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case 37:
                this.speedX = -this.speed;
                break;
            case 39:
                this.speedX = this.speed;
                break;
            case 38:
                this.speedY = -this.speed;
                break;
            case 40:
                this.speedY = this.speed;
                break;
        }
    };
    Player.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case 37:
                this.speedX = 0;
                break;
            case 39:
                this.speedX = 0;
                break;
            case 38:
                this.speedY = 0;
                break;
            case 40:
                this.speedY = 0;
                break;
        }
    };
    return Player;
}(DomObject));
var Util = (function () {
    function Util() {
    }
    Util.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    return Util;
}());
//# sourceMappingURL=main.js.map