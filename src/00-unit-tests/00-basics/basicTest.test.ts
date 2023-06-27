import { describe, expect, it } from "vitest";

/**
 * Add two numbers together
 *
 * @param a {number} - 1st value
 * @param b {number} - 2nd value
 * @returns sum of values
 */
function add(a: number, b: number) {
    return a + b;
}

/**
 * Create a set of tests for the "add" function
 */
describe("add function", () => {
    it("should return the sum of two numbers", () => {
        // ARRANGE -- Define testing environments & values
        const a = 1;
        const b = 2;
        const expectedValue = a + b;

        // ACT -- Run the code that is being tested
        const result = add(a, b);

        // ASSERT -- Evaluate result and compare to expected value
        expect(result).toBe(expectedValue);
    });
});

/**
 * Subtract two numbers from each other
 *
 * @param a {number} - 1st value
 * @param b {number} - 2nd value
 * @returns difference between 1st and 2nd value
 */
function subtract(a: number, b: number) {
    return a - b;
}

/**
 * Create a set of tests for the "subtract" function
 */
describe("subtract function", () => {
    it("should return the difference between two numbers", () => {
        // ARRANGE -- Define testing environments & values
        const a = 1;
        const b = 2;
        const expectedValue = a - b;

        // ACT -- Run the code that is being tested
        const result = subtract(a, b);

        // ASSERT -- Evaluate result and compare to expected value
        expect(result).toBe(expectedValue);
    });
});
