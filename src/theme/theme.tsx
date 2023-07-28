/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import { Dimensions, Platform, ScaledSize } from 'react-native';
import DeviceInfo from 'react-native-device-info';

export const { width, height } = Dimensions.get("window");
export function isTablet() {
    return DeviceInfo.isTablet();
}

export const totalDevice = isTablet() ? width > height ? width / 1.45 : height / 1.45 : width > height ? height : width;

export const pt = ((Platform.OS == 'ios' && totalDevice < 750) || (Platform.OS == 'android' && totalDevice < 720)) ? totalDevice < 400 ? totalDevice / 380 : totalDevice / 375 : totalDevice / 575;
export function isAndroid() {
    return Platform.OS === 'android';
}

export function isIPhoneXSize(dim: ScaledSize) {
    return dim.height === 812 || dim.width === 812;
}
export function isIPhoneXrSize(dim: ScaledSize) {
    return dim.height === 896 || dim.width === 896;
}
export function isIPhone12Size(dim: number) {
    return dim === 390 ? true : false ;
}
export function isIPhoneNewSize(dim: ScaledSize) {
    return dim.height === 390 || dim.width === 390;
}
export function isIPhoneProMax(dim: ScaledSize) {
    return dim.height === 428 || dim.width === 428;
}
export function isIphoneX() {
    const dim = Dimensions.get('window');
    return (
        Platform.OS === 'ios'
        && (isIPhoneXSize(dim) || isIPhoneXrSize(dim)) || isIPhoneNewSize(dim) || isIPhoneProMax(dim)
    );
}
