// https://jestjs.io/docs/asynchronous

import { describe, expect, it } from "vitest";
import { invokeCallback, promiseFunc } from "./asyncFunctions.js";

/**
 * CAUTION: As of Vitest v0.10.0 the callback style of declaring tests is deprecated
 * Rewrite your tests to use async/await functions or use Promises to mimic the callback style
 *
 * NOTE: This method of working w/ callbacks still works with Jest
 */
describe.skip("Working with callbacks", () => {
    /**
     * CAUTION: Be default, both `Jest` and `Vitest` complete once they reach the end of their execution.
     * They won't wait for callback functions to resolve when testing asynchronous functions.
     *
     * To address this:
     * 1. Pass the `done` parameter into the callback function provided to the `it` (or `test`) function
     * 2. Invoke the `done()` method within the callback function you are testing
     *    after the assertion
     * 3. If you have a `.toBe()` assertion, wrap assertion in try/catch block in case your callback fails
     */
    it("Testing callback passed into function", done => {
        // ARRANGE -- Define testing environments & values
        const dataObj = {
            a: 1,
            b: 2,
        };

        const expectedSum = dataObj.a + dataObj.b;

        /**
         * Setup a callback function which you want to test
         *
         * NOTE 1: You have to add assertions into the callback you are testing
         * NOTE 2: You should wrap assertions in try/catch block
         *
         * @param {{}} data - Data to pass into the callback
         */
        function callbackFunc(data: any) {
            const sum = data.a + data.b;
            try {
                expect(data.a).toBe(dataObj.a);
                expect(data.b).toBe(dataObj.b);
                expect(sum).toBe(expectedSum);
                // @ts-ignore
                done();
            } catch (error) {
                // @ts-ignore
                done(error);
            }
        }

        // ACT + ASSERT -- Invoke the function which will asynchronously execute your callback under test
        // The assertions in the callback will be triggered when the callback is invoked
        invokeCallback(callbackFunc, dataObj);
    });
});

describe("Working with Promises", () => {
    /**
     * If you return a promise from your test, both Jest and Vitest will wait for that promise to resolve.
     * If the promise is rejected, the test will fail.
     */
    it("Testing a function which returns a promise and resolves", () => {
        // ARRANGE -- Define testing environments & values
        const resolveValue = "resolved value";
        const rejectMsg = "Error occurred, async operation failed";

        /**
         * ACT + ASSERT
         * When testing promises like this, you have to do 2 things:
         * 1. Return the promise
         * 2. Pass your assertion in a .then
         */
        return promiseFunc(resolveValue, rejectMsg, 0).then(data => {
            expect(data).toBe(resolveValue);
        });
    });

    /**
     * When working with promises, you can use the `.resolves` and `.rejects` assertions
     *
     * `resolves` is intended to remove boilerplate when asserting asynchronous code
     * - Use it to unwrap a value from the pending promise and assert its value with usual assertions
     * - If the promise rejects, the assertion will fail
     * - It returns the same Assertions object, but all matchers now return Promise, so you need to await it
     *
     * `rejects` is intended to remove boilerplate when asserting asynchronous code
     * - Use it to unwrap the reason why the promise was rejected, and assert its value with usual assertions
     * - If the promise successfully resolve, the assertion will fail
     * - It returns the same Assertions object, but all matchers now return Promise, so you need to await it
     */
    it("Testing functions which returns a promise and using .resolves / .rejects in the assertion", () => {
        // ARRANGE -- Define testing environments & values
        const resolveValue = "resolved value";
        const rejectMsg = "Error occurred, async operation failed";

        /**
         * ACT + ASSERT
         *
         * We invoke the function which returns the promise directly in the expect statement
         * NOTE: Since using `.resolves` and `.rejects`, don't need to return
         */
        expect(promiseFunc(resolveValue, rejectMsg, 0)).resolves.toBe(
            resolveValue,
        );

        expect(promiseFunc("", rejectMsg, 0)).rejects.toThrow(rejectMsg);
    });
});

/**
 * The easiest way to deal with async functions is to use the async / await syntax.
 *
 * To write an async test, add "async" in front of the callback function passed to the `it` / `test` method.
 * Now you can call async functions / methods inside your test using the "await" keyword
 */
describe("Working with async/await", () => {
    it("Testing async functions with async/await", async () => {
        // ARRANGE -- Define testing environments & values
        const resolveValue = "resolved value";
        const rejectMsg = "Error occurred, async operation failed";

        // ACT -- Run the code that is being tested
        const result = await promiseFunc(resolveValue, rejectMsg, 0);

        // ASSERT -- Evaluate result and compare to expected value
        expect(result).toBe(resolveValue);
    });

    /**
     * When testing async functions with async/await, you can also use the `.resolves` and `.rejects` assertions
     *
     * `resolves` is intended to remove boilerplate when asserting asynchronous code
     * - Use it to unwrap a value from the pending promise and assert its value with usual assertions
     * - If the promise rejects, the assertion will fail
     * - It returns the same Assertions object, but all matchers now return Promise, so you need to await it
     *
     * `rejects` is intended to remove boilerplate when asserting asynchronous code
     * - Use it to unwrap the reason why the promise was rejected, and assert its value with usual assertions
     * - If the promise successfully resolve, the assertion will fail
     * - It returns the same Assertions object, but all matchers now return Promise, so you need to await it
     */
    it("Testing async functions with async/await and using .resolves / rejects assertions", async () => {
        // ARRANGE -- Define testing environments & values
        const resolveValue = "resolved value";
        const rejectMsg = "Error occurred, async operation failed";

        // ACT + ASSERT
        await expect(promiseFunc(resolveValue, rejectMsg, 0)).resolves.toBe(
            resolveValue,
        );
        await expect(promiseFunc("", rejectMsg, 0)).rejects.toThrow(rejectMsg);
    });
});
