export class Calculator {
    constructor(public a: number, public b: number) {}

    /**
     * Sum two numbers together
     *
     * @param {number} a - 1st number
     * @param {number} b - 2nd number
     * @returns sum of a & b
     */
    static sumAB(a: number, b: number) {
        return a + b;
    }

    /**
     * Take the difference between two numbers
     *
     * @param {number} a - 1st number
     * @param {number} b - 2nd number
     * @returns difference between a & b
     */
    static subtractAB(a: number, b: number) {
        return a - b;
    }

    /**
     * Compute the product of two numbers
     *
     * @param {number} a - 1st number
     * @param {number} b - 2nd number
     * @returns product of a & b
     */
    public multiply() {
        return this.a * this.b;
    }
}

/**
 * Sum two numbers together
 *
 * @param {number} a - 1st number
 * @param {number} b - 2nd number
 * @returns sum of a & b
 */
export function sumAB(a: number, b: number) {
    return a + b;
}

/**
 * Take the difference between two numbers
 *
 * @param {number} a - 1st number
 * @param {number} b - 2nd number
 * @returns difference between a & b
 */
export function subtractAB(a: number, b: number) {
    return a - b;
}
