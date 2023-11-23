import store from 'store2';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';

// store({key: data, key2: data})
const setAllData = storeObject => {
  store.setAll(storeObject);
};

// store(key, data)
const setSingleData = (key, value) => {
  store.set(key, value);
};

// store()
const getAllData = () => store.getAll();

// store(key)
const getSingleData = key => store.get(key);

// store(false)
const clearData = () => {
  store.clear();
};

// returns true or false
const hasKey = key => store.has(key);

// returns true or false
const hasData = key => store.has(key) && !isNil(store.get(key)) && !isEmpty(store.get(key));

// removes key and its data, then returns the data or alt, if none
const removeSingleData = key => {
  store.remove(key);
};

// concat, merges, or adds new value into existing one
const addNewValue = (key, value) => {
  store.add(key, value);
};

// number of keys, not length of data
const numberOfKeys = () => {
  store.size();
};

// clears *ALL* areas (but still namespace sensitive)
const clearAllData = () => {
  store.clearAll();
};

export {
  setAllData,
  setSingleData,
  getAllData,
  getSingleData,
  clearData,
  hasKey,
  hasData,
  removeSingleData,
  addNewValue,
  numberOfKeys,
  clearAllData,
};
