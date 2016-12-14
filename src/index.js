const typeOfCheck = (obj) => obj !== null && typeof obj === 'object';

// takes 2 arrays to merge together
export const immutableConcat = (array1, array2) => {
  if(Array.isArray(array1) && Array.isArray(array2)) {
    return [...array1, ...array2];
  }
  throw new Error('immutableConcat: Both arguments need to be arrays');
};

// takes the array and an item to add
export const immutablePush = (array, item) => {
  if(Array.isArray(array)) {
    return [...array, item];
  }
  throw new Error('immutablePush: First argument needs to be an array');
}

// takes the array and the index of the item to remove
export const immutableRemove = (array, index) => {
  if(Array.isArray(array)) {
    return [...array.slice(0, parseInt(index)), ...array.slice(parseInt(index) + 1)];
  }
  throw new Error('immutableRemove: First argument needs to be an array');
}

// merges two objects second object overides first
export const immutableMerge = (obj1, obj2) => {
  if (typeOfCheck(obj1) && typeOfCheck(obj2)) {
    return { ...obj1, ...obj2 };
  }
  throw new Error('immutableMerge: Both arguments need to be objects');
};

// merges an array of objects from left to right
// meaning the ones on the right take presidence
export const immutableMergeMany = (array) => {
  if(Array.isArray(array)) {
    return array.reduce((stateObj, nextStateObj) => immutableMerge(stateObj, nextStateObj), {});
  }
  throw new Error('immutableMergeMany: Argument needs to be an array');
}

// takes the array, object and (optional) key returns a new array with object updated
export const immutableUpdateObjectByKey = (array, obj, key = 'id') => {
  if(Array.isArray(array)) {
    if(typeOfCheck(obj)) {
      return array.map(item => (
        item[key] === obj[key] ? immutableMerge(item, obj) : item
      ));
    }
    throw new Error('immutableUpdateObjectByKey: Second argument needs to be an object');
  }
  throw new Error('immutableUpdateObjectByKey: First argument needs to be an array');
}
