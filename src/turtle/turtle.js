"use strict";
exports.__esModule = true;
exports.CanvasTurtle = void 0;
var turtle_memento_js_1 = require("./turtle_memento.js");
var CanvasTurtle = /** @class */ (function () {
    function CanvasTurtle(canvas) {
        this.angle = 3 / 2 * Math.PI;
        this.color = 'black';
        this.lineWidth = 1;
        //"Stack" for saving and restoring the state
        this.history = [];
        this.ctx = canvas.getContext('2d');
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
    }
    CanvasTurtle.prototype.moveForward = function (distance, delta, chance) {
        if (chance === void 0) { chance = 1; }
        distance = this.randomParameter(distance, delta, chance);
        this.x += distance * Math.cos(this.angle);
        this.y += distance * Math.sin(this.angle);
    };
    CanvasTurtle.prototype.drawForward = function (distance, delta, chance) {
        var _a, _b, _c, _d;
        if (chance === void 0) { chance = 1; }
        distance = this.randomParameter(distance, delta, chance);
        (_a = this.ctx) === null || _a === void 0 ? void 0 : _a.beginPath();
        (_b = this.ctx) === null || _b === void 0 ? void 0 : _b.moveTo(this.x, this.y);
        this.x += distance * Math.cos(this.angle);
        this.y += distance * Math.sin(this.angle);
        (_c = this.ctx) === null || _c === void 0 ? void 0 : _c.lineTo(this.x, this.y);
        (_d = this.ctx) === null || _d === void 0 ? void 0 : _d.stroke();
    };
    CanvasTurtle.prototype.turnRight = function (angle, delta, chance) {
        if (chance === void 0) { chance = 1; }
        angle = this.randomParameter(angle, delta, chance);
        this.angle += angle * (Math.PI / 180);
    };
    CanvasTurtle.prototype.turnLeft = function (angle, delta, chance) {
        if (chance === void 0) { chance = 1; }
        angle = this.randomParameter(angle, delta, chance);
        this.angle -= angle * (Math.PI / 180);
    };
    CanvasTurtle.prototype.changeWidth = function (width) {
        this.lineWidth = width;
        if (this.ctx) {
            this.ctx.lineWidth = width;
        }
    };
    CanvasTurtle.prototype.changeColor = function (color) {
        this.color = color;
        if (this.ctx) {
            this.ctx.strokeStyle = color;
        }
    };
    //Private method that processes every parameters of every stochastic method
    CanvasTurtle.prototype.randomParameter = function (parametr, delta, chance) {
        if (chance === void 0) { chance = 1; }
        if (delta) {
            if (chance > Math.random()) {
                parametr += Math.floor(Math.random() * (2 * delta) + 1) - delta;
            }
        }
        return parametr;
    };
    CanvasTurtle.prototype.save = function () {
        this.history.push(new turtle_memento_js_1.CanvasTurtleMemento(this.x, this.y, this.angle, this.color, this.lineWidth));
    };
    CanvasTurtle.prototype.restore = function () {
        var memento = this.history.pop();
        if (memento) {
            this.x = memento.getX();
            this.y = memento.getY();
            this.angle = memento.getAngle();
            this.changeColor(memento.getColor());
            this.changeWidth(memento.getLineWidth());
        }
    };
    return CanvasTurtle;
}());
exports.CanvasTurtle = CanvasTurtle;
