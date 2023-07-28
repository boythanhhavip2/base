import * as Keychain from 'react-native-keychain';

const userInfo = 'user_info';

export const getGenericPassword = async () => {
  try {
    return await Keychain.getGenericPassword();
  } catch(e) {
    console.log("error: ", e);
  }
};

export const setGenericPassword = async (username: string, password: string) => {
  try {
    await Keychain.setGenericPassword(username, password);
  } catch (e) {
    console.log("error: ", e);
  }
};

export const removeGenericPassword = async () => {
  try {
    await Keychain.resetGenericPassword();
  } catch(e) {
    console.log("error: ", e)
  }
};

module.exports = {
  getGenericPassword: getGenericPassword,
  setGenericPassword: setGenericPassword,
  removeGenericPassword: removeGenericPassword,
};
