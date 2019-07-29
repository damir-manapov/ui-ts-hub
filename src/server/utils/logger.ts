// tslint:disable:no-console
import * as colors from 'colors';

type TColorizeFunction = (str: string) => string;

interface IMessageOptions {
  text: string;
  colorizeTime?: TColorizeFunction;
  colorizeText?: TColorizeFunction;
}

function message(options: IMessageOptions) {
  const {
    text,
    colorizeTime = (someText: string) => someText.black.bgGreen,
    colorizeText = (someText: string) => someText,
  } = options;
  const time = new Date().toLocaleTimeString();
  const result = colorizeTime(`[${time}]`) + ' ' + colorizeText(text);

  console.log(result);
}

/**
 * Отображает сообщение в консоли
 * @param text
 */
export const log = (text: string) => {
  message({ text });
};

export const error = (text: string) => {
  message({
    text,
    colorizeTime: colors.black.bgRed,
    colorizeText: colors.red,
  });
};
