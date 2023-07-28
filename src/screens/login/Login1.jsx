import React, { Component, useReducer, useEffect, useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  AppState,
  TextInput,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import EdocIcon from '../../builtins/app.icon';
import { AppColor, RouteName } from '../../builtins/index';
import { convertHeight } from '../../ultils/ConvertSize';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { ApplicationState } from 'store/configureAction';
// import { reducer, ActionCreators, InitState } from '../../screens/login/store/index';
// import { connect } from 'react-redux';
import { compose } from 'redux';
import { alertDefaultTitle } from '../../ultils/index';
import BiometricPopup from '../biometrics/FingerprintPopupAndroid';
import FingerprintPopupIos from '../biometrics/FingerprintPopupIos';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import { getFingerAuth } from '../../ultils/AsyncStorage';
import { getGenericPassword } from '../../ultils/Keychain';
import AsyncStorage from '@react-native-community/async-storage';
import LoadingCenter from '../../components/loading/LoadingCenter';
// import reactotron from 'reactotron-react-native';
import { pt } from '../../theme/theme';
import CONFIG from '../../apis/config';
import { Message } from '../../ultils/Message';
import EdocColor from '../../builtins/app.color';
// import { ActionCreators as ContextAction } from '../../screens/login/store/index';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const LoginLayout = (props) => {
  const navigation = useNavigation();
//   const [state, dispatch] = useReducer(reducer, InitState);
  const [errorMessageFinger, setErrorMessageFinger] = useState(undefined);
  const [biometric, setBiometric] = useState(undefined);
  const [popupShowed, setPopupShowed] = useState(false);
  const [appState, setAppState] = useState('');
  const [isEnabledFinger, setIsEnabled] = useState(false);

  const [userName, onChangeUserName] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [isLogin, setIsLogin] = React.useState(false);
  const [isShowPass, setIsShowPass] = React.useState(false);

//   useEffect(() => {
//     ActionCreators.Loading(dispatch);
//     (async () => {
//       let data = await AsyncStorage.getItem('USER');
//       if (data) {
//         let userInfo = JSON.parse(data ?? '');
//         if (userInfo) {
//           onChangeUserName(userInfo.userName ?? '');
//         }
//       }
//       const fingerAuth = await getFingerAuth();
//       if (fingerAuth && fingerAuth === 'success') {
//         setIsEnabled(true);
//       } else {
//         setIsEnabled(false);
//       }
//     })();
//     AppState.addEventListener('change', handleAppStateChange);
//     // Get initial fingerprint enrolled
//     detectFingerprintAvailable();
//     return () => {
//       AppState.removeEventListener('change', handleAppStateChange);
//     };
//   }, []);

  //fingerprint
  const handleFingerprintShowed = () => {
    if (isEnabledFinger) {
      setPopupShowed(true);
    } else {
      alertDefaultTitle.handleUnactiveFingerAuth();
    }
  };

  const handleFingerprintDismissed = () => {
    setPopupShowed(false);
  };

  const detectFingerprintAvailable = () => {
    FingerprintScanner.isSensorAvailable().catch((error) => {
      setErrorMessageFinger(error.message);
      setBiometric(error.biometric);
    });
  };

  const handleAppStateChange = (nextAppState) => {
    if (appState && appState.match(/inactive|background/) && nextAppState === 'active') {
      FingerprintScanner.release();
      detectFingerprintAvailable();
    }
    setAppState(nextAppState);
  };

//   const handleLogin = () => {
//     // setIsLogin(true);
//     let params = {
//       // projectName: 'BTC',
//       // deviceId: 'iPhone',
//       userName: userName,
//       password: password,
//     };
//     if (userName !== '' && password !== '') {
//       ActionCreators.Login(dispatch, params);
//     } else {
//       //handle error
//     }
//   };

  const handleRegister = () => {
    navigation.navigate(RouteName.REGISTER);
  };

//   const handleLoginWithFingerAuth = () => {
//     (async () => {
//       const credentials = await getGenericPassword();
//       if (credentials) {
//         let values = {
//           userName: credentials.username,
//           password: credentials.password,
//         };
//         ActionCreators.Login(dispatch, values);
//       }
//     })();
//   };

  const handleShowPassword = () => {
    setIsShowPass(!isShowPass);
  };

  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      keyboardShouldPersistTaps={'handled'}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />
      <ScrollView scrollEnabled={false} style={{ paddingBottom: 20 * pt, flex: 1 }}>
        <View style={{ width: '100%', height: 120 }} />
        <View style={styles.logo}>
          <Image
            resizeMode="contain"
            source={EdocIcon.logo}
            style={{ width: 180 * pt, height: CONFIG.unit === 'BTC' ? 60 * pt : 80 * pt }}
          />
          <Text style={styles.sologan}>{Message.Default}</Text>
        </View>
        <View style={styles.loginContainer}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeUserName}
            value={userName}
            placeholder="Tên đăng nhập"
          />
          {isLogin && userName === '' && (
            <Text style={styles.textErorr}>{'Chưa nhập tài khoản'}</Text>
          )}
          <View style={styles.inputPassword}>
            <TextInput
              style={{ fontSize: 16, flex: 1 }}
              onChangeText={onChangePassword}
              value={password}
              placeholder="Nhập mật khẩu"
              secureTextEntry={!isShowPass}
            />
            <TouchableOpacity hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }} onPress={handleShowPassword}>
              {isShowPass ? (
                <Image resizeMode={'contain'} source={EdocIcon.hideEye} style={styles.icEye} />
              ) : (
                <Image resizeMode={'contain'} source={EdocIcon.showEye} style={styles.icEye} />
              )}
            </TouchableOpacity>
            {props.isLoading && <LoadingCenter />}
          </View>
          {isLogin && password === '' && (
            <Text style={styles.textErorr}>{'Chưa nhập mật khẩu'}</Text>
          )}
          <TouchableOpacity
            style={styles.btnLogin}
            onPress={() => {
              Keyboard.dismiss();
              handleLogin();
            }}
          >
            <Text style={styles.txtLogin}>{'Đăng nhập'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.fingerprint}
            onPress={handleFingerprintShowed}
            disabled={!!errorMessageFinger}
          >
            <Image
              source={EdocIcon.faceID}
              style={{ width: 60 * pt, height: 60 * pt }}
              resizeMode={'contain'}
            />
          </TouchableOpacity>

          {popupShowed &&
            (Platform.OS === 'ios' ? (
              <FingerprintPopupIos
                handlePopupDismissed={handleFingerprintDismissed}
                handleEvent={handleLoginWithFingerAuth}
              />
            ) : (
              <BiometricPopup
                style={styles.popup}
                handlePopupDismissed={handleFingerprintDismissed}
                handleEvent={handleLoginWithFingerAuth}
              />
            ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.btnRegister}
        onPress={() => {
          Keyboard.dismiss();
          handleRegister();
        }}
      >
        <Text style={styles.txtRegister}>{'Đăng ký'}</Text>
      </TouchableOpacity>

      <Text
        style={styles.sologanStyle}
        adjustsFontSizeToFit={true}
        numberOfLines={1}
      >
        Sản phẩm của tập đoàn CMC
      </Text>
      <TouchableOpacity
        style={{ position: 'absolute', top: 30, left: 10 }}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Image
          source={EdocIcon.arrowLeft}
          style={{
            width: 30,
            height: 30,
            tintColor: EdocColor.bgHeaderHomeEndLD,
          }}
        />
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
};

const mapStateToProps = (state) => ({
  isConnection: state.ContextState.isConnection,
  isLoading: state.ContextState.isLoading,
});

// const mapDispatchToProps = {
//   ...ContextAction,
// };

// const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(LoginLayout);

const styles = StyleSheet.create({
  txtLogin: {
    fontSize: 16 * pt,
    fontWeight: 'bold',
    color: 'white',
  },
  txtRegister: {
    fontSize: 16 * pt,
  },
  btnRegister: {
    height: 50 * pt,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 40 * pt,
  },
  btnLogin: {
    height: 50 * pt,
    width: '100%',
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 6 * pt,
  },
  logo: {
    alignItems: 'center',
    marginBottom: 20 * pt,
  },
  container: {
    flex: 1,
  },
  loginContainer: {
    flex: 1,
    marginHorizontal: 30 * pt,
  },
  sologan: {
    marginTop: 10 * pt,
    color: AppColor.blue,
    fontSize: 16 * pt,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  icEye: {
    width: 20 * pt,
    height: 20 * pt,
  },
  inputStyle: {
    marginLeft: 10 * pt,
    flex: 1,
    color: '#2C3760',
    height: convertHeight(40 * pt),
  },

  sologanStyle: {
    color: '#8A8E9C',
    textAlign: 'center',
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 16 * pt,
    bottom: convertHeight(20 * pt),
  },
  fingerprint: {
    marginVertical: 15 * pt,
    alignSelf: 'center',
  },
  errorMessage: {
    color: '#ea3d13',
    fontSize: 16 * pt,
    textAlign: 'center',
    marginHorizontal: 10 * pt,
    marginTop: 30 * pt,
  },
  popup: {
    width: width * 0.8,
  },
  input: {
    height: 48 * pt,
    marginVertical: 10 * pt,
    borderWidth: 1 * pt,
    borderColor: '#C6C6C8',
    paddingHorizontal: 10 * pt,
    borderRadius: 8 * pt,
    fontSize: 16 * pt,
  },
  inputPassword: {
    height: 48 * pt,
    marginVertical: 10 * pt,
    borderWidth: 1,
    borderColor: '#C6C6C8',
    paddingHorizontal: 10 * pt,
    borderRadius: 8 * pt,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textErorr: {
    fontSize: 12 * pt,
    fontStyle: 'italic',
    color: 'red',
    marginLeft: 8 * pt,
  },
});

