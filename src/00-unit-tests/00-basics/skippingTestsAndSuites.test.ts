// https://vitest.dev/api/#test-skip
// https://vitest.dev/api/#test-skipif
// https://vitest.dev/api/#describe-skip
// https://vitest.dev/api/#describe-skipif

import { describe, it } from "vitest";

describe("skipping tests", () => {
    /**
     * Use `it.skip` to skip a test
     */
    it.skip("this test will be skipped", async () => {
        // ARRANGE -- Define testing environments & values
        // ACT -- Run the code that is being tested
        // ASSERT -- Evaluate result and compare to expected value
    });

    it.skip("this test will also be skipped", async () => {
        // ARRANGE -- Define testing environments & values
        // ACT -- Run the code that is being tested
        // ASSERT -- Evaluate result and compare to expected value
    });

    /**
     * You can also conditionally skip a test w/ `it.skipIf(condition)`
     * If the condition passed to skipIf is true, the test will be skipped
     */
    it.skipIf(true)(
        "this test is only skipped if true is passed to 'skipIf'",
        async () => {
            // ARRANGE -- Define testing environments & values
            // ACT -- Run the code that is being tested
            // ASSERT -- Evaluate result and compare to expected value
        },
    );
});

/**
 * You can skip an entire test suite by using `describe.skip`
 */
describe.skip("skipped suite", () => {
    it("tests inside skipped test suite are skipped", async () => {
        // ARRANGE -- Define testing environments & values
        // ACT -- Run the code that is being tested
        // ASSERT -- Evaluate result and compare to expected value
    });

    it("tests inside skipped test suite are skipped", async () => {
        // ARRANGE -- Define testing environments & values
        // ACT -- Run the code that is being tested
        // ASSERT -- Evaluate result and compare to expected value
    });
});

/**
 * You can conditionally skip a test suite w/ `describe.skipIf(condition)`
 * If the condition passed to `skipIf` evaluates to true, the test suite will be skipped
 */
describe.skipIf(true)("conditionally skipped suite", () => {
    it("tests inside skipped test suite are skipped", async () => {
        // ARRANGE -- Define testing environments & values
        // ACT -- Run the code that is being tested
        // ASSERT -- Evaluate result and compare to expected value
    });

    it("tests inside skipped test suite are skipped", async () => {
        // ARRANGE -- Define testing environments & values
        // ACT -- Run the code that is being tested
        // ASSERT -- Evaluate result and compare to expected value
    });
});
