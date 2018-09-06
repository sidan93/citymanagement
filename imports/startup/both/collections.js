/**
 * Object data
 * key - uuid
 * position - object
 * position.x - int
 * position.y - int
 * size - int
 * @type {Mongo.Collection}
 */
Towns = new Mongo.Collection('towns');


/**
 * region - int
 * data - array[][] of 
 *s
 * @type {Mongo.Collection}
 */
WorldMap = new Mongo.Collection('worldmap');

Buildings = new Mongo.Collection('buildings');
