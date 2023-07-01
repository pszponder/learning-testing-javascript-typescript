// https://vitest.dev/api/#test-each
// https://vitest.dev/api/#describe-each

import { describe, expect, it } from "vitest";

describe("Rerun Tests w/ Different Arguments", () => {
    /**
     * Use `it.each()` when you need to run the same test with different variables
     * You can inject parameters w/ printf formatting in the test name
     * in the order of the test function parameters
     * - %s (string)
     * - %d (number)
     * - %i (integer)
     * - %f (floating point value)
     * - %j (json)
     * - %o (object)
     * - %# (index of the test case)
     * - %% (single percent sign)
     *
     * Pass in an array of arrays or array of objects into `it.each()`
     *
     * Below example returns:
     * ✓ add(1, 1) -> 2
     * ✓ add(1, 2) -> 3
     * ✓ add(2, 1) -> 3
     */
    it.each([
        [1, 1, 2],
        [1, 2, 3],
        [2, 1, 3],
    ])("add(%i, %i) => %i", async (a: number, b: number, expected: number) => {
        // ARRANGE -- Define testing environments & values
        // ACT -- Run the code that is being tested
        // ASSERT -- Evaluate result and compare to expected value
        expect(a + b).toBe(expected);
    });

    // You can also pass in an array of objects and then use object destructuring
    // to pass in each object's properties as function arguments to the callback function
    it.each([
        { a: 1, b: 1, expected: 2 },
        { a: 1, b: 2, expected: 3 },
        { a: 2, b: 1, expected: 3 },
    ])("add(%i, %i) => %i", async ({ a, b, expected }) => {
        // ARRANGE -- Define testing environments & values
        // ACT -- Run the code that is being tested
        // ASSERT -- Evaluate result and compare to expected value
        expect(a + b).toBe(expected);
    });
});
