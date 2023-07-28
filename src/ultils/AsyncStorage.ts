import AsyncStorage from '@react-native-community/async-storage';

const fingerAuth = 'fingerprint_authentication';

export const  getFingerAuth = async () => {
  try {
    return await AsyncStorage.getItem(fingerAuth);
  } catch(e) {
    console.log("error: ", e);
  }
};

export const setFingerAuth = async (isFingerAuth: string) => {
  try {
    await AsyncStorage.setItem(fingerAuth, isFingerAuth)
  } catch (e) {
    console.log("error: ", e);
  }
};

export const removeFingerAuth = async () => {
  try {
    await AsyncStorage.removeItem(fingerAuth)
  } catch(e) {
    console.log("error: ", e)
  }
};

module.exports = {
  getFingerAuth: getFingerAuth,
  setFingerAuth: setFingerAuth,
  removeFingerAuth: removeFingerAuth,
};
