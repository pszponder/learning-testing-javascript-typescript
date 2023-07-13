// https://stackoverflow.com/questions/58151010/difference-between-resetallmocks-resetmodules-resetmoduleregistry-restoreallm
// https://bobbyhadz.com/blog/jest-reset-mocks-and-restore-spies

// Disable a few eslint rules in the file
/* eslint max-classes-per-file: off */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import * as calc from "./calculator.js";

/**
 * Quick Tips:
 * 1. If you want to test spy function and how many times it was invoked, CLEAR
 * 2. If you modified mock implementation but want to set it back to original MOCKED implementation, RESET
 * 3. If you want to use original method instead of mock implementation, RESTORE
 *
 * CAUTION:
 * - CLEAR, RESET, and RESTORE methods for mocks only work on mocks
 * - Using `vi.mock()` to mock an object with primitive properties doesn't actually create a true mock
 *   so in this case, the CLEAR, RESET, and RESTORE methods won't work
 */

/**
 * CLEAR Mock / Spy
 *
 * Use <mock/spy>.mockClear() OR vi.clearAllMocks()
 * - Clear internal state of mock / spy
 * - <mock/spy>.mockClear() clears following information
 *    - mockFn.mock.calls (how many times a mock was invoked / called)
 *    - mockFn.mock.instances
 *    - mockFn.mock.contexts
 *    - mockFn.mock.results
 * - vi.clearAllMocks() clears following information
 *    - mock.calls
 *    - mock.instances
 *    - mock.contexts
 *    - mock.results
 * - Calling vi.clearAllMocks() is equivalent to calling mockClear() on each mocked function
 * - Reset all mock / spy usage data, NOT the implementation of the mock / spy
 *    - Keep mocked implementation (even after clearing)
 */
