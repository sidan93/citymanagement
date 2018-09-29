import { ReactiveVar } from 'meteor/reactive-var';

let vSelectedObject = new ReactiveVar();
let vRegionObject = new ReactiveVar();

export { vSelectedObject, vRegionObject };