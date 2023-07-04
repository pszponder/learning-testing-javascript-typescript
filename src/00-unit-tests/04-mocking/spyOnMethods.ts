/**
 * Sum two numbers together
 *
 * @param {number} a - number to add
 * @param {number} b - number to add
 * @returns sum of a and b
 */
export function sum(a: number, b: number) {
    return a + b;
}

/**
 * Class used to demonstrate method spying in vitest
 *
 * @class
 */
export class SpyOnThis {
    private a: number;

    private b: number;

    /**
     * Creates an instance of SpyOnThis
     *
     * @constructor
     * @param {number} a - number
     * @param {number} b - number
     */
    constructor(a: number, b: number) {
        this.a = a;
        this.b = b;
    }

    /**
     * Sum input array of numbers and a and b properties
     *
     * @param {number[]} numArr - Array of numbers to add
     * @returns sum of a and b and array of numbers
     */
    public returnSum(numArr: number[]) {
        const arraySum = numArr.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0,
        );

        return this.a + this.b + arraySum;
    }

    /**
     * Wrapper function around returnSum
     * Passes in an array [this.a, this.b] into returnSum() function and returns value
     * @returns {number} sum of 2(a+b)
     */
    public returnSumWrapper() {
        const numArr = [this.a, this.b];
        this.returnSum(numArr); // Call an extra time to test number of times function called
        return this.returnSum(numArr);
    }
}
