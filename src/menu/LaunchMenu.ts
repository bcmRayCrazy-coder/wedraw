import inquirer from 'inquirer';
import Menu from '../lib/class/Menu';
import createImage from './options/createImage';

class LaunchMenu extends Menu {
    constructor() {
        super([
            {
                message: 'Create new image',
                async handler() {
                    return await createImage();
                },
            },
            {
                message: 'Open an image',
                handler() {
                    console.log('open');
                    return true;
                },
            },
            {
                message: new inquirer.Separator(),
                handler() {
                    return true;
                },
            },
            {
                message: 'Exit',
                handler() {
                    process.exit();
                    return true;
                },
            },
        ]);
    }
}

export default LaunchMenu;
