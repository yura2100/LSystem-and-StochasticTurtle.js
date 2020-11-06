//Interface for saving and restoring state of the turtle
export interface ITurtleMemento {
    getX(): number

    getY(): number

    getAngle(): number

    getColor(): string

    getLineWidth(): number
}

export class CanvasTurtleMemento implements ITurtleMemento {
    constructor(
        private x: number,
        private y: number,
        private angle: number,
        private color: string,
        private lineWidth: number
    ) { }

    getX(): number {
        return this.x
    }

    getY(): number {
        return this.y
    }

    getAngle(): number {
        return this.angle
    }

    getColor(): string {
        return this.color
    }

    getLineWidth(): number {
        return this.lineWidth
    }
}