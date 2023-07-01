// https://vitest.dev/api/#test-todo
// https://vitest.dev/api/#describe-todo

import { describe, it } from "vitest";

describe("Test suite with stubbed tests", () => {
    /**
     * Use `it.todo` to stub a test which is to be implemented later.
     * An entry will be shown in the report for the tests
     * so you know how many tests you still need to implement
     */
    it.todo("unimplemented test");
    it.todo("another unimplemented test");
});

/**
 * Use `describe.todo` to stub test suites to be implemented later.
 * An entry will be shown in the report for the tests
 * so you know how many tests you still need to implement.
 */
describe.todo("Stubbed test suite");
