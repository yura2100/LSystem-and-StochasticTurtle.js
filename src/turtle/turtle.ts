import {ITurtleMemento, CanvasTurtleMemento} from "./turtle_memento.js";

//The basic idea of this "stochastic" turtle is that it may have some random behaviour
//All methods that are supposed to be stochastic gets three parameters:
//First parameter is required, it stands for guaranteed behaviour
//The second one is optional, it represents borders in which the first parameter may be changed i.e. from -delta to +delta
//The third one represents the chance from 0 to 1 that the first parameter will be changed, by default it is 1 if delta is defined

//By default turtle appears in the middle of the field wathcing to the top
export interface ITurtle {
    //Move forward the turtle without drawing
    moveForward(direction: number, delta?: number, chance?: number): void

    //Draw forward a line
    drawForward(direction: number, delta?: number, chance?: number): void

    //Rotate turtle right in degrees
    turnRight(angle: number, delta?: number, chance?: number): void

    //Rotate turtle left in degrees
    turnLeft(angle: number, delta?: number, chance?: number): void

    //Change width of lines that will be drawn
    changeWidth(width: number): void

    //Change color of lines that will be drawn
    changeColor(color: string): void

    //Save the current state of the turle: coordinates, angle, color and line width
    save(): void

    //Restore the current state of the turle: coordinates, angle, color and line width
    restore(): void
}

export class CanvasTurtle implements ITurtle {
    private readonly ctx: CanvasRenderingContext2D | null
    private x: number
    private y: number
    private angle: number = 3 / 2 * Math.PI
    private color: string = 'black'
    private lineWidth: number = 1

    //"Stack" for saving and restoring the state
    private history: ITurtleMemento[] = []

    constructor(canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext('2d')

        this.x = canvas.width / 2
        this.y = canvas.height / 2
    }

    moveForward(distance: number, delta?: number, chance: number = 1) {
        distance = this.randomParameter(distance, delta, chance)

        this.x += distance * Math.cos(this.angle)
        this.y += distance * Math.sin(this.angle)
    }

    drawForward(distance: number, delta?: number, chance: number = 1) {
        distance = this.randomParameter(distance, delta, chance)

        this.ctx?.beginPath()
        this.ctx?.moveTo(this.x, this.y)
        this.x += distance * Math.cos(this.angle)
        this.y += distance * Math.sin(this.angle)
        this.ctx?.lineTo(this.x, this.y)
        this.ctx?.stroke()
    }

    turnRight(angle: number, delta?: number, chance: number = 1) {
        angle = this.randomParameter(angle, delta, chance)

        this.angle += angle * (Math.PI / 180)
    }

    turnLeft(angle: number, delta?: number, chance: number = 1) {
        angle = this.randomParameter(angle, delta, chance)

        this.angle -= angle * (Math.PI / 180)
    }

    changeWidth(width: number) {
        this.lineWidth = width
        if (this.ctx) {
            this.ctx.lineWidth = width
        }
    }

    changeColor(color: string) {
        this.color = color
        if (this.ctx) {
            this.ctx.strokeStyle = color
        }
    }

    //Private method that processes every parameters of every stochastic method
    private randomParameter(parametr: number, delta?: number, chance: number = 1): number {
        if (delta) {
            if (chance > Math.random()) {
                parametr += Math.floor(Math.random() * (2 * delta) + 1) - delta
            }
        }

        return parametr
    }

    save(): void {
        this.history.push(new CanvasTurtleMemento(this.x, this.y, this.angle, this.color, this.lineWidth))
    }

    restore(): void {
        const memento: ITurtleMemento | undefined = this.history.pop()

        if (memento) {
            this.x = memento.getX()
            this.y = memento.getY()
            this.angle = memento.getAngle()
            this.changeColor(memento.getColor())
            this.changeWidth(memento.getLineWidth())
        }
    }
}