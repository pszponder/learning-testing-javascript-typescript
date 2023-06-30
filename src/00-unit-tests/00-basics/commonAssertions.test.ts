import { describe, expect, it, vi } from "vitest";
import * as exports from "./testFuncs.js";

// =====================================================================
// More assertions can be found here: https://vitest.dev/api/expect.html
// =====================================================================

// Disable a few eslint rules in the file
/* eslint max-classes-per-file: off */

describe("00-basics: Testing Common Assertions", () => {
    /**
     * Use `toBe()` to assert if primitives are equal or that objects share the same reference
     * CAUTION: Do NOT use `toBe()` to test floating-point numbers (use `toBeCloseTo()` instead)
     */
    it("Testing Equality of Strings, Integers and Object References (toBe)", async () => {
        // ARRANGE -- Define testing environments & values
        const inventory = {
            type: "video games",
            count: 99,
        };

        // Create a pointer to the stock object
        const refInventory = inventory;

        // ACT -- Run the code that is being tested
        // ASSERT -- Evaluate result and compare to expected value
        expect(2).toBe(2);
        expect("hello").toBe("hello");
        expect(inventory.type).toBe("video games");
        expect(inventory.count).toBe(99);
        expect(inventory).toBe(refInventory);
    });

    /**
     * Use `not` to negate an assertion
     */
    it("Negating assertions (not)", async () => {
        expect(4).not.toBe(2);
        expect("hello").not.toBe("goodbye");
    });

    /**
     * Use `toBeCloseTo()` to compare floating-point numbers
     * Optional `numDigits` argument will limit the number of digits to check after the decimal point
     */
    it("Comparing floating-point numbers (toBeCloseTo)", async () => {
        expect(0.2 + 0.1).not.toBe(0.3); // 0.2 + 0.1 is 0.30000000000000004
        expect(0.2 + 0.1).toBeCloseTo(0.3);
        expect(0.2 + 0.1).toBeCloseTo(0.3, 5); // "000000000004" removed
        expect(0.2 + 0.1).not.toBeCloseTo(0.3, 50); // This is too far away and fails so need to add `not`
    });

    /**
     * Use `toEqual` to assert if the actual value is equal to the received one
     * or has the same structure, if it is an object (compares objects recursively)
     * Use this primarily to check for the same key-value pairs of an object
     *
     * CAUTION: `toEqual` will fail if trying to compare two objects with a function / method inside of them
     * A function will always be unique, even if it has the same implementation
     *
     * If you are trying to compare instances of classes use `toBeInstanceOf` instead
     */
    it("Comparing objects and their key-value pairs", async () => {
        // ARRANGE -- Define testing environments & values
        const inventory1 = {
            type: "games",
            count: 99,
        };

        const inventory2 = {
            type: "games",
            count: 99,
        };

        const inventory3 = {
            // NOTE: If the order is different, `toEqual` will fail
            bag: ["apple", 13, "sword"],
        };

        const inventory4 = {
            // NOTE: If the order is different, `toEqual` will fail
            bag: ["apple", 13, "sword"],
        };

        const myObj1 = {
            sayHello: () => console.log("Hello"),
            count: 1,
        };

        const myObj2 = {
            sayHello: () => console.log("Hello"),
            count: 1,
        };

        const myObj3 = {
            prop1: 1,
        };

        const myObj4 = {
            prop1: 1,
            prop2: undefined,
        };

        // ACT -- Run the code that is being tested
        // ASSERT -- Evaluate result and compare to expected value
        expect(inventory1).toEqual(inventory2);
        expect(inventory3).toEqual(inventory4);
        expect(myObj1).not.toEqual(myObj2);

        // toEqual will ignore properties w/ undefined when making comparisons
        expect(myObj3).toEqual(myObj4);
    });

    /**
     * Use `toStrictEqual` to assert if the actual value is equal to the received one
     * or has the same structure if it is an object (compares them recursively), and of the same type
     *
     * NOTE: `toEqual` vs `toStrictEqual`
     * `toStrictEqual` checks keys with `undefined` properties
     * `toStrictEqual` checks if object types are equal
     */
    it("Strictly comparing objects and their key-value pairs", async () => {
        // ARRANGE -- Define testing environments & values
        class MyClass {
            public prop;

            constructor(prop: string) {
                this.prop = prop;
            }
        }

        const myInstance = new MyClass("test");

        // Structurally the same as the instance (but semantically different)
        const myObj = {
            prop: "test",
        };

        const myObjA = {
            prop1: 1,
        };

        const myObjB = {
            prop1: 1,
            prop2: undefined,
        };

        // ASSERT -- Evaluate result and compare to expected value
        expect(myInstance).toEqual(myObj);
        expect(myInstance).not.toStrictEqual(myObj);

        // `toEqual` will ignore properties w/ undefined when matching (toStrictEqual won't)
        expect(myObjA).toEqual(myObjB);
        expect(myObjA).not.toStrictEqual(myObjB);
    });

    /**
     * Use `toHaveProperty` to assert if a specified property exists on an object
     *
     * OPTION: You can pass a 2nd argument which will check the value of the property
     */
    it("Check if an object has a specified key", async () => {
        // ARRANGE -- Define testing environments & values
        const invoice = {
            isActive: true,
            "P.O": "12345",
            customer: {
                first_name: "John",
                last_name: "Doe",
                location: "China",
            },
            total_amount: 5000,
            items: [
                {
                    type: "apples",
                    quantity: 10,
                },
                {
                    type: "oranges",
                    quantity: 5,
                },
            ],
        };

        // ACT -- Run the code that is being tested
        // ASSERT -- Evaluate result and compare to expected value
        expect(invoice).toHaveProperty("isActive"); // assert that the key exists
        expect(invoice).toHaveProperty("total_amount", 5000); // assert that the key exists and the value is equal

        expect(invoice).not.toHaveProperty("account"); // assert that this key does not exist

        // Deep referencing using dot notation
        expect(invoice).toHaveProperty("customer.first_name");
        expect(invoice).toHaveProperty("customer.last_name", "Doe");
        expect(invoice).not.toHaveProperty("customer.location", "India");

        // Deep referencing using an array containing the key
        expect(invoice).toHaveProperty("items[0].type", "apples");
        expect(invoice).toHaveProperty("items.0.type", "apples"); // dot notation also works

        // Deep referencing using an array containing the keyPath
        expect(invoice).toHaveProperty(["items", 0, "type"], "apples");
        expect(invoice).toHaveProperty(["items", "0", "type"], "apples"); // string notation also works

        // Wrap your key in an array to avoid the key from being parsed as a deep reference
        expect(invoice).toHaveProperty(["P.O"], "12345");
    });

    it("Check if value is an instance of a class", async () => {
        // ARRANGE -- Define testing environments & values

        class MyClass {
            public hello: string;

            constructor() {
                this.hello = "goodbye";
            }
        }

        const myInstance = new MyClass();
        // ACT -- Run the code that is being tested
        // ASSERT -- Evaluate result and compare to expected value
        expect(myInstance).toBeInstanceOf(MyClass);
    });

    /**
     * Use `toBeTruthy` and `toBeFalsy` to assert if a value is truthy / falsy
     */
    it("Asserting truthy and falsy values", async () => {
        // ARRANGE -- Define testing environments & values
        const myTruthyFunc = () => true;
        const myFalsyFunc = () => false;

        // ACT -- Run the code that is being tested
        const myTruthyResult = myTruthyFunc();
        const myFalsyResult = myFalsyFunc();

        // ASSERT -- Evaluate result and compare to expected value
        expect(true).toBeTruthy();
        expect(myTruthyResult).toBeTruthy();

        expect(false).toBeFalsy();
        expect(myFalsyResult).toBeFalsy();
    });

    /**
     * `toThrowError` asserts if a function throws an error when it is called
     *
     * OPTIONAL: Provide an optional argument to test that a specific error is thrown
     * - regular expression: pass a regular expression which should match the error thrown
     * - string: the string that is thrown by the error
     *
     * NOTE: You MUST WRAP the code you expect to throw the error in a function
     *  otherwise, the error will not be caught and your test will fail
     */
    it("Catching thrown errors", async () => {
        // ARRANGE -- Define testing environments & values
        function throwError(num = 0) {
            if (num < 0) {
                throw new Error("negative");
            } else if (num === 0) {
                throw new Error("zero");
            } else {
                throw new Error("positive");
            }
        }

        // ACT -- Run the code that is being tested
        // ASSERT -- Evaluate result and compare to expected value
        // note how the function which we expect to throw is wrapped in an arrow function
        expect(() => throwError()).toThrowError();

        expect(() => throwError(0)).toThrowError("zero");
        expect(() => throwError(0)).toThrowError(/zero/);

        expect(() => throwError(-1)).toThrowError("negative");
        expect(() => throwError(-1)).toThrowError(/negative/);

        expect(() => throwError(1)).toThrowError("positive");
        expect(() => throwError(1)).toThrowError(/positive/);
    });

    /**
     * `toBeDefined` asserts that value is not equal to undefined
     * This can be used to check if a function returns a value other than undefined
     */
    it("Check that value is not 'undefined'", async () => {
        // ARRANGE -- Define testing environments & values
        function returnSomething() {
            return "something";
        }

        // ACT -- Run the code that is being tested
        const result = returnSomething();

        // ASSERT -- Evaluate result and compare to expected value
        expect(result).toBeDefined();
    });

    /**
     * `toBeUndefined` asserts that the value is 'undefined'
     * This is useful to check if a function doesn't return anything
     */
    it("Check if value is undefined", async () => {
        // ARRANGE -- Define testing environments & values
        const undefinedValue = undefined;

        function returnUndefined() {}

        // ACT -- Run the code that is being tested
        const result = returnUndefined();

        // ASSERT -- Evaluate result and compare to expected value
        expect(undefinedValue).toBeUndefined();
        expect(result).toBeUndefined();
    });

    /**
     * `toBeNull` asserts if a value is null
     * NOTE: `toBeNull` is the same as `toBe(null)`
     */
    it("Asserting a value is null", async () => {
        // ARRANGE -- Define testing environments & values
        const value = null;

        // ACT -- Run the code that is being tested
        // ASSERT -- Evaluate result and compare to expected value
        expect(value).toBeNull(); // same as below
        expect(value).toBe(null); // Same as above
    });

    /**
     * `toBeNan` asserts if a value is NaN
     */
    it("Check if value is 'NaN", async () => {
        // ARRANGE -- Define testing environments & values
        const value = NaN;
        // ACT -- Run the code that is being tested
        // ASSERT -- Evaluate result and compare to expected value
        expect(value).toBeNaN(); // Same as below
        expect(value).toBe(NaN); // Same as above
    });

    /**
     * `toHaveBeenCalledWith` checks if a function was called at least once with provided parameters
     *
     * NOTE: To use this, will have to create a spy on the function / method
     * and pass the spy into `expect`
     */
    it("Check that a function/method has been called with given arguments at least once", async () => {
        // ARRANGE -- Define testing environments & values
        const addTwoSpy = vi.spyOn(exports, "addTwo");
        const addThreeSpy = vi.spyOn(exports, "addThree");

        // ACT -- Run the code that is being tested
        exports.addTwo(1, 2);
        exports.addThree(1, 2, 3);

        // ASSERT -- Evaluate result and compare to expected value
        expect(addTwoSpy).toHaveBeenCalledWith(1, 2);
        expect(addThreeSpy).toHaveBeenCalledWith(1, 2, 3);
    });

    /**
     * `toHaveBeenCalledTimes` asserts how many times a function / method has been called
     *
     * NOTE: To use this, will have to create a spy on the function / method
     * and pass the spy into `expect`
     */
    it("Check how many times a function / method has been called / invoked", async () => {
        // ARRANGE -- Define testing environments & values
        const addTwoSpy = vi.spyOn(exports, "addTwo");
        const addThreeSpy = vi.spyOn(exports, "addThree");

        // ACT -- Run the code that is being tested
        exports.addTwo(1, 2);
        exports.addTwo(1, 2);
        exports.addThree(1, 2, 3);
        exports.addThree(1, 2, 3);
        exports.addThree(1, 2, 3);

        // ASSERT -- Evaluate result and compare to expected value
        expect(addTwoSpy).toHaveBeenCalledTimes(2);
        expect(addThreeSpy).toHaveBeenCalledTimes(3);
    });
});
