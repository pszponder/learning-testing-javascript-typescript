// https://vitest.dev/api/#test-funif

import { describe, it } from "vitest";

describe("Conditionally running tests", () => {
    const isDev = true;

    /**
     * By invoking `runIf(<condition>)` method,
     * we can control whether or not the test will run
     */
    it.runIf(isDev)(
        "This test will run conditionally if isDev is true",
        async () => {
            // ARRANGE -- Define testing environments & values
            // ACT -- Run the code that is being tested
            // ASSERT -- Evaluate result and compare to expected value
        },
    );

    it.runIf(false)(
        "This test will not run since condition passed to runIf is false",
        async () => {
            // ARRANGE -- Define testing environments & values
            // ACT -- Run the code that is being tested
            // ASSERT -- Evaluate result and compare to expected value
        },
    );
});
