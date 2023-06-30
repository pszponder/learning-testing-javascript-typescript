import { assert, expect, test } from "vitest";

/**
 * Test the sqrt method of the Math object
 */
test("Math.sqrt()", () => {
    expect(Math.sqrt(4)).toBe(2);
    expect(Math.sqrt(144)).toBe(12);
    expect(Math.sqrt(2)).toBe(Math.SQRT2);
});

/**
 * Test the sqrt method of the Math object
 * This time, perform some additional setup
 */
test("Math.sqrt() alternative version", () => {
    // ARRANGE -- Define testing environments & values
    const input1 = 4;
    const output1 = 2;

    const input2 = 144;
    const output2 = 12;

    const input3 = 2;
    const output3 = Math.SQRT2;

    // ACT -- Run the code that is being tested
    const result1 = Math.sqrt(input1);
    const result2 = Math.sqrt(input2);
    const result3 = Math.sqrt(input3);

    // ASSERT -- Evaluate result and compare to expected value
    expect(result1).toBe(output1);
    expect(result2).toBe(output2);
    expect(result3).toBe(output3);
});

/**
 * Test that JSON.stringify correctly stringifies an object
 */
test("JSON.stringify()", () => {
    // ARRANGE -- Define testing environments & values
    const input = {
        foo: "hello",
        bar: "world",
    };

    const expected = '{"foo":"hello","bar":"world"}';

    // ACT -- Run the code that is being tested
    const output = JSON.stringify(input);

    // ASSERT -- Evaluate result and compare to expected value
    expect(output).eq(expected);
    assert.deepEqual(JSON.parse(output), input, "matches original");
});
