export interface ILSystem {
    //Method for setting a new axiom to an existing instance
    setAxiom(value: string): void

    //Method for adding new productions(substitution rules) to an existing instance
    //As a parameters gets tuples containig two required parametrs: string which will be converted, string in which the first one will be converted
    //And one optional paraneter: chance of convertation from 0 to 1. Default value is 1
    addProductions(...productions: Array<[string, string, number?]>): void

    //Method for getting new iterations of the axiom
    iterator(n: number): Generator<string>
}

export class LSystem implements ILSystem {
    private axiom: string
    //Map for keeping productions, where the key is string which will be converted
    //And the value is tuple containig: string in which the first one will be converted and the chance of convertation
    private productions: Map<string, [string, number]>

    //Constructor can be initialized without parameters and they can be added later via public methods
    constructor(axiom: string = '', ...productions: Array<[string, string, number?]>) {
        this.axiom = axiom
        this.productions = new Map<string, [string, number]>()

        this.addProductionsToMap(productions)
    }

    setAxiom(value: string): void {
        this.axiom = value
    }

    addProductions(...productions: Array<[string, string, number?]>): void {
        this.addProductionsToMap(productions)
    }

    * iterator(n: number): Generator<string> {
        for (let i = 0; i < n; i++) {
            yield this.axiom

            this.axiom = this.axiom
                .split('')
                .map((item) => {
                    const [substitution, chance] = this.productions.get(item) || [item, 1]

                    return chance > Math.random()
                        ? substitution
                        : item
                })
                .join('')

        }
    }

    //Private method for adding new productions in productions map
    private addProductionsToMap(productions?: Array<[string, string, number?]>) {
        productions?.forEach((item: [string, string, number?]) => {
            this.productions.set(item[0], [item[1], item[2] || 1])
        })
    }
}