import { BaseObject } from "./base";

class House extends BaseObject {
    static key = 'house';

    constructor(objectKey) {
        super(objectKey)
    }
}

export { House };