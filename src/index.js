/**
* Jsldb Module
* @version 1.0.0
* @module Jsldb
*/

/**
 * This is the library main class.
 * @constructor
 * @param {string} name - The name for the DB
 */
 function Jsldb (name){
	// Create PersistJS store using provided name or fallback to application domain (or default if that fails too).
	this.name = name || window.location.host || document.domain || "applicationStore";
	this.store = new Persist.Store(name);
 }

 // expose to global window object.
 window.Jsldb = Jsldb;