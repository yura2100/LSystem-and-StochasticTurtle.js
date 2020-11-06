"use strict";
exports.__esModule = true;
exports.CanvasTurtleMemento = void 0;
var CanvasTurtleMemento = /** @class */ (function () {
    function CanvasTurtleMemento(x, y, angle, color, lineWidth) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.color = color;
        this.lineWidth = lineWidth;
    }
    CanvasTurtleMemento.prototype.getX = function () {
        return this.x;
    };
    CanvasTurtleMemento.prototype.getY = function () {
        return this.y;
    };
    CanvasTurtleMemento.prototype.getAngle = function () {
        return this.angle;
    };
    CanvasTurtleMemento.prototype.getColor = function () {
        return this.color;
    };
    CanvasTurtleMemento.prototype.getLineWidth = function () {
        return this.lineWidth;
    };
    return CanvasTurtleMemento;
}());
exports.CanvasTurtleMemento = CanvasTurtleMemento;
