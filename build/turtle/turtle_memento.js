export class CanvasTurtleMemento {
    constructor(x, y, angle, color, lineWidth) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.color = color;
        this.lineWidth = lineWidth;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    getAngle() {
        return this.angle;
    }
    getColor() {
        return this.color;
    }
    getLineWidth() {
        return this.lineWidth;
    }
}