describe("Clearing Mocks", () => {
    const mockFn = vi.fn();

    /**
     * NOTE:
     * - Either clear mocks inside tests,
     * - OR outside of tests using afterEach or beforeEach
     *
     * - Use mockFn.mockClear() to clear a specific mock
     * - Use vi.clearAllMocks() to clear ALL mocks
     */
    // afterEach(() => {
    //     mockFn.mockClear(); // Clear a specific mock
    //     vi.clearAllMocks(); // Clear all mocks instead of specific ones
    // });

    it("tests that mock function was called (before clearing)", async () => {
        // ARRANGE -- Define testing environments & values
        const testArg = "this is an argument";

        // ACT -- Run the code that is being tested
        mockFn(testArg);

        // ASSERT -- Evaluate result and compare to expected value
        expect(mockFn).toHaveBeenCalledTimes(1);
        expect(mockFn).toHaveBeenCalledWith(testArg);
    });

    it("tests that mock function was NOT called (after clearing)", async () => {
        // ARRANGE -- Define testing environments & values
        // ACT -- Run the code that is being tested

        mockFn.mockClear();

        // ASSERT -- Evaluate result and compare to expected value
        expect(mockFn).not.toHaveBeenCalled();
    });

    it("tests that can monitor and clear usage data of spy of imported function ", async () => {
        // ARRANGE -- Define testing environments & values
        const a = 1;
        const b = 2;
        const sum = a + b;
        const difference = a - b;

        const sumSpy = vi.spyOn(calc, "sumAB");
        const subtractSpy = vi.spyOn(calc, "subtractAB");

        // ACT -- Run the code that is being tested
        const resultSum = calc.sumAB(a, b);
        const resultDifference = calc.subtractAB(a, b);

        // ASSERT -- Evaluate result and compare to expected value
        expect(sumSpy).toHaveBeenCalledTimes(1);
        expect(sumSpy).toHaveBeenCalledWith(a, b);
        expect(sumSpy).toHaveReturnedWith(sum);
        expect(resultSum).toBe(sum);

        expect(subtractSpy).toHaveBeenCalledTimes(1);
        expect(subtractSpy).toHaveBeenCalledWith(a, b);
        expect(subtractSpy).toHaveReturnedWith(difference);
        expect(resultDifference).toBe(difference);

        // Clear the usage data of the spies
        sumSpy.mockClear();
        subtractSpy.mockClear();
        // vi.clearAllMocks(); // Alternative to above

        // Verify that the usage data has been reset / cleared
        expect(sumSpy).not.toHaveBeenCalled();
        expect(subtractSpy).not.toHaveBeenCalled();
    });

    it("tests that can monitor and clear usage data of spy of imported class methods", async () => {
        // ARRANGE -- Define testing environments & values
        const a = 1;
        const b = 2;
        const sum = a + b;
        const difference = a - b;
        const product = a * b;

        const calculator = new calc.Calculator(a, b);

        // Create a spy on the static class methods
        const classSumSpy = vi.spyOn(calc.Calculator, "sumAB");
        const classSubtractSpy = vi.spyOn(calc.Calculator, "subtractAB");

        // Create a spy on the public class method
        const classMultiplySpy = vi.spyOn(calculator, "multiply");

        // ACT -- Run the code that is being tested
        const resultSum = calc.Calculator.sumAB(a, b);
        const resultSubtract = calc.Calculator.subtractAB(a, b);
        const resultProduct = calculator.multiply();

        // ASSERT -- Evaluate result and compare to expected value
        expect(classSumSpy).toHaveBeenCalledTimes(1);
        expect(classSumSpy).toHaveBeenCalledWith(a, b);
        expect(classSumSpy).toHaveReturnedWith(sum);
        expect(resultSum).toBe(sum);

        expect(classSubtractSpy).toHaveBeenCalledTimes(1);
        expect(classSubtractSpy).toHaveBeenCalledWith(a, b);
        expect(classSubtractSpy).toHaveReturnedWith(difference);
        expect(resultSubtract).toBe(difference);

        expect(classMultiplySpy).toHaveBeenCalledTimes(1);
        expect(classMultiplySpy).toHaveBeenCalledWith();
        expect(classMultiplySpy).toHaveReturnedWith(product);
        expect(resultProduct).toBe(product);

        // Clear the usage data of the spies
        classSumSpy.mockClear();
        classSubtractSpy.mockClear();
        classMultiplySpy.mockClear();
        // vi.clearAllMocks(); // Alternative to above

        // Verify that the usage data has been reset / cleared
        expect(classSumSpy).not.toHaveBeenCalled();
        expect(classSubtractSpy).not.toHaveBeenCalled();
        expect(classMultiplySpy).not.toHaveBeenCalled();
    });
});

/**
 * RESET Mock / Spy
 *
 * Use <mock/spy>.mockReset() OR vi.resetAllMocks()
 * - Does everything <mock/spy>.mockClear() / vi.clearAllMocks() does
 *    - ALSO removes any mocked return values / implementations
 *    - So any mocked implementations return `undefined`
 *    - Basically, replace mock function with a new `vi.fn()`
 */
