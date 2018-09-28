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

Regions = new Mongo.Collection('regions');

Buildings = new Mongo.Collection('buildings');

ServerInfo = new Mongo.Collection('serverInfo');

People = new Mongo.Collection('people');