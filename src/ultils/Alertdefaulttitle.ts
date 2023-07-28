import {Alert} from 'react-native';

class AlertDefaultTitle {
  show = (
    message: string,
    titleLeft: string = 'OK',
    actionLeft?: any,
    titleRight?: string,
    actionRight?: any,
  ) => {
    let optionAction = [];
    if (titleLeft) {
      optionAction.push({
        text: titleLeft,
        onPress: actionLeft,
      });
    }

    if (titleRight) {
      optionAction.push({
        text: titleRight,
        onPress: actionRight,
      });
    }

    Alert.alert('Thông báo', message, optionAction);
  };

  prompt = (
    message: string,
    titleLeft: string = 'OK',
    actionLeft: any,
    titleRight: string,
    actionRight: any,
  ) => {
    let optionAction = [];
    if (titleLeft) {
      optionAction.push({
        text: titleLeft,
        onPress: actionLeft,
      });
    }

    if (titleRight) {
      optionAction.push({
        text: titleRight,
        onPress: actionRight,
      });
    }

    Alert.prompt('Thông báo', message, optionAction);
  };

  handleUnactiveFingerAuth = () => {
    Alert.alert(
      'Đăng nhập không thành công',
      'Chưa cài đặt tính năng đăng nhập bằng vân tay \n Vui lòng nhập tên đăng nhập và mật khẩu',
      [
        {
          text: 'Đóng',
          onPress: () => {},
          style: 'cancel',
        },
      ],
    );
  };

  handleActiveFingerAuthSuccess = () => {
    Alert.alert('Thông báo', 'Cài đặt thành công', [
      {
        text: 'Đóng',
        onPress: () => {},
        style: 'cancel',
      },
    ]);
  };
}

const alertDefaultTitle = new AlertDefaultTitle();

export default alertDefaultTitle;
