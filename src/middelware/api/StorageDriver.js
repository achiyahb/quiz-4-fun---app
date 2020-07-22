export default {
    getFromStorage,
    updateAllStorageTable
}

function updateAllStorageTable(tableName, item) {
    // 1. need to get the data from the storage
    var parsedData = getFromStorage(tableName);

    // 2. need to insert the new item to the data
    if (parsedData == null) {
        parsedData = [];
    }
    parsedData = item;

    // 3. need to store the data in the storage
    localStorage.setItem(tableName, JSON.stringify(parsedData));
}

function getFromStorage(tableName) {
    // 1. need to get the data from the storage
    var data = localStorage.getItem(tableName);
    return JSON.parse(data) || [];
}


