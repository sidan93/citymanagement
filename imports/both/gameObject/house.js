import { BaseObject } from "./base";

class House extends BaseObject {
    static key = 'house';
    static collection = 'Buildings';
    static maxPeople = 50;

    constructor(objectKey) {
        super(objectKey)
    }
}

export { House };