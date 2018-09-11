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