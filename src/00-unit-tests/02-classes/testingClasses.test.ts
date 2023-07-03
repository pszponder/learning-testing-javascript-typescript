import { beforeEach, describe, expect, it } from "vitest";
import { DnDCharacter, IDnDClassType } from "./DnDCharacter.js";

describe("Testing Classes", () => {
    let character: DnDCharacter;
    const name = "Drizzt Do'Urden";
    const race = "Drow";
    const className = "ranger";
    const armorClass = "medium";

    // Before running each test, instantiate the DnDCharacter class
    // We can then access a new instance of the class for each test
    beforeEach(() => {
        const rangerClass: IDnDClassType = {
            name: className,
            armorClass,
        };

        character = new DnDCharacter(name, race, rangerClass);
    });

    it("Testing public properties of a class instance", async () => {
        // ARRANGE -- Define testing environments & values
        // ACT -- Run the code that is being tested
        // ASSERT -- Evaluate result and compare to expected value
        expect(character.name).toBe(name);
        expect(character.race).toBe(race);
        expect(character.classType.name).toBe(className);
        expect(character.classType.armorClass).toBe(armorClass);
    });

    it("Testing public methods of a class instance", async () => {
        // ARRANGE -- Define testing environments & values
        const expectedLevel = 1;
        const expectedLiveStatus = true;

        // ACT -- Run the code that is being tested
        const resultLevel = character.getCurrentLevel();
        const resultLiveStatus = character.isAlive();

        // ASSERT -- Evaluate result and compare to expected value
        expect(resultLevel).toBe(expectedLevel);
        expect(resultLiveStatus).toBe(expectedLiveStatus);
    });

    /**
     * To access instance private properties / methods:
     * 1. cast your class as type "any" => (myClass as any)
     * 2. Using dot-notation, access any property or method of the class (including private ones)
     */
    it("Testing private properties of a class instance", async () => {
        // ARRANGE -- Define testing environments & values
        const expectedNewCharLevel = 1;
        const expectedNewCharHealth = (character as any).calculateMaxHealth(
            expectedNewCharLevel,
        );

        // ACT -- Run the code that is being tested
        // ASSERT -- Evaluate result and compare to expected value
        expect((character as any).level).toBe(expectedNewCharLevel);
        expect((character as any).health).toBe(expectedNewCharHealth);
    });

    /**
     * To access instance private properties / methods:
     * 1. cast your class as type "any" => (myClass as any)
     * 2. Using dot-notation, access any property or method of the class (including private ones)
     */
    it("Testing private methods of a class instance", async () => {
        // ARRANGE -- Define testing environments & values
        // ACT -- Run the code that is being tested
        character.levelUp(); // On level-up, the character's health is guaranteed to be at its max
        const currentLevel = character.getCurrentLevel();

        // ASSERT -- Evaluate result and compare to expected value
        expect((character as any).health).toBe(
            (character as any).calculateMaxHealth(currentLevel),
        );
    });
});
