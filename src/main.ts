import chalk from 'chalk';
import inquirer from 'inquirer';

import LaunchMenu from './menu/LaunchMenu';

export default async function () {
    // Main program entry
    const launchMenu = new LaunchMenu();
    var option = (
        await inquirer.prompt({
            name: 'menu',
            type: 'list',

            message: '----Menu----',
            choices: launchMenu.getTexts(),
        })
    ).menu;
    var state: boolean = await launchMenu.run(option);
    if (!state) console.log(chalk.bold.red('Ops, something error!'));
    else console.log(chalk.bold.green('Done!'));
}
