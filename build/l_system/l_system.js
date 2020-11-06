export class LSystem {
    //Constructor can be initialized without parameters and they can be added later via public methods
    constructor(axiom = '', ...productions) {
        this.axiom = axiom;
        this.productions = new Map();
        this.addProductionsToMap(productions);
    }
    setAxiom(value) {
        this.axiom = value;
    }
    addProductions(...productions) {
        this.addProductionsToMap(productions);
    }
    *iterator(n) {
        for (let i = 0; i < n; i++) {
            yield this.axiom;
            this.axiom = this.axiom
                .split('')
                .map((item) => {
                const [substitution, chance] = this.productions.get(item) || [item, 1];
                return chance > Math.random()
                    ? substitution
                    : item;
            })
                .join('');
        }
    }
    //Private method for adding new productions in productions map
    addProductionsToMap(productions) {
        productions === null || productions === void 0 ? void 0 : productions.forEach((item) => {
            this.productions.set(item[0], [item[1], item[2] || 1]);
        });
    }
}
