import { screenWidth, screenHeight } from './Styles';

export const baseScreenWidth = 375;
export const baseScreenHeight = 733;
export const convertWidth = (pd: number) => {
  return (pd / baseScreenWidth) * screenWidth;
};

export const convertHeight = (pd: number) => {
  return (pd / baseScreenHeight) * screenHeight;
};
