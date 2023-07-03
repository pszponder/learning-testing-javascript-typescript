// https://vitest.dev/guide/mocking.html#functions
// https://vitest.dev/api/vi.html#vi-spyon

import { afterEach, describe, expect, it, vi } from "vitest";
import { SpyOnThis, sum } from "./spyOnMethods.js";

/**
 * Spying on method enables us to know:
 * - If a method was called
 * - How many times a method was called
 * - What arguments were passed into the method
 *
 * Use `vi.spyOn(<object>, <method>)` to spy on a method or getter/setter of an object
 *
 * NOTE: You need to provide spyOn() with the object the method belongs to
 */
describe("Spying on Functions", () => {
    afterEach(() => {
        // Restore all spy and mock implementations to their original behavior / implementation
        vi.restoreAllMocks();
    });

    it("Spy on built-in method", async () => {
        // ARRANGE -- Define testing environments & values
        const consoleSpy = vi.spyOn(console, "log");

        // ACT -- Run the code that is being tested
        console.log();
        console.log();

        // ASSERT -- Evaluate result and compare to expected value
        expect(consoleSpy).toHaveBeenCalledTimes(2);
    });

    /**
     * NOTE: Since a function has to be spied on within the context of an object,
     * you have to encapsulate the function you wish to test in an object
     * 1. Import the entire module as an object (import * as <module-alias> from <module-path>),
     *  OR
     * 2. Wrap the function under test in an object
     */
    it("Spy on imported functions", async () => {
        // ARRANGE -- Define testing environments & values
        // NOTE: Instead of wrapping the function in an object here,
        //  can also import the entire module like this: import * as <module-alias> from <module-path>
        const wrapperObj = {
            sumFunc: sum,
        };

        const sumSpy = vi.spyOn(wrapperObj, "sumFunc");

        const a = 1;
        const b = 2;
        const sumAB = a + b;

        // ACT -- Run the code that is being tested
        const result = wrapperObj.sumFunc(a, b);

        // ASSERT -- Evaluate result and compare to expected value
        expect(sumSpy).toHaveBeenCalledTimes(1);
        expect(sumSpy).toHaveBeenCalledWith(a, b);
        expect(result).toBe(sumAB);
    });

    it("Spy on methods", async () => {
        // ARRANGE -- Define testing environments & values
        const a = 1;
        const b = 2;
        const sumAB = a + b;

        const numArr = [1, 2, 3];
        const numArrSum = numArr.reduce(
            (prevValue, currValue) => prevValue + currValue,
            0,
        );

        const instance = new SpyOnThis(a, b);

        const sumSpy = vi.spyOn(instance, "returnSum");

        // ACT -- Run the code that is being tested
        const result = instance.returnSum(numArr);

        // ASSERT -- Evaluate result and compare to expected value
        expect(result).toBe(sumAB + numArrSum);
        expect(sumSpy).toHaveBeenCalledTimes(1);
        expect(sumSpy).toBeCalledWith(numArr);
    });

    /**
     * Always put the spy on the method you wish to spy on,
     * regardless if it is nested or not
     */
    it("Spy on nested method", async () => {
        // ARRANGE -- Define testing environments & values
        const a = 1;
        const b = 2;
        const sumAB = a + b;
        const sum2APlusB = 2 * sumAB;

        const instance = new SpyOnThis(a, b);

        // NOTE: Since we want to spy on nested method (returnSum) and not the wrapper method,
        // Place the spy on the inner method
        const sumSpy = vi.spyOn(instance, "returnSum");

        // NOTE: We can also spy on the wrapper method if we want
        const sumWrapperSpy = vi.spyOn(instance, "returnSumWrapper");

        // ACT -- Run the code that is being tested
        const result = instance.returnSumWrapper();

        // ASSERT -- Evaluate result and compare to expected value
        expect(result).toBe(sum2APlusB);
        expect(sumSpy).toHaveBeenCalledTimes(1);
        expect(sumSpy).toBeCalledWith([a, b]);

        expect(sumWrapperSpy).toHaveBeenCalledTimes(1);
    });
});
