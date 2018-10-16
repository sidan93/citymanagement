import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict';

let vSelectedObject = new ReactiveVar();
let vRegionObject = new ReactiveVar();
let vNotification = new ReactiveDict();

export { vSelectedObject, vRegionObject, vNotification };