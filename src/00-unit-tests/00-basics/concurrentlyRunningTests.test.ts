// https://vitest.dev/guide/features.html#running-tests-concurrently
import { describe, it } from "vitest";

describe("Running tests concurrently", () => {
    /**
     * Use `.concurrent` property in consecutive tests to run them in parallel
     *
     * NOTE: Only tests marked with `concurrent` will run in parallel
     *
     * CAUTION: tests that perform conflicting global state manipulations may interfere with each other
     */
    it.concurrent(
        "This test will run concurrently (in parallel) with the next test",
        async () => {},
    );

    it.concurrent(
        "This test will also run concurrently (in parallel)",
        async () => {},
    );

    it("this test won't run concurrently with the other tests in this suite", async () => {});
});
