import { describe, expect, it } from "vitest";

/**
 * When catching thrown exceptions, have to use `toThrow` assertion
 *
 * You can optionally pass in the expected error message into the `toThrow` assertion
 *
 * NOTE: The function that throws an exception needs to be invoked within a wrapping function
 *  This is typically done via an arrow function: expect(() => funcThatThrowsError()).toThrow();
 */
describe("Error Handling in Tests", () => {
    function throwError(msg = "error") {
        throw new Error(msg);
    }

    function throwErrorWrapper(shouldThrow = true, errMsg = "error") {
        if (shouldThrow) {
            throwError(errMsg);
        }
    }

    it("Assert that an error is thrown by function under test", async () => {
        // ARRANGE -- Define testing environments & values
        const errMsg = "oh no, something went wrong!";

        /**
         * ACT + ASSERT
         * Have to invoke the function which we expect to throw the error within the assertion
         */
        expect(() => throwError()).toThrow();
        expect(() => throwError(errMsg)).toThrow(errMsg);
    });

    it("Assert that an error is thrown by more complex function under test", async () => {
        // ARRANGE -- Define testing environments & values
        const errMsg = "oh no, something went wrong!";

        /**
         * ACT + ASSERT
         * Have to invoke the function which we expect to throw the error within the assertion
         *
         * Notice how if we want to pass in arguments to the function,
         * we have to call it via an anonymous arrow function
         *
         * Otherwise, if we aren't passing in any arguments to the function under test,
         * we pass the function name, but don't invoke it (don't add parenthesis to end of func)
         */
        expect(throwErrorWrapper).toThrow();
        expect(() => throwErrorWrapper(true, errMsg)).toThrow();
        expect(() => throwErrorWrapper(true, errMsg)).toThrow(errMsg);
        expect(() => throwErrorWrapper(false)).not.toThrow(errMsg);
    });
});
