import { CanvasTurtle } from "../turtle/turtle.js";
import { LSystem } from "../l_system/l_system.js";
const lSystem = new LSystem('22220', ['1', '21'], ['0', '1[-20]+20']);
let rule = '';
for (const ruleElement of lSystem.iterator(14)) {
    rule = ruleElement;
}
const canvas = document.getElementById('canvas');
const turtle = new CanvasTurtle(canvas);
turtle.turnRight(180);
turtle.moveForward(canvas.height / 2);
turtle.turnRight(180);
turtle.changeWidth(4);
turtle.changeColor('#15100b');
for (let i = 0; i < rule.length; i++) {
    switch (rule[i]) {
        case '+':
            turtle.turnRight(17, 10);
            break;
        case '-':
            turtle.turnLeft(17, 10);
            break;
        case '0':
            turtle.changeColor('#0d360c');
            turtle.drawForward(12, 3, 0.5);
            break;
        case '1':
            turtle.drawForward(9, 3, 0.5);
            turtle.save();
            turtle.turnRight(20, 50);
            turtle.changeColor('#117324');
            turtle.drawForward(15, 3, 0.5);
            turtle.restore();
            break;
        case '2':
            turtle.drawForward(7, 3, 0.5);
            break;
        case '[':
            turtle.save();
            break;
        case ']':
            turtle.restore();
            break;
    }
}
