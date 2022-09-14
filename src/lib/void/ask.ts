import chalk from 'chalk';
import inquirer from 'inquirer';
import _ from 'lodash';

import RGBAColor from '../class/RGBAColor';
import { getChalkDisplay } from './colorHelper';

interface ColorList {
    [key: string]: RGBAColor;
}

var colorList: ColorList = {
    red: new RGBAColor(255, 0, 0, 1),
    green: new RGBAColor(0, 255, 0, 1),
    blue: new RGBAColor(0, 0, 255, 1),
    black: new RGBAColor(0, 0, 0, 1),
    white: new RGBAColor(255, 255, 255, 1),
};

/**
 * Convert hex to rgba color ( a is always 1 )
 * @param hex hex code
 * @returns {RGBAColor} The converted color
 */
function hexToRgba(hex: string):RGBAColor {
    var result: RegExpExecArray | null =
        /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    // return result ? {
    //   r: parseInt(result[1], 16),
    //   g: parseInt(result[2], 16),
    //   b: parseInt(result[3], 16)
    // } : null;
    return result ? new RGBAColor(
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
        1
    ):new RGBAColor(0,0,0,1);
}

/**
 * Ask user a question and let user to input something
 * @param message Message display
 * @param _default Default value
 * @param answer_suffix Suffix of the answer
 * @param validate A function to validate the input
 * @returns User input
 */
async function ask(
    message: string,
    _default?: string,
    answer_suffix?: string,
    validate?: (input: string) => string | boolean | Promise<string | boolean>
): Promise<string> {
    return (
        await inquirer.prompt({
            name: 'ask',
            message,
            default: _default,
            type: 'input',
            transformer(input: string): string {
                if (!answer_suffix) return input;
                return input + answer_suffix;
            },
            async validate(input: string): Promise<string | boolean> {
                if (input.trim().length == 0) return 'Input cannot be empty!';
                if (validate) return await validate(input);
                return true;
            },
        })
    ).ask;
}

/**
 * Ask and let user input a number
 * @param message Message display
 * @param max Max number
 * @param min Min number
 * @returns Number user input
 */
async function askNumber(
    message: string,
    max?: number,
    min?: number
): Promise<number> {
    console.log(message + (min || max) ? `(${min || ''}~${max || ''})` : '');
    return (
        await inquirer.prompt({
            type: 'input',
            name: 'ask',
            message:
                message +
                ' ' +
                (min || max ? chalk.grey(`(${min || ''}~${max || ''})`) : ''),
            validate(input: string): boolean | string {
                var num = Number(input);

                if (isNaN(num)) return 'Not a number';

                if (min && num < min) return 'Must bigger than ' + min;
                if (max && num > max) return 'Must smaller than ' + max;

                return true;
            },
        })
    ).ask;
}

/**
 * Ask and let user input a color
 * @param message Message display
 * @param sourceColor Default color
 * @returns {RGBAColor} The color user input ( a is always 1 )
 */
async function askColor(
    message: string,
    sourceColor: RGBAColor = new RGBAColor(0, 0, 0, 1)
): Promise<RGBAColor> {
    var color: RGBAColor = sourceColor;

    // How user input a color
    var typeChoices: string[] = [
        'Select an usefull color',
        'Enter HEX value',
        'Enter RGB value',
    ];
    var selType: string = (
        await inquirer.prompt({
            name: 'seltype',
            type: 'list',
            message,
            choices: typeChoices,
        })
    ).seltype;

    var selTypeIndex: number = _.indexOf(typeChoices, selType);
    if (selTypeIndex == -1) throw new Error('Unknown choice ' + selType);

    switch (selTypeIndex) {
        case 0:
            // Select an usefull color
            var colorChoices: string[] = _.keys(colorList).map((v: string) => {
                var currentValue: RGBAColor =
                    colorList[v] || new RGBAColor(255, 255, 255, 1);
                return getChalkDisplay(v, currentValue);
            });
            var _color: string = (
                await inquirer.prompt({
                    name: 'color',
                    type: 'list',
                    choices: colorChoices,
                    message: 'Select a color',
                })
            ).color;
            _color = chalk.reset(_color);
            console.log(_color, colorList[_color]);
            return colorList[_color] || new RGBAColor(255, 255, 255, 1);
        case 1:
            // Enter hex
            var hex: string = await ask(
                'Enter HEX',
                '#000000',
                undefined,
                (input: string): string | boolean => {
                    if (new RegExp(/#[0-9a-fA-F]{1,6}$/g).test(input)) {
                        return true;
                    }
                    return 'Not a hex';
                }
            );
            color = hexToRgba(hex);
    }
    return color;
}

export { ask, askColor, askNumber };
