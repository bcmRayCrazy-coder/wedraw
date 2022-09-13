import inquirer from 'inquirer';
import MenuOption from '../interface/MenuOption';

class Menu {
    options: MenuOption[];

    /**
     * A menu show in command line as selector.
     * @param options Options of a menu.
     */
    constructor(options: MenuOption[]) {
        this.options = options;
    }

    /**
     * Get choices texts
     * @returns Choices
     */
    getTexts(): (string | inquirer.Separator)[] {
        var texts: (string | inquirer.Separator)[] = [];
        for (let i = 0; i < this.options.length; i++) {
            const opt = this.options[i];
            texts.push(opt.message);
        }
        return texts;
    }

    /**
     *
     * @param text User choice
     * @returns The map function ran successfully or not.
     */
    async run(text: string): Promise<boolean> {
        for (let i = 0; i < this.options.length; i++) {
            const opt = this.options[i];
            if (opt.message == text) return await opt.handler();
        }
        return false;
    }
}

export default Menu;
