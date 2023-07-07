# Testing in JavaScript / TypeScript

This repository is a collection of notes and examples for testing in JavaScript and Typescript.

Unit Testing portion is done using `Vitest` package instead of `Jest` although the examples should be mostly interchangeable.

## Running Tests

```bash
# Run all tests
pnpm test
```

```bash
# Run Vitest in "watch" mode (changes to test files cause Vitest to rerun automatically)
pnpm test-watch
```

## Unit tests

Basic Unit Test Template

```ts
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("", () => {
    it("", async () => {
        // ARRANGE -- Define testing environments & values
        // ACT -- Run the code that is being tested
        // ASSERT -- Evaluate result and compare to expected value
    });
});
```

## Testing Topics

-   Testing Functions
-   Testing Classes

## Scripts:

Use the following command to run the scripts:
`pnpm <script-name>`

-   `clean`: Deletes the `dist` directory and all of its contents
-   `build`: `Rebuilds` the `build` directory and its contents
-   `build-prod`: Same as `build` but output code is minified and bundled, also build d.ts type files
-   `start`: Builds the project and runs transpiled code from the `dist` directory
-   `watch`: Transpiles code and executes it in watch mode. Any changes to code will cause code to re-transpile and re-run.
-   `test`: Runs all `...spec.ts` and `...test.ts` files using `Vitest`
-   `test-related`: Pass in space-separated file paths to files in the `src` directory you wish to run tests for
-   `test-watch`: Runs `Vitest` in "watch" mode (changes to test files cause `Vitest` to rerun them)
-   `check-format`: Check for format errors in TS files in `src` directory
-   `check-lint`: Check for linting errors in TS files in `src` directory
-   `check-types`: Check for type errors in TS files in `src` directory
-   `check-all`: Check all TS files in `src` directory for errors (formatting, linting, or type errors)
-   `fix-format`: Fix all formatting errors in TS files in `src` directory
-   `fix-lint`: Fix all linting errors in TS files in `src` director
-   `fix-all`: Fix all formatting and linting errors & rebuild the project
-   `scratch`: Runs the transpiles and `scratch.ts` file located in the `src/_scratch` directory

## References:

-   [Jest Docs](https://jestjs.io/docs/getting-started)
-   [Vitest Docs](https://vitest.dev/guide/)
-   [Vitest - Examples](https://github.com/vitest-dev/vitest/tree/main/examples)
