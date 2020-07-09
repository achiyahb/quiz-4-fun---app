export default {
    insertToStorage,
    getFromStorage,
    deleteFromStorage,
    updateToStorage,
    findItemById,
    getNamesArrayFromItems,
    updateAllStorageTable
}

function insertToStorage(tableName, item) {
    // 1. need to get the data from the storage
    var parsedData = getFromStorage(tableName);

    // 2. need to insert the new item to the data
    if (parsedData == null) {
        parsedData = [];
    }
    parsedData.push(item);

    // 3. need to store the data in the storage
    localStorage.setItem(tableName, JSON.stringify(parsedData));
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

function deleteFromStorage(tableName, id) {
    // 1. need to get the table
    var parsedData = getFromStorage(tableName);

    // 2. need to find the relevant item by id
    var foundIndex = findItemById(id , parsedData).index;
    parsedData.splice(foundIndex, 1);

    // 4. update the storage
    localStorage.setItem(tableName, JSON.stringify(parsedData));
}

function updateToStorage(tableName, inputsItem, id) {
    // 1. get the table from storage
    var parsedData = getFromStorage(tableName);

    // 2. find the relevant item by id
    var foundItem = findItemById(id , parsedData).item;

    // 3. update the relevant item with specific inputs
    for (var prop in inputsItem) {
        if (inputsItem[prop] !== '') {
            foundItem[prop] = inputsItem[prop];
        }
    }

    // 4. save to storage
    localStorage.setItem(tableName, JSON.stringify(parsedData));

}

function findItemById(id, array, tableName) {
    array = (Array.isArray(array)) && array || (tableName && getFromStorage(tableName));
    if (!array){
        return;
    }
    for (let i = 0 ; i < array.length; i++) {
        let item = array[i];
        if (item.id == id) {
            return {
                item: item,
                index: i
            };
        }
    }
}
function getNamesArrayFromItems (tableName, prop){
    let parsedData = getFromStorage(tableName);
    let namesMap = [];
    let index;
    for (const item of parsedData){
        namesMap.push(item.courseName);
        index = item
    }
    return {
        namesMap,
        index
    };
}

