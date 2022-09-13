import inquirer from 'inquirer';

/**
 * An option for menu
 */
interface MenuOption {
    /**
     * The message to display to user
     */
    message: string | inquirer.Separator;

    /**
     * The handler running if user choose this option
     * @return The map function ran successfully or not.
     */
    handler: () => boolean | Promise<boolean>;
}

export default MenuOption;
