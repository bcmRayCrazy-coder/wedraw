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

async function askNumber(
    message: string,
    max?: number,
    min?: number
): Promise<number> {
    console.log(message + (min || max) ? `(${min || ''}~${max || ''})` : '');
    return (
        await inquirer.prompt({
            type: 'number',
            name: 'ask',
            message:
                message + (min || max) ? `(${min || ''}~${max || ''})` : '',
            validate(input: string): boolean | string {
                var num = Number(input);

                if (isNaN(num)) return 'Not a number';

                if (min && num < min) return 'Must bigger than ' + min;
                if (max && num < max) return 'Must smaller than ' + max;

                return true;
            },
        })
    ).ask;
}

async function askColor(
    message: string,
    sourceColor: RGBAColor = new RGBAColor(0, 0, 0, 1)
): Promise<RGBAColor> {
    var color: RGBAColor = sourceColor;

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
            console.log(_color);
            break;
    }
    return color;
}

export { ask, askColor, askNumber };
