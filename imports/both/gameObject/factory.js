import { BaseObject } from "./base";

class Factory extends BaseObject {
    static key = 'factory';

    constructor(objectKey) {
        super(objectKey)
    }
}

export { Factory };