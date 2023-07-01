// https://vitest.dev/api/#test-only
// https://vitest.dev/api/#describe-only

import { describe, it } from "vitest";

/**
 * NOTE: If you only want to run tests suites in a specific file,
 * pass that file name to `vitest`
 *
 * ex. vitest onlyRunTheseTests.test.ts
 */

/**
 * Use `describe.only` to only run certain suites
 * Use `it.only` to run only tests specified by .only
 *
 * NOTE: This applies PER FILE
 * If you have other tests in other files, they will still run!
 *
 * NOTE: Can only have `only` specified either on the test suite, or tests themeselves, not both
 * If you have describe.only below, remove .only from the individual tests and vice-versa
 */
describe("Only run this test suite", () => {
    /**
     * You can also specify that a specific test is run
     * using `it.only`
     *
     * Only tests marked with `only` are run
     */
    it.only("This test will run", async () => {
        // ARRANGE -- Define testing environments & values
        // ACT -- Run the code that is being tested
        // ASSERT -- Evaluate result and compare to expected value
    });

    it("this test won't run", async () => {
        // this test won't run
    });

    it.only("This test will run as well", async () => {
        // ARRANGE -- Define testing environments & values
        // ACT -- Run the code that is being tested
        // ASSERT -- Evaluate result and compare to expected value
    });
});

describe("this suite will be skipped", () => {
    // this test suite won't run
});
