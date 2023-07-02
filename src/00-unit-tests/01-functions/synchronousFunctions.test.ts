import { describe, expect, it } from "vitest";
import { addThree, addTwo } from "./synchronousFunctions.js";

describe("Testing synchronous functions", () => {
    it("testing synchronous function", () => {
        // ARRANGE -- Define testing environments & values
        const a = 1;
        const b = 2;
        const sum = a + b;

        // ACT -- Run the code that is being tested
        const result = addTwo(a, b);

        // ASSERT -- Evaluate result and compare to expected value
        expect(result).toBe(sum);
    });

    it("testing another synchronous function", () => {
        // ARRANGE -- Define testing environments & values
        const a = 1;
        const b = 2;
        const c = 3;
        const sum = a + b + c;

        // ACT -- Run the code that is being tested
        const result = addThree(a, b, c);

        // ASSERT -- Evaluate result and compare to expected value
        expect(result).toBe(sum);
    });
});
