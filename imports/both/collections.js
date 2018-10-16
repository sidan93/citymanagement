import { Mongo } from 'meteor/mongo';

/**
 * Object data
 * key - uuid
 * position - object
 * position.x - int
 * position.y - int
 * size - int
 * @type {Mongo.Collection}
 */
const Towns = new Mongo.Collection('towns');


/**
 * region - int
 * data - array[][] of 
 *s
 * @type {Mongo.Collection}
 */
const WorldMap = new Mongo.Collection('worldmap');

const Regions = new Mongo.Collection('regions');

const Buildings = new Mongo.Collection('buildings');

const ServerInfo = new Mongo.Collection('serverInfo');

const People = new Mongo.Collection('people');

export { Towns, WorldMap, Regions, Buildings, ServerInfo, People };