describe("Resetting mocks", () => {
    const mockFn = vi.fn();

    const testObj = {
        id: 1,
        site: "test.site.com",
        topic: "vitest",
    };

    // Instead of returning `undefined`, return testObj when invoking the mock function
    mockFn.mockImplementation(() => testObj);

    /**
     * NOTE:
     * - Either reset mocks inside tests,
     * - OR outside of tests using afterEach or beforeEach
     *
     * - Use mockFn.mockReset() to clear a specific mock
     * - Use vi.resetAllMocks() to clear ALL mocks
     */
    // afterEach(() => {
    //     mockFn.mockReset(); // Reset a specific mock
    //     vi.resetAllMocks(); // Reset all mocks instead of specific ones
    // });

    it("tests that mock function was called (before resetting)", async () => {
        // ARRANGE -- Define testing environments & values
        const testArg = "this is an argument";

        // ACT -- Run the code that is being tested
        mockFn(testArg);

        // ASSERT -- Evaluate result and compare to expected value
        expect(mockFn).toHaveBeenCalledTimes(1);
        expect(mockFn).toHaveBeenCalledWith(testArg);
        expect(mockFn).toHaveReturnedWith(testObj);
    });

    it("tests that mock function's return value is reset to undefined (after resetting)", async () => {
        // ARRANGE -- Define testing environments & values
        // ACT -- Run the code that is being tested
        mockFn.mockReset();

        // ASSERT -- Evaluate result and compare to expected value
        expect(mockFn).not.toHaveBeenCalled();
        expect(mockFn()).toBeUndefined(); // Executing the mock function returns undefined now
    });

    it("tests that imported function that is mocked and implementation changed can be reset", async () => {
        const a = 1;
        const b = 2;
        const sum = a + b;
        const difference = a - b;

        const sumSpy = vi.spyOn(calc, "sumAB");
        const subtractSpy = vi.spyOn(calc, "subtractAB");

        // ACT -- Run the code that is being tested
        const resultSum = calc.sumAB(a, b);
        const resultDifference = calc.subtractAB(a, b);

        // ASSERT -- Evaluate result and compare to expected value

        // Make assertions before mocking the implementation
        expect(sumSpy).toHaveBeenCalledTimes(1);
        expect(sumSpy).toHaveBeenCalledWith(a, b);
        expect(sumSpy).toHaveReturnedWith(sum);
        expect(resultSum).toBe(sum);

        expect(subtractSpy).toHaveBeenCalledTimes(1);
        expect(subtractSpy).toHaveBeenCalledWith(a, b);
        expect(subtractSpy).toHaveReturnedWith(difference);
        expect(resultDifference).toBe(difference);

        // Mock implementations
        const mockedImplementation = 9999;
        sumSpy.mockImplementation(() => mockedImplementation);
        subtractSpy.mockImplementation(() => mockedImplementation);

        // Call spied on methods again (they should return mocked implementation)
        const resultSum2 = calc.sumAB(a, b);
        const resultDifference2 = calc.subtractAB(a, b);

        // Assert implementation now returns the mocked implementation
        expect(sumSpy).toHaveBeenCalledTimes(2);
        expect(sumSpy).toHaveBeenCalledWith(a, b);
        expect(sumSpy).toHaveReturnedWith(mockedImplementation);
        expect(resultSum2).toBe(mockedImplementation);

        expect(subtractSpy).toHaveBeenCalledTimes(2);
        expect(subtractSpy).toHaveBeenCalledWith(a, b);
        expect(subtractSpy).toHaveReturnedWith(mockedImplementation);
        expect(resultDifference2).toBe(mockedImplementation);

        // Reset the usage data of the spies
        sumSpy.mockReset();
        subtractSpy.mockReset();
        // vi.resetAllMocks(); // Alternative to above

        // Call spied on methods again (they should return undefined now)
        const resultSum3 = calc.sumAB(a, b);
        const resultDifference3 = calc.subtractAB(a, b);

        // Verify that the usage data has been reset / cleared
        // Also verify that implementation now returns "undefined"
        expect(sumSpy).toHaveBeenCalledTimes(1);
        expect(sumSpy).toHaveBeenCalledWith(a, b);
        expect(sumSpy).toHaveReturnedWith(undefined);
        expect(resultSum3).toBe(undefined);

        expect(subtractSpy).toHaveBeenCalledTimes(1);
        expect(subtractSpy).toHaveBeenCalledWith(a, b);
        expect(subtractSpy).toHaveReturnedWith(undefined);
        expect(resultDifference3).toBe(undefined);
    });

    it("tests that imported class methods that are mocked and implementation changed can be reset", async () => {
        // ARRANGE -- Define testing environments & values
        const a = 1;
        const b = 2;
        const sum = a + b;
        const difference = a - b;
        const product = a * b;

        const calculator = new calc.Calculator(a, b);

        // Create a spy on the static class methods
        const classSumSpy = vi.spyOn(calc.Calculator, "sumAB");
        const classSubtractSpy = vi.spyOn(calc.Calculator, "subtractAB");

        // Create a spy on the public class method
        const classMultiplySpy = vi.spyOn(calculator, "multiply");

        // ACT -- Run the code that is being tested
        const resultSum = calc.Calculator.sumAB(a, b);
        const resultSubtract = calc.Calculator.subtractAB(a, b);
        const resultProduct = calculator.multiply();

        // ASSERT -- Evaluate result and compare to expected value
        expect(classSumSpy).toHaveBeenCalledTimes(1);
        expect(classSumSpy).toHaveBeenCalledWith(a, b);
        expect(classSumSpy).toHaveReturnedWith(sum);
        expect(resultSum).toBe(sum);

        expect(classSubtractSpy).toHaveBeenCalledTimes(1);
        expect(classSubtractSpy).toHaveBeenCalledWith(a, b);
        expect(classSubtractSpy).toHaveReturnedWith(difference);
        expect(resultSubtract).toBe(difference);

        expect(classMultiplySpy).toHaveBeenCalledTimes(1);
        expect(classMultiplySpy).toHaveBeenCalledWith();
        expect(classMultiplySpy).toHaveReturnedWith(product);
        expect(resultProduct).toBe(product);

        // Now mock the implementation
        const mockedImplementation = 9999;
        classSumSpy.mockImplementation(() => mockedImplementation);
        classSubtractSpy.mockImplementation(() => mockedImplementation);
        classMultiplySpy.mockImplementation(() => mockedImplementation);

        // Re-invoke the methods
        const resultSum2 = calc.Calculator.sumAB(a, b);
        const resultSubtract2 = calc.Calculator.subtractAB(a, b);
        const resultProduct2 = calculator.multiply();

        // Assert that spied no methods now return mocked implementation
        expect(classSumSpy).toHaveBeenCalledTimes(2);
        expect(classSumSpy).toHaveBeenCalledWith(a, b);
        expect(classSumSpy).toHaveReturnedWith(mockedImplementation);
        expect(resultSum2).toBe(mockedImplementation);

        expect(classSubtractSpy).toHaveBeenCalledTimes(2);
        expect(classSubtractSpy).toHaveBeenCalledWith(a, b);
        expect(classSubtractSpy).toHaveReturnedWith(mockedImplementation);
        expect(resultSubtract2).toBe(mockedImplementation);

        expect(classMultiplySpy).toHaveBeenCalledTimes(2);
        expect(classMultiplySpy).toHaveBeenCalledWith();
        expect(classMultiplySpy).toHaveReturnedWith(mockedImplementation);
        expect(resultProduct2).toBe(mockedImplementation);

        // Reset the usage data of the spies and also their implementation (to undefined)
        classSumSpy.mockReset();
        classSubtractSpy.mockReset();
        classMultiplySpy.mockReset();
        // vi.resetAllMocks(); // Alternative to above

        // Re-invoke the methods
        const resultSum3 = calc.Calculator.sumAB(a, b);
        const resultSubtract3 = calc.Calculator.subtractAB(a, b);
        const resultProduct3 = calculator.multiply();

        // Assert that implementation has been set to undefined
        expect(classSumSpy).toHaveBeenCalledTimes(1);
        expect(classSumSpy).toHaveBeenCalledWith(a, b);
        expect(classSumSpy).toHaveReturnedWith(undefined);
        expect(resultSum3).toBe(undefined);

        expect(classSubtractSpy).toHaveBeenCalledTimes(1);
        expect(classSubtractSpy).toHaveBeenCalledWith(a, b);
        expect(classSubtractSpy).toHaveReturnedWith(undefined);
        expect(resultSubtract3).toBe(undefined);

        expect(classMultiplySpy).toHaveBeenCalledTimes(1);
        expect(classMultiplySpy).toHaveBeenCalledWith();
        expect(classMultiplySpy).toHaveReturnedWith(undefined);
        expect(resultProduct3).toBe(undefined);
    });
});

