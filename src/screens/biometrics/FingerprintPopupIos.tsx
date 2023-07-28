import React, {useEffect} from 'react';
import {Alert, View} from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';

type FingerAuthComponent = {
  handlePopupDismissed(isAuthSuccess: boolean): void;
  handleEvent(): void;
}

export default function FingerprintPopup(props: FingerAuthComponent) {
  useEffect(() => {
    FingerprintScanner.authenticate({
      description: 'Scan your fingerprint on the device scanner to continue',
    })
      .then(() => {
        props.handlePopupDismissed(true);
        props.handleEvent();
      })
      .catch(error => {
        props.handlePopupDismissed(false);
        // Alert.alert(error.message);
      });
  }, []);

  return <View/>;
}
