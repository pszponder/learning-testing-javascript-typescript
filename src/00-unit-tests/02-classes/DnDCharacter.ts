export interface IDnDClassType {
    name: "wizard" | "ranger" | "warrior";
    armorClass: "light" | "medium" | "heavy";
}

/**
 * Represents a DnD class
 *
 * Used for demonstrating how to unit test classes
 * @class
 */
export class DnDCharacter {
    public name: string;

    public race: string;

    public classType: IDnDClassType;

    private level: number;

    private health: number;

    /**
     * Create a new D&D Character
     *
     * @constructor
     * @param {string} name - Characters name
     * @param {string} race - Character's race
     * @param {Object} classType - The class type (an object of type IDnDClassType)
     */
    constructor(name: string, race: string, classType: IDnDClassType) {
        this.name = name;
        this.race = race;
        this.classType = classType;
        this.level = 1;
        this.health = this.calculateMaxHealth(this.level);
    }

    /**
     * Getter for character level
     *
     * @returns Character's current level
     */
    public getCurrentLevel() {
        return this.level;
    }

    /**
     * Getter for character health
     *
     * @returns Character's current health
     */
    public getHealth() {
        return this.health;
    }

    /**
     * Check if character is alive or dead
     *
     * @returns {boolean}
     */
    public isAlive() {
        return this.health > 0;
    }

    /**
     * Perform calculations based on level and classType
     * @returns
     */
    private calculateMaxHealth(currentLevel: number) {
        switch (this.classType.armorClass) {
            case "heavy":
                return currentLevel * 5;
            case "medium":
                return currentLevel * 4;
            default:
                // Light
                return currentLevel * 3;
        }
    }

    /**
     * Increases the character's level by 1
     */
    public levelUp() {
        this.level += 1;
        this.health = this.calculateMaxHealth(this.level);
    }

    /**
     * Updates character health based on damageTaken
     *
     * @param {number} damageTaken - Number of hit-points of damage taken
     */
    public takeDamage(damageTaken: number) {
        this.health -= damageTaken;
    }
}
