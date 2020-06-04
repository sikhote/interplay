import AsyncStorage from '@react-native-community/async-storage';

export default [
  'getItem',
  'setItem',
  'removeItem',
  'clear',
  'getAllKeys',
  'multiGet',
  'multiSet',
  'multiRemove',
].reduce((storage, key) => {
  storage[key] = AsyncStorage[key];
  return storage;
}, {});
