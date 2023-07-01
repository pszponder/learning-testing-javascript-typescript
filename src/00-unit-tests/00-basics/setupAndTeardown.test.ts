// Reference documentation (and generate examples) from: https://vitest.dev/api/#setup-and-teardown

import {
    afterAll,
    afterEach,
    beforeAll,
    beforeEach,
    describe,
    it,
} from "vitest";

/**
 * Setup and Teardown functions allow you to hook into the life cycle of tests
 * in order to avoid repeating setup and teardown of code
 *
 * The Setup and teardown functions apply to the current context:
 * - If setup/teardown functions are used at top-level, then the functions apply to the file
 * - If setup/teardown functions are used inside describe,
 *   then the functions only apply to the test suite inside that describe
 */
describe("Working with setup / teardown functions for setup and teardown", () => {
    // Functions used in example below for demonstration
    const prepareSomething = async () => {
        // Setup mocks + spies
    };

    const resetSomething = async () => {
        // Reset mocks + spied
    };

    /**
     * The callback passed into `beforeEach` is invoked before each test is executed
     */
    beforeEach(async () => {
        // Logic inside here is run before each test is executed
        // Typically, you will setup mocks or spies here
        await prepareSomething();

        // Other code to run before each test...

        // OPTIONAL: If you return a callback function,
        // it will be invoked after the test completes
        // this is an equivalent to using `afterEach`
        return async () => {
            await resetSomething();

            // Other code to run after each test...
        };
    });

    /**
     * The callback passed into `afterEach` is invoked after each test completes
     */
    afterEach(async () => {
        // Logic inside here is run after each test completes
        // Typically, you will reset mocks / spies here
    });

    /**
     * beforeAll invokes its callback once before running all tests in the current context
     */
    beforeAll(async () => {
        // Logic inside here is run only once before all tests run in the current context
        // Example, initialize all mocks
    });

    /**
     * afterAll invokes its callback once after all tests in the current context complete
     */
    afterAll(async () => {
        // Logic inside here is run only once after all tests in the current context complete
        // Example, stop all mocks setup in beforeAll
    });

    it.todo("unimplemented test");
});
