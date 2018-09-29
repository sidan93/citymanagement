import { ReactiveVar } from 'meteor/reactive-var';

let vSelectedObject = new ReactiveVar();
let vRegionObject = new ReactiveVar();
let vNotification = new ReactiveDict();

export { vSelectedObject, vRegionObject, vNotification };