/**
 * RESTORE Mock / Spy
 *
 * Use <mock/spy>.mockRestore() OR vi.restoreAllMocks()
 * - Does everything that mockReset() and resetAllMocks() does PLUS restores original non-mocked implementation of the function
 * - Restores original (non-mocked) implementation of the spy (before method was spied on)
 *
 * CAUTION: After restoring, spy (created from vi.spyOn()) does not exist anymore so you can't reference it
 * - You will only be able to reference the original method (and not the spy) after restoring
 *
 * CAUTION:
 * - mockRestore() and restoreAllMocks ONLY work when mock created using vi.spyOn() (originally spied on methods restored)
 * - If mock created using vi.fn(), then you didn't change implementation of a method
 * - For MOCKS created with vi.fn(): Restores mock to its original value defined by vi.fn() (so returns undefined)
 * - For MOCKS created with vi.fn(impl): Implementation is restored to impl
 */
describe("Restoring Spies", () => {
    const originalReturn = true;

    const obj2Mock = {
        method() {
            return originalReturn;
        },
    };

    const spy = vi.spyOn(obj2Mock, "method");

    const newReturn = false;

    spy.mockImplementation(() => newReturn);

    /**
     * NOTE:
     * - Either reset mocks inside tests,
     * - OR outside of tests using afterEach or beforeEach
     *
     * - Use mockFn.mockRestore() to clear a specific mock
     * - Use vi.restoreAllMocks() to clear ALL mocks
     */
    // afterEach(() => {
    //     mockFn.mockRestore(); // Restore a specific mock
    //     vi.restoreAllMocks(); // Restore all mocks instead of specific ones
    // });

    it("tests that spy function was invoked (before restoring)", async () => {
        // ARRANGE -- Define testing environments & values
        // ACT -- Run the code that is being tested
        const result = obj2Mock.method();

        // ASSERT -- Evaluate result and compare to expected value
        expect(spy).toHaveBeenCalledTimes(1);
        expect(result).toBe(newReturn);
    });

    it("tests that spy function's implementation was restored (after restoring)", async () => {
        // ARRANGE -- Define testing environments & values
        // ACT -- Run the code that is being tested

        spy.mockRestore(); // By restoring, spy no longer exists

        const result = obj2Mock.method();

        // ASSERT -- Evaluate result and compare to expected value
        expect(spy).not.toHaveBeenCalled();
        expect(result).toBe(originalReturn);
    });

    it("tests that imported function's implementation was restored (after restoring the spy)", async () => {
        // restore all spy implementation
        // (due to spies setting method implementations to undefined in previous "restore" test suite)
        vi.restoreAllMocks();

        const a = 1;
        const b = 2;
        const sum = a + b;
        const difference = a - b;

        const sumSpy = vi.spyOn(calc, "sumAB");
        const subtractSpy = vi.spyOn(calc, "subtractAB");

        // ACT -- Run the code that is being tested
        const resultSum = calc.sumAB(a, b);
        const resultDifference = calc.subtractAB(a, b);

        // ASSERT -- Evaluate result and compare to expected value

        // Make assertions before mocking the implementation
        expect(sumSpy).toHaveBeenCalledTimes(1);
        expect(sumSpy).toHaveBeenCalledWith(a, b);
        expect(sumSpy).toHaveReturnedWith(sum);
        expect(resultSum).toBe(sum);

        expect(subtractSpy).toHaveBeenCalledTimes(1);
        expect(subtractSpy).toHaveBeenCalledWith(a, b);
        expect(subtractSpy).toHaveReturnedWith(difference);
        expect(resultDifference).toBe(difference);

        // Mock implementations
        const mockedImplementation = 9999;
        sumSpy.mockImplementation(() => mockedImplementation);
        subtractSpy.mockImplementation(() => mockedImplementation);

        // Call spied on methods again (they should return mocked implementation)
        const resultSum2 = calc.sumAB(a, b);
        const resultDifference2 = calc.subtractAB(a, b);

        // Assert implementation now returns the mocked implementation
        expect(sumSpy).toHaveBeenCalledTimes(2);
        expect(sumSpy).toHaveBeenCalledWith(a, b);
        expect(sumSpy).toHaveReturnedWith(mockedImplementation);
        expect(resultSum2).toBe(mockedImplementation);

        expect(subtractSpy).toHaveBeenCalledTimes(2);
        expect(subtractSpy).toHaveBeenCalledWith(a, b);
        expect(subtractSpy).toHaveReturnedWith(mockedImplementation);
        expect(resultDifference2).toBe(mockedImplementation);

        // Reset the usage data of the spies
        // After this, spies to not exist
        sumSpy.mockRestore();
        subtractSpy.mockRestore();
        // vi.restoreAllMocks(); // Alternative to above

        // Call spied on methods again
        const resultSum3 = calc.sumAB(a, b);
        const resultDifference3 = calc.subtractAB(a, b);

        // Verify that the usage data has been reset / cleared
        // Also verify that implementation now returns original implementation
        expect(sumSpy).not.toHaveBeenCalled();
        expect(resultSum3).toBe(sum);

        expect(subtractSpy).not.toHaveBeenCalled();
        expect(resultDifference3).toBe(difference);
    });

    it("tests that imported class methods which were spied on have their implementation restored (after restoring spies)", async () => {
        // ARRANGE -- Define testing environments & values
        const a = 1;
        const b = 2;
        const sum = a + b;
        const difference = a - b;
        const product = a * b;

        const calculator = new calc.Calculator(a, b);

        // Create a spy on the static class methods
        const classSumSpy = vi.spyOn(calc.Calculator, "sumAB");
        const classSubtractSpy = vi.spyOn(calc.Calculator, "subtractAB");

        // Create a spy on the public class method
        const classMultiplySpy = vi.spyOn(calculator, "multiply");

        // ACT -- Run the code that is being tested
        const resultSum = calc.Calculator.sumAB(a, b);
        const resultSubtract = calc.Calculator.subtractAB(a, b);
        const resultProduct = calculator.multiply();

        // ASSERT -- Evaluate result and compare to expected value
        expect(classSumSpy).toHaveBeenCalledTimes(1);
        expect(classSumSpy).toHaveBeenCalledWith(a, b);
        expect(classSumSpy).toHaveReturnedWith(sum);
        expect(resultSum).toBe(sum);

        expect(classSubtractSpy).toHaveBeenCalledTimes(1);
        expect(classSubtractSpy).toHaveBeenCalledWith(a, b);
        expect(classSubtractSpy).toHaveReturnedWith(difference);
        expect(resultSubtract).toBe(difference);

        expect(classMultiplySpy).toHaveBeenCalledTimes(1);
        expect(classMultiplySpy).toHaveBeenCalledWith();
        expect(classMultiplySpy).toHaveReturnedWith(product);
        expect(resultProduct).toBe(product);

        // Now mock the implementation
        const mockedImplementation = 9999;
        classSumSpy.mockImplementation(() => mockedImplementation);
        classSubtractSpy.mockImplementation(() => mockedImplementation);
        classMultiplySpy.mockImplementation(() => mockedImplementation);

        // Re-invoke the methods
        const resultSum2 = calc.Calculator.sumAB(a, b);
        const resultSubtract2 = calc.Calculator.subtractAB(a, b);
        const resultProduct2 = calculator.multiply();

        // Assert that spied no methods now return mocked implementation
        expect(classSumSpy).toHaveBeenCalledTimes(2);
        expect(classSumSpy).toHaveBeenCalledWith(a, b);
        expect(classSumSpy).toHaveReturnedWith(mockedImplementation);
        expect(resultSum2).toBe(mockedImplementation);

        expect(classSubtractSpy).toHaveBeenCalledTimes(2);
        expect(classSubtractSpy).toHaveBeenCalledWith(a, b);
        expect(classSubtractSpy).toHaveReturnedWith(mockedImplementation);
        expect(resultSubtract2).toBe(mockedImplementation);

        expect(classMultiplySpy).toHaveBeenCalledTimes(2);
        expect(classMultiplySpy).toHaveBeenCalledWith();
        expect(classMultiplySpy).toHaveReturnedWith(mockedImplementation);
        expect(resultProduct2).toBe(mockedImplementation);

        // Reset the usage data of the spies and also their implementation
        // After this, spies do not exist
        classSumSpy.mockRestore();
        classSubtractSpy.mockRestore();
        classMultiplySpy.mockRestore();
        // vi.restoreAllMocks(); // Alternative to above

        // Re-invoke the methods
        const resultSum3 = calc.Calculator.sumAB(a, b);
        const resultSubtract3 = calc.Calculator.subtractAB(a, b);
        const resultProduct3 = calculator.multiply();

        // Assert that implementation has been set to original implementation
        expect(classSumSpy).not.toHaveBeenCalled();
        expect(resultSum3).toBe(sum);

        expect(classSubtractSpy).not.toHaveBeenCalled();
        expect(resultSubtract3).toBe(difference);

        expect(classMultiplySpy).not.toHaveBeenCalled();
        expect(resultProduct3).toBe(product);
    });

    it("tests restoring mocks created with vi.fn() returns undefined", async () => {
        // ARRANGE -- Define testing environments & values
        const mockFn = vi.fn();

        // ACT -- Run the code that is being tested
        const result = mockFn();

        // ASSERT -- Evaluate result and compare to expected value
        expect(mockFn).toHaveBeenCalledTimes(1);
        expect(mockFn).toHaveReturnedWith(undefined);
        expect(result).toBe(undefined);

        // Update the implementation of the mock
        const mockedImplementation = "mocked return value";
        mockFn.mockImplementation(() => mockedImplementation);

        // Re-execute the mock
        const result2 = mockFn();

        // Assert mocked function now returns the mocked implementation
        expect(mockFn).toHaveBeenCalledTimes(2);
        expect(mockFn).toHaveReturnedWith(mockedImplementation);
        expect(result2).toBe(mockedImplementation);

        // Restore the mock
        mockFn.mockRestore();

        // Execute the mock again
        const result3 = mockFn();

        // Assert that the function now returns undefined
        expect(mockFn).toHaveBeenCalledTimes(1);
        expect(mockFn()).toBeUndefined();
        expect(result3).toBeUndefined();
    });

    it("tests restoring mocks created with vi.fn(impl) returns impl", async () => {
        // ARRANGE -- Define testing environments & values
        const originalImplementation = "original implementation";
        const mockFn = vi.fn(() => originalImplementation);

        // ACT -- Run the code that is being tested
        const result = mockFn();

        // ASSERT -- Evaluate result and compare to expected value
        expect(mockFn).toHaveBeenCalledTimes(1);
        expect(mockFn).toHaveReturnedWith(originalImplementation);
        expect(result).toBe(originalImplementation);

        // Update the implementation of the mock
        const mockedImplementation = "mocked return value";
        mockFn.mockImplementation(() => mockedImplementation);

        // Re-execute the mock
        const result2 = mockFn();

        // Assert mocked function now returns the mocked implementation
        expect(mockFn).toHaveBeenCalledTimes(2);
        expect(mockFn).toHaveReturnedWith(mockedImplementation);
        expect(result2).toBe(mockedImplementation);

        // Restore the mock
        mockFn.mockRestore();

        // Execute the mock again
        const result3 = mockFn();

        // Assert that the function now returns undefined
        expect(mockFn).toHaveBeenCalledTimes(1);
        expect(mockFn).toHaveReturnedWith(originalImplementation);
        expect(result3).toBe(originalImplementation);
    });
});
