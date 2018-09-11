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