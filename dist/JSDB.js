;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jsoncomp', 'persist-js'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('jsoncomp'), require('persist-js'));
  } else {
    root.Jsldb = factory(root.JSONC, root.Persist);
  }
}(this, function(JSONC, Persist) {
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
/**
 * Stores a new key-value pair in the DB.
 * @method
 * @param {string} key - The key name for the item.
 * @param {string} value - The value to be stored.
 */
 
Jsldb.prototype.set = function(key, value){
	// Validate key existence or throw error
	if (!key){
    	throw new Error("Must provide a key");
	};

	// Validate value existence or throw error
    if (!value){
    	throw new Error("Must provide a value to store");
    };

    // Check if value is object, if so, compress that sh*t
    if(typeof value === "object"){
    	value = JSONC.pack(value, true);
    };

    // Use PersistJS to store
    this.store.set(key, value);
    console.log('stored');
    console.log(this.store.get(key))
};
/**
 * Retrieves a stored value for input key
 * @method
 * @param {string} key - The key name for the item to retrieve.
 */ 
Jsldb.prototype.get = function (key){
    // Validate key existence or throw error
    if (!key){
        throw new Error("Must provide a key");
    };

    // Use PersistJS to get data
    var value = this.store.get(key);

    // Try to decompress, in case of object.
    try{
        value = JSONC.unpack(value, true);
    }catch(err){
        
    }

    // Check data type and parse int if necessary
    if(!isNaN(value)){
        value = +value;
    }

    return value;
};
/**
 * Removes a stored value for input key
 * @method
 * @param {string} key - The key name for the item to remove.
 */	 
Jsldb.prototype.remove = function (key){
	// Validate key existence or throw error
	if (!key){
    	throw new Error("Must provide a key");
	};

    // Use PersistJS to remove data
    var value = this.store.remove(key);

};
/**
 * Stores a new uncompressed key-value pair in the DB.
 * @method
 * @param {string} key - The key name for the item.
 * @param {string} value - The value to be stored.
 */
Jsldb.prototype.setUncompressed = function(key, value){
    // Validate key existence or throw error
    if (!key){
        throw new Error("Must provide a key");
    };

    // Validate value existence or throw error
    if (!value){
        throw new Error("Must provide a value to store");
    };

    // Check if value is object, if so, compress that sh*t
    if(typeof value === "object"){
        value = JSONC.compress(value);
    };

    // Use PersistJS to store
    this.store.set(key, value);
    console.log('stored');
    console.log(this.store.get(key))
};
/**
 * Retrieves an uncompressed stored value for input key
 * @method
 * @param {string} key - The key name for the item to retrieve.
 */
Jsldb.prototype.getUncompressed = function (key){
    // Validate key existence or throw error
    if (!key){
        throw new Error("Must provide a key");
    };

    // Use PersistJS to get data
    var value = this.store.get(key);

    // Try to decompress, in case of object.
    try{
        value = JSONC.decompress(value);
    }catch(err){
        
    }

    // Check data type and parse int if necessary
    if(!isNaN(value)){
        value = +value;
    }

    return value;
};
return Jsldb;
}